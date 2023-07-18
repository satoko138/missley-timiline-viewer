import { globalStyle, style } from "@vanilla-extract/css";
import { myVars } from "../styles/misskeyTheme.css";

export const spinnerArea = style({
    margin: '10px',
})
export const card = style({
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    margin: '5px auto',
    border: `1px solid ${myVars.color.light}`,
    borderRadius: '5px',

    ':hover': {
        cursor: 'pointer',
        background: myVars.color.light,
    }
})

export const imageArea = style({
    height: '200px',
    overflow: 'hidden',
    borderBottom: `1px solid ${myVars.color.light}`,
})

export const image = style({
    width: '100%',
    height: '100%',
    // aspectRatio: '4 / 3',
    objectFit: 'cover',
})

export const title = style({
    fontWeight: 'bold',
})
globalStyle(`${card}:hover ${title}`, {
    textDecoration: 'underline',
});

export const description = style({
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    color: myVars.color.gray,
    fontSize: '80%',
})