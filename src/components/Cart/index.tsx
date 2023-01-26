import Image from "next/image";
import { X } from "phosphor-react";

import camisetaImg from '../../assets/camisetas/1.png'

import { CartContainer, CloseButton, ImageContainer, Product, CartProductContainer, CartProductList, CartSummary, CheckoutButton } from "./styles";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  return (
    <CartContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>
        <X size={24} />
      </CloseButton>

      <CartProductContainer>
        <h1>Sacola de compras</h1>

        <CartProductList>
          <li>
            <Product>
              <ImageContainer>
                <Image src={camisetaImg} width={94} height={94} alt="" />
              </ImageContainer>

              <div>
                <h2>Camiseta Beyond the Limits</h2>
                <span>R$ 79,90</span>
                <button>
                  Remover
                </button>
              </div>
            </Product>
          </li>
          <li>
            <Product>
              <ImageContainer>
                <Image src={camisetaImg} width={94} height={94} alt="" />
              </ImageContainer>

              <div>
                <h2>Camiseta Beyond the Limits</h2>
                <span>R$ 79,90</span>
                <button>
                  Remover
                </button>
              </div>
            </Product>
          </li>
        </CartProductList>
      </CartProductContainer>

      <CartSummary>
        <div>
          <span>Quantidade</span>
          <span>3 itens</span>
        </div>

        <div>
          <span>Valor Total</span>
          <span>R$ 270,00</span>
        </div>
      </CartSummary>

      <CheckoutButton>
        Finalizar compra
      </CheckoutButton>
    </CartContainer>
  )
}
