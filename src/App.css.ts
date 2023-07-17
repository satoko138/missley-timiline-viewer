import { style } from '@vanilla-extract/css';

export const app = style({
    maxWidth: '500px',
    maxHeight: '100vh',
    position: 'relative',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
})

export const conditionArea = style({
    flex: 1,
});

export const timelineArea = style({
    position: 'relative',
    overflow: 'hidden',
    height: '100vh',
});