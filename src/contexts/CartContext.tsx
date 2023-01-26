import { createContext, ReactNode, useState } from "react";

type Product = {
  id: string
  name: string
  imageUrl: string
  price: number
  formattedPrice: string
  description: string
  defaultPriceId: string
}

interface CartContextProps {
  products: Product[];
  totalProducts: number;
  total: number;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [products, setProducts] = useState<Product[]>([])

  function addProduct(product: Product) {
    const productExists = products.find(item => item.id === product.id)

    if (!productExists) {
      setProducts([...products, product])
    }
  }

  function removeProduct(productId: string) {
    setProducts(products.filter(item => item.id !== productId))
  }

  const totalProducts = products.length

  const total = products.reduce((acc, product) => (acc + product.price), 0)

  return (
    <CartContext.Provider value={{
      products,
      totalProducts,
      total,
      addProduct,
      removeProduct
    }}>
      {children}
    </CartContext.Provider>
  )
}
