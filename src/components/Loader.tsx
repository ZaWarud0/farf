import React from 'react';
import './Loader.css';

const Loader: React.FC<{message?: string}> = ({message}) => {
        return (<div className="spinner-container">
                        <div className="df fdc jcc aic">
                                <div className="spinner"></div>
                                {message && <p className="message mt-1">{message}</p>}
                        </div>
                </div>);
}
export default Loader;
