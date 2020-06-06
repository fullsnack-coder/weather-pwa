import React, { useContext } from 'react';
import { appContext } from '../../context/app';
import './EButton.css';

type Props = {
  text: string;
  Icon?: any;
  handleClick?: any;
  type: 'button' | 'submit';
};

const EButton: React.FC<Props> = ({
  text,
  Icon,
  handleClick,
  type = 'button',
}) => {
  const { darkMode } = useContext(appContext);

  return (
    <button
      className={darkMode ? 'Button darkMode' : 'Button'}
      onClick={handleClick}
      type={type}
    >
      {Icon}
      <p>{text}</p>
    </button>
  );
};

export default EButton;
