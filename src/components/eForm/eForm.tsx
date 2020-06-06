import React, { useContext } from 'react';
import { motion } from 'framer-motion';

import './EForm.css';
import { appContext } from '../../context/app';
import FormEdit from './_childrens/formEdit';
import FormLogin from './_childrens/formLogin';
import FormRegister from './_childrens/formRegister';

type Props = {
  variant: 'edit' | 'login' | 'register';
  setNewUser?: () => void;
};

const EForm: React.FC<Props> = ({ variant, setNewUser }) => {
  const { darkMode } = useContext(appContext);

  function getTitle() {
    switch (variant) {
      case 'edit':
        return 'Mi información';
      case 'login':
        return 'Inicia sesión';
      case 'register':
        return 'Registrate!';
      default:
        return '';
    }
  }

  function renderTemplate() {
    switch (variant) {
      case 'edit':
        return <FormEdit />;
      case 'login':
        return <FormLogin toRegister={setNewUser} />;
      case 'register':
        return <FormRegister toLogin={setNewUser} />;
      default:
        return '';
    }
  }

  const title = getTitle();

  return (
    <motion.div
      className={darkMode ? 'Form darkMode' : 'Form'}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <h2 className="mb10">{title}</h2>
      <div className="container">{renderTemplate()}</div>
    </motion.div>
  );
};

export default EForm;
