import React, { useContext } from 'react';
import { appContext } from '../../context/app';
import './EButton.css';

type Props = {
  text: string;
  Icon?: any;
  handleClick?: () => void;
  type?: any;
};

const EButton: React.FC<Props> = ({ text, Icon, handleClick, type }) => {
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
