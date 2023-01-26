import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

import { stripe } from "../api/stripe";

import { SuccessContainer, ImageContainer, ProductsContainer } from "../styles/pages/success";

type Product = {
  name: string;
  imageUrl: string;
}
interface SuccessProps {
  customerName: string;
  products: Product[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ProductsContainer>
          {products.map(product => (
            <ImageContainer key={product.name}>
              <Image src={product.imageUrl} alt="" width={140} height={140} />
            </ImageContainer>
          ))}
        </ProductsContainer>

        <p>Uhuul <strong>{customerName}</strong>, sua compra de <strong>{products.length}</strong> camisetas já está a caminho da sua casa. </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details.name
  const products = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      customerName,
      products,
    }
  }
}
