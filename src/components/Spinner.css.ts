import { ComplexStyleRule, keyframes, style } from "@vanilla-extract/css";
import { myVars } from "../styles/misskeyTheme.css";

const uibSize = '40px';
const uibColor = myVars.color.primary;
const uibSpeed = '1.3s';

const pulse = keyframes({
    '0%': {},
    '100%': {
      transform: 'scale(0)',
    },
    '50%': {
      transform: 'scale(1.5)',
    }
})

const dotPulseDotCommon: ComplexStyleRule = {
    content: '',
    display: 'block',
    height: `calc(${uibSize} * 0.18)`,
    width: `calc(${uibSize} * 0.18)`,
    borderRadius: '50%',
    backgroundColor: uibColor,
    transform: 'scale(0)',
}

export const dotPulse = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: uibSize,
    height: `calc(${uibSize} * 0.27)`,

    '::before': Object.assign({
        animation: `${pulse} ${uibSpeed} ease-in-out infinite`
    }, dotPulseDotCommon),

    '::after': Object.assign({
        animation: `${pulse} ${uibSpeed} ease-in-out  calc(${uibSpeed} * 0.25) infinite`,
    }, dotPulseDotCommon),
})

export const dotPulseeDot = style(Object.assign({
    animation: `${pulse} ${uibSpeed} ease-in-out calc(${uibSpeed} * 0.125) infinite both`,
}, dotPulseDotCommon))

