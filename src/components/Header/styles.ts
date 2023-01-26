import { styled } from "@/src/styles";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CartButton = styled('button', {
  position: 'relative',
  padding: '0.75rem',

  border: 0,
  borderRadius: '6px',

  background: '$gray800',
  color: '$gray500',

  cursor: 'pointer',

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

  variants: {
    hasItems: {
      true: {
        color: '$gray300',
      },
      false: {
        cursor: 'not-allowed',
      }
    }
  }
})
