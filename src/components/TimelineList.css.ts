import { style } from '@vanilla-extract/css';
import { myVars } from '../styles/misskeyTheme.css';

export const container = style({
    position: 'relative',
    height: '100%',
    border: `1px solid ${myVars.color.light}`,
    borderRadius: '5px',
})

export const authorArea = style({
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    boxSizing: 'border-box',
    borderBottom: `1px solid ${myVars.color.light}`,
});
export const authorName = style ({
    textDecoration: 'none',
})
export const postsArea = style({
    maxHeight: 'calc(100% - 3rem)',
    overflowY: 'auto',
    overflowX: 'hidden',
})
export const icon = style({
    height: '100%',
})