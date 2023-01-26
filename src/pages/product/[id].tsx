import { GetStaticProps, GetStaticPaths } from "next"
import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import Stripe from "stripe"
import axios from "axios"

import { stripe } from "@/src/api/stripe"

import { useCart } from "@/src/hooks/useCart"

import { formatToBRL } from "@/src/utils/money"

import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    formattedPrice: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addProduct } = useCart()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  function handleAddProductToCart() {
    addProduct(product)
  }

  async function handleBuyProduct() {
    setIsCreatingCheckoutSession(true)

    try {
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar para o checkout')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>{product.description}</p>

          <button disabled={isCreatingCheckoutSession} onClick={handleAddProductToCart}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const { id } = params

  const product = await stripe.products.retrieve(id, {
    expand: ['default_price']
  })

  const priceObject = product.default_price as Stripe.Price
  const price = priceObject.unit_amount ? priceObject.unit_amount / 100 : 0

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price,
        formattedPrice: formatToBRL(price),
        description: product.description,
        defaultPriceId: priceObject.id
      }
    },
    revalidate: 60 * 60 // 1 hour
  }
}
