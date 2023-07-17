import { style } from '@vanilla-extract/css';
import { myVars } from '../styles/misskeyTheme.css';

export const container = style({
    position: 'relative',
    border: `1px solid ${myVars.color.light}`,
})