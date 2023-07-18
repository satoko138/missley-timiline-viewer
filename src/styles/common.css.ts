import { style } from "@vanilla-extract/css";
import { myVars } from "./misskeyTheme.css";

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
        border: `1px solid ${myVars.color.primary}`
    },
    '::placeholder': {
        color: myVars.color.light,
    }
})
