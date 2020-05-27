import React, { useContext, ChangeEvent } from 'react';
import classNames from 'classnames';
import { appContext } from '../../../context/app';
import './Input.css';

type Props = {
  type?: string;
  label: string;
  placeholder?: string;
  name: string;
  handleChange?: (e: string | ChangeEvent<any>) => void;
  handleBlur?: (e: any) => void;
  value?: any;
  invalid?: boolean;
};

const Input: React.FC<Props> = ({
  type,
  label,
  placeholder,
  name,
  handleChange,
  handleBlur,
  value,
  invalid,
}) => {
  const { darkMode } = useContext(appContext);
  const classes = classNames('Input', { darkMode, invalid });

  return (
    <div className={classes}>
      <input
        type={type || 'text'}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        id={`input__${name}`}
        value={value}
        autoComplete="off"
        onBlurCapture={(e) => {
          if (e.target.value.length <= 0) {
            e.target.classList.remove('active');
          } else {
            e.target.classList.add('active');
          }
        }}
      />
      <label className="Input__label" htmlFor={`input__${name}`}>
        {label}
      </label>
    </div>
  );
};

export default Input;
