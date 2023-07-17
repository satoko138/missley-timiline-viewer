import { style, globalStyle } from '@vanilla-extract/css';

export const container = style({
    display: 'flex',
})

export const label = style({
    width: '5rem',
})

globalStyle(`${container} *:nth-child(2) `, {
    flex: 1.
});
