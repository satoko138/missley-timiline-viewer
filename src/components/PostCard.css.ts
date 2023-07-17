import { style } from '@vanilla-extract/css';
import { myVars } from '../styles/misskeyTheme.css';

export const card = style({
    borderBottom: `1px solid ${myVars.color.light}`,
    whiteSpace: 'pre-wrap',
    padding: '10px',
})

export const pubDate = style({
    marginBottom: '5px',
    color: myVars.color.gray,
    fontSize: '80%',
})