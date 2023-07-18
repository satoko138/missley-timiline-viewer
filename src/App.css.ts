import { globalStyle, style } from '@vanilla-extract/css';
import { myVars } from './styles/misskeyTheme.css';

const footerHeight = '2rem';

export const app = style({
    maxWidth: '500px',
    height: '100vh',
    position: 'relative',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
});

export const searchModeStyle = style({
    height: `calc(100vh - ${footerHeight})`
});

export const titleStyle = style({
    textAlign: 'center',
    color: myVars.color.secondary,
})

export const explainParagraphStyle = style({
    margin: 0,
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

export const footerStyle = style({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100vw',
    height: '2rem',
    background: myVars.color.light,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '5px',
    alignItems: 'center',
    padding: '5px 10px',
    boxSizing: 'border-box',
});

globalStyle(`${footerStyle} *`, {
    color: myVars.color.white,
    textDecoration: 'none',
});

export const gitHubLogStyle = style({
    height: '100%',
})
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