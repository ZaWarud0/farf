import React from 'react';
import './Input.css';

interface Props {
    label?: string;
    value?: string;
    readOnly?: boolean;
    style?: object;
    labelTop?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error?: string;
}

interface TextProps extends Props { }
interface NumberProps extends Props { }
interface DateProps extends Props { }

interface SelectProps extends Props {
    options: string[];
}

const Text: React.FC<TextProps> = ({value, label, readOnly, style, labelTop = false, onChange, error}) => {
    return (
        <div style={style} className={labelTop ? "" : "df aic mb-2"}>
            <label style={{flex: .4 }} className="label">{label}</label>
            <input onChange={onChange} readOnly={readOnly} value={value} style={{flex: 1}} placeholder={error ? error : label} className={`input${error ? " error" : ""}`} type="text"/>
        </div>
    );
};


const Number: React.FC<NumberProps> = ({value, label, readOnly, onChange}) => {
    return (
        <div className="df aic mb-2">
            <label style={{flex: .4 }} className="label">{label}</label>
            <input onChange={onChange} readOnly={readOnly} value={value} style={{flex: 1}} placeholder={label} className="input" type="number"/>
        </div>
    );
};

const Select: React.FC<SelectProps> = ({value, label, options, labelTop = false, style, onChange, error}) => {
    return (
        <div style={style} className={labelTop ? "" : "df aic mb-2"}>
            <label style={{flex: .4}} className="label">{label}</label>
            <select value={value} onChange={onChange} style={{flex: 1}} className={`input${error ? " error" : ""}`}>
                <option value="">...</option>
                {options.map((opt: string, i:number) => (<option key={i} value={opt}>{opt}</option>))}
            </select>
        </div>
    );
};

const Date: React.FC<DateProps> = ({value, label}) => {
    return (
        <div className="df aic mb-2">
            <label style={{flex: .4}} className="label">{label}</label>
            <input readOnly value={value} style={{flex: 1}} placeholder="Date" className="input" type="date"/>
        </div>
    )
}

const Input = {
    Text,
    Number,
    Select,
    Date
}

export default Input;
