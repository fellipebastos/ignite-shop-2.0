import Image from "next/image";
import { X } from "phosphor-react";
import { useState } from "react";
import axios from "axios";

import { useCart } from "@/src/hooks/useCart";
import { formatToBRL } from "@/src/utils/money";

import {
  CartContainer,
  CloseButton,
  ImageContainer,
  Product,
  CartProductContainer,
  CartProductList,
  CartSummary, CheckoutButton
} from "./styles";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { products, total, totalProducts, removeProduct } = useCart()

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleFinishCheckout() {
    setIsCreatingCheckoutSession(true)

    const priceIds = products.map(product => product.defaultPriceId)
    console.log(priceIds)
    try {
      const response = await axios.post('/api/checkout', {
        priceIds,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar para o checkout')
    }
  }

  const hasItems = totalProducts > 0
  const formattedTotal = formatToBRL(total);

  return (
    <CartContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>
        <X size={24} />
      </CloseButton>

      <CartProductContainer>
        <h1>Sacola de compras</h1>

        {!hasItems ? (
          <p>Seu carrinho está vazio!</p>
        ) : (
          <CartProductList>
            {products.map(product => (
              <li key={product.id}>
                <Product>
                  <ImageContainer>
                    <Image src={product.imageUrl} width={94} height={94} alt="" />
                  </ImageContainer>

                  <div>
                    <h2>{product.name}</h2>
                    <span>{product.formattedPrice}</span>
                    <button onClick={() => removeProduct(product.id)}>
                      Remover
                    </button>
                  </div>
                </Product>
              </li>
            ))}
          </CartProductList>
        )}
      </CartProductContainer>

      <CartSummary>
        <div>
          <span>Quantidade</span>
          <span>{totalProducts} itens</span>
        </div>

        <div>
          <span>Valor Total</span>
          <span>{formattedTotal}</span>
        </div>
      </CartSummary>

      <CheckoutButton disabled={isCreatingCheckoutSession} onClick={handleFinishCheckout}>
        Finalizar compra
      </CheckoutButton>
    </CartContainer>
  )
}
