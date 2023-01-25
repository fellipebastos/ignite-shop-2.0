import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'

import logoImg from '../assets/logo.svg'

import { globalStyles } from '../styles/global'
import { CartButton, Container, Header } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>

        <CartButton type="button" disabled hasItems>
          <Handbag size={24} />
          <span>1</span>
        </CartButton>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
