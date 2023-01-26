import { useCart } from '@/src/hooks/useCart'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Handbag } from 'phosphor-react'
import { useState } from 'react'

import logoImg from '../../assets/logo.svg'
import { Cart } from '../Cart'
import { CartButton, HeaderContainer } from './styles'

export function Header() {
  const { totalProducts } = useCart()
  const { pathname } = useRouter()

  const [isCartOpen, setIsCartOpen] = useState(false)

  const hasItems = totalProducts > 0
  const showCart = pathname !== '/success';

  function handleCart() {
    setIsCartOpen(state => !state && hasItems)
  }

  return (
    <>
      <HeaderContainer>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>

        {showCart && (
          <CartButton type="button" hasItems={hasItems} onClick={handleCart}>
            <Handbag size={24} />
            {hasItems && <span>{totalProducts}</span>}
          </CartButton>
        )}
      </HeaderContainer>

      {showCart && <Cart isOpen={isCartOpen} onClose={handleCart} />}
    </>
  )
}
