import { style } from '@vanilla-extract/css';
import { myVars } from '../styles/misskeyTheme.css';

export const card = style({
    border: `1px solid ${myVars.color.light}`,
    whiteSpace: 'pre',
})

export const pubDate = style({
    color: myVars.color.gray,
    fontSize: '80%',
})