import { styled } from "@/src/styles";

export const CartContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: '3rem',
  minWidth: 480,

  position: 'fixed',
  top: 0,
  right: 0,

  height: '100vh',

  background: '$gray800',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  transform: 'translateX(100%)',
  zIndex: 10,
  transition: 'transform 0.2s ease-in-out',

  variants: {
    isOpen: {
      true: {
        transform: 'translateX(0)',
      }
    }
  },
})

export const CloseButton = styled('button', {
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',

  lineHeight: 0,
  color: '$gray500',
  background: 'transparent',
  border: 'none',

  cursor: 'pointer',

  '&:hover': {
    color: '$gray300',
  },
})

export const CartProductContainer = styled('section', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  marginTop: '1.5rem',

  h1: {
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$gray100',
  }
})

export const CartProductList = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',

  listStyle: 'none',
})

export const Product = styled('article', {
  display: 'flex',
  gap: '1.25rem',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    h2: {
      fontSize: '$md',
      fontWeight: 400,
      color: '$gray300',
      marginBottom: '0.125rem',
    },

    span: {
      fontSize: '$md',
      fontWeight: 'bold',
      color: '$gray100',
      marginBottom: '0.5rem',
    },

    button: {
      fontSize: '$sm',
      fontWeight: 'bold',
      color: '$green500',

      border: 'none',
      background: 'transparent',
      cursor: 'pointer',

      '&:hover': {
        color: '$green300',
      }
    }
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 94,
  maxHeight: 94,
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: 8,
})

export const CartSummary = styled('div', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.375rem',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '&:first-child': {
      span: {
        '&:first-child': {
          fontSize: '$sm',
          color: '$gray100',
        },
        '&:last-child': {
          fontSize: '$md',
          color: '$gray300',
        },

      }
    },
    '&:last-child': {
      span: {
        color: '$gray100',
        fontWeight: 'bold',

        '&:first-child': {
          fontSize: '$md',
        },
        '&:last-child': {
          fontSize: '$xl',
        },
      }
    },
  }
})

export const CheckoutButton = styled('button', {
  marginTop: '3.5rem',
  backgroundColor: '$green500',
  color: '$white',
  border: 0,
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',
  fontSize: '$md',
  fontWeight: 'bold',

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  }
});
