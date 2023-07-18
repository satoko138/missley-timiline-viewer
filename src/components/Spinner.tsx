import React from 'react';
import { dotPulse, dotPulseeDot } from './Spinner.css';

export default function Spinner() {
    return (
        <div className={dotPulse}>
            <div className={dotPulseeDot}></div>
        </div>
    );
}