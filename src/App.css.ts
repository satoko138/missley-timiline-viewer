import { style } from '@vanilla-extract/css';

export const app = style({
    maxWidth: '500px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
})

export const conditionArea = style({
    flex: 1,
});
