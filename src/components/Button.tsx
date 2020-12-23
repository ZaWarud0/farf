import React from 'react';
import './Button.css';

interface Props {
    onClick: () => void;
    children: string;
}

const Button: React.FC<Props> = ({onClick, children}) => {
        return (
            <button onClick={onClick} className="button push">
                {children}
            </button>
        );
}
export default Button;
