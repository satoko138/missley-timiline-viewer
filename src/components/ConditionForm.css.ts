import { style } from '@vanilla-extract/css';

export const container = style({
    width: '50vw',
    margin: 'auto',
})
export const conditionForm = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '.5rem',
})

export const input = style({
    boxSizing: 'border-box',
    height: '2rem',
    padding: '0 10px',
    fontSize: '16px',
    color: '#333',
    border: 'solid 1px #ccc',
    borderRadius: '6px',
    outline: 0,
    transition: '0.3s',
    WebkitAppearance: 'none',
    ':focus': {
        border: '1px solid var(--primary)'
    },
    '::placeholder': {
        color: 'var(--gray)'
    }
})

export const iframeArea = style({
    margin: 'auto',
    width: '40rem',
    maxWidth: '100%',
})

export const iframeTextArea = style({
    display: 'block',
})