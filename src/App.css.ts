import { globalStyle, style } from '@vanilla-extract/css';

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

globalStyle(`${app}:has(${conditionArea})`, {
    padding: '10px',
    boxSizing: 'border-box',
})

export const timelineArea = style({
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    display: 'grid',
});

export const spinnerOverlay = style({
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, .5)',
    zIndex: 10,
})