import { style } from '@vanilla-extract/css';
import { myVars } from '../styles/misskeyTheme.css';

export const container = style({
    position: 'relative',
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
export const postsArea = style({
    maxHeight: '300px',
    overflowY: 'auto',
})
export const icon = style({
    height: '100%',
})