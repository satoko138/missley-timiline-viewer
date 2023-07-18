import { style } from '@vanilla-extract/css';
import { myVars } from '../styles/misskeyTheme.css';

export const container = style({
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    border: `1px solid ${myVars.color.light}`,
    borderRadius: '5px',
    boxSizing: 'border-box',
})

const authorAreaHeight = '3rem';
export const authorArea = style({
    height: authorAreaHeight,
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    boxSizing: 'border-box',
    borderBottom: `1px solid ${myVars.color.light}`,
});
export const label = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    marginLeft: '.5rem',
});
export const serverName = style({
    fontSize: '80%',
    color: myVars.color.gray,
})
export const authorName = style ({
    textDecoration: 'none',
})
export const postsArea = style({
    position: 'relative',
    height: `calc(100% - ${authorAreaHeight})`,
    overflowY: 'auto',
    overflowX: 'hidden',
})
export const icon = style({
    height: '100%',
})