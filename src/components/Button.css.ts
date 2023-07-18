import { style } from "@vanilla-extract/css";
import { myVars } from "../styles/misskeyTheme.css";

const boxShadow = '0 3px 6px 0 rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12)';
export const buttonStyle = style({
    display: 'inline-block',
    padding: '0.4em 1.6em',
    fontSize: '0.8rem',
    textDecoration: 'none',
    userSelect: 'none',
    borderRadius: '20px',
    transition: '0.4s ease',

    ':hover': {
        boxShadow,
    }
})

export const primaryStyle = style({
    color: '#fff',
    background: myVars.color.primary,
    border: `1px ${myVars.color.primary} solid`,

    ':hover': {
        boxShadow,
    }
})

export const outlinePrimaryStyle = style({
    color: myVars.color.primary,
    border: `1px ${myVars.color.primary} solid`,
    backgroundColor: '#fff',
})

export const secondaryStyle = style({
    color: '#fff',
    border: `1px ${myVars.color.secondary} solid`,
    background: myVars.color.secondary,
})

export const outlineSecondaryStyle = style({
    color: myVars.color.secondary,
    border: `1px ${myVars.color.secondary} solid`,
    backgroundColor: '#fff',
})

export const variant = {
    primary: primaryStyle,
    "outline-primary": outlinePrimaryStyle,
    secondary: secondaryStyle,
    "outline-secondary": outlineSecondaryStyle,
}