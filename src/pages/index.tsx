import { GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { useKeenSlider } from "keen-slider/react";

import { stripe } from "../api/stripe";
import { formatToBRL } from "../utils/money";

import { CartButton, HomeContainer, Product } from "../styles/pages/home";
import 'keen-slider/keen-slider.min.css'
import Head from "next/head";
import { Handbag } from "phosphor-react";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Product
            key={product.id}
            className="keen-slider__slide"
            href={`/product/${product.id}`}
            prefetch={false}
          >
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <div>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </div>

              <CartButton>
                <Handbag size={32} weight="bold" />
              </CartButton>
            </footer>
          </Product>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const priceObject = product.default_price as Stripe.Price
    const price = priceObject.unit_amount ? priceObject.unit_amount / 100 : 0

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: formatToBRL(price)
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}
