import React, { useState } from 'react';
import { GetOgpResult } from '../types/api-types';
import Spinner from './Spinner';
import { useWatch } from '../util/useWatch';
import { card, description, image, imageArea, spinnerArea, title } from './OgpCard.css';

type Props = {
    url: string;
}
export default function OgpCard(props: Props) {
    const [ ogp, setOgp ] = useState<GetOgpResult|undefined>();

    useWatch(() => {
        try {
            const url = '/api/ogp?url=' + props.url;
            fetch(encodeURI(url)).then((res) => {
                return res.json();
            })
            .then(json => {
                setOgp(json);
            })
        } catch(e) {
            console.warn(e);
        }
    }, [props.url]);

    if (!ogp) {
        return (
            <div className={spinnerArea}>
                <Spinner />
            </div>
        )
    }

    return (
        <div className={card}>
            {ogp.image &&
                <div className={imageArea}>
                    <img className={image} src={ogp.image} alt="site" />
                </div>
            }
            <div>
                <div className={title}>{ogp.title}</div>
                <div className={description}>{ogp.description}</div>
            </div>
        </div>
    );
}