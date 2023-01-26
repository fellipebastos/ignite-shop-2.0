import { useCart } from '@/src/hooks/useCart'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { useState } from 'react'

import logoImg from '../../assets/logo.svg'
import { Cart } from '../Cart'
import { CartButton, HeaderContainer } from './styles'

export function Header() {
  const { totalProducts } = useCart()

  const [isCartOpen, setIsCartOpen] = useState(false)

  const hasItems = totalProducts > 0

  function handleCart() {
    setIsCartOpen(state => !state && hasItems)
  }

  return (
    <>
      <HeaderContainer>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>

        <CartButton type="button" hasItems={hasItems} onClick={handleCart}>
          <Handbag size={24} />
          {hasItems && <span>{totalProducts}</span>}
        </CartButton>
      </HeaderContainer>

      <Cart isOpen={isCartOpen} onClose={handleCart} />
    </>
  )
}
