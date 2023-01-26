import Link from "next/link";
import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minheight: 656,
})

export const Product = styled(Link, {
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  },

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    gap: '2rem',

    borderRadius: 6,

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    '> div': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '0.25rem',
    },

    strong: {
      fontSize: '$lg',
      fontWeight: 'bold',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    }
  }
})

export const CartButton = styled('button', {
  position: 'relative',
  padding: '0.75rem',

  border: 0,
  borderRadius: '6px',

  background: '$green500',
  color: '$white',

  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$green300',
  },

  span: {
    height: '1.5rem',
    width: '1.5rem',
    padding: '0.5rem',

    fontSize: '$xs',
    fontweight: 'bold',
    color: '$white',
    backgroundColor: '$green500',
    border: '3px solid $gray900',
    borderRadius: '999px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '-7px',
    right: '-7px',
  },
})
