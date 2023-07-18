import { createTheme, globalStyle } from '@vanilla-extract/css';

export const [myTheme, myVars] = createTheme({
    color: {
        primary: 'rgb(134, 179, 0)',
        secondary: 'rgb(96, 128, 0)', // 'rgb(249, 249, 249)',
        light: '#D9D5D2',
        gray: '#848484',
        dark: 'rgb(107, 114, 128)',
        white: '#fcfcfc',
    }
})

globalStyle('a, a *', {
    color: myVars.color.primary,
});
globalStyle('*', {
    color: myVars.color.dark,
});
