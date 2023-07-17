import { createTheme, globalStyle } from '@vanilla-extract/css';

export const [myTheme, myVars] = createTheme({
    color: {
        primary: 'rgb(134, 179, 0)',
        light: '#D9D5D2',
        gray: '#848484',
        dark: 'rgb(107, 114, 128)',
    }
})

globalStyle('a', {
    color: myVars.color.primary,
});
