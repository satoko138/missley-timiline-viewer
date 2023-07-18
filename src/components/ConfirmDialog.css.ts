import { style } from "@vanilla-extract/css";
import { myVars } from "../styles/misskeyTheme.css";

export const dialogStyle = style({
    padding: 0,
    border: `1px solid ${myVars.color.light}`,
    borderRadius: '0.5rem',

    ':focus': {
        outline: 'none',
    }
})

export const headerStyle = style({
    padding: '3px 10px',
    fontSize: '120%',
    textAlign: 'right',
})

export const closeBtnStyle = style({
    cursor: 'pointer',
})

export const bodyStyle = style({
    padding: '1rem',
})