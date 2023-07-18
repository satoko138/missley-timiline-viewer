import { createTheme, globalStyle } from '@vanilla-extract/css';

export const [myTheme, myVars] = createTheme({
    color: {
        primary: 'rgb(134, 179, 0)',
        secondary: 'rgb(96, 128, 0)',
        light: '#D9D5D2',
        gray: '#848484',
        dark: 'rgb(103, 103, 103)',
        white: '#fcfcfc',
    }
})

globalStyle('a, a *', {
    color: myVars.color.primary,
});
globalStyle('*', {
    color: myVars.color.dark,
});

globalStyle('body', {
    margin: 0,
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif`,
    color: myVars.color.dark,

    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
})