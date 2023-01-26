import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { useState } from 'react'

import logoImg from '../../assets/logo.svg'
import { Cart } from '../Cart'
import { CartButton, HeaderContainer } from './styles'

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  function handleCart() {
    setIsCartOpen(state => !state)
  }

  return (
    <>
      <HeaderContainer>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>

        <CartButton type="button" hasItems onClick={handleCart}>
          <Handbag size={24} />
          <span>1</span>
        </CartButton>
      </HeaderContainer>

      <Cart isOpen={isCartOpen} onClose={handleCart} />
    </>
  )
}
