import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';

import EButton from '../eButton/eButton';
import './EForm.css';
import Input from './_childrens/Input';
import { appContext } from '../../context/app';
import FormEdit from './_childrens/formEdit';
import FormLogin from './_childrens/formLogin';
import FormRegister from './_childrens/formRegister';

type Props = {
  variant: 'edit' | 'login' | 'register';
};

type formValues = {
  username: string;
  userlastname: string;
};

const EForm: React.FC<Props> = ({ children, variant }) => {
  function validate(values: formValues) {
    const errors: formValues = { username: '', userlastname: '' };
    if (values.username.length <= 0) {
      errors.username = 'El campo de nombres es requerido';
    }
    if (values.userlastname.length <= 0) {
      errors.userlastname = 'Se recomienda llenar el campo de apellidos';
    }
    return errors;
  }

  const {
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
  } = useFormik({
    onSubmit: (values) => {
      alert('hello world');
    },
    initialValues: {
      username: '',
      userlastname: '',
    },
    validate,
  });

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
        return <FormLogin />;
      case 'register':
        return <FormRegister />;
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
