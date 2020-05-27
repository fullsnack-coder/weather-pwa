import React from 'react';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';

import EButton from '../eButton/eButton';
import './EForm.css';
import Input from './_childrens/Input';

type Props = {
  title: string;
};

type formValues = {
  username: string;
  userlastname: string;
};

const EForm: React.FC<Props> = ({ title }) => {
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

  return (
    <motion.div
      className="Form"
      initial={{ opacity: 0, y: 100 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <h2 className="mb10">{title}</h2>
      <form className="container" onSubmit={handleSubmit}>
        <Input
          placeholder="Ingrese su nombre"
          label="Nombres"
          type="text"
          name="username"
          value={values.username}
          handleBlur={handleBlur}
          handleChange={handleChange}
          invalid={errors.username !== '' && touched.username}
        />
        <Input
          type="text"
          placeholder="Ingrese sus apellidos"
          label="Apellidos"
          name="userlastname"
          value={values.userlastname}
          handleBlur={handleBlur}
          handleChange={handleChange}
          invalid={errors.userlastname !== '' && touched.userlastname}
        />
        <EButton text="Guardar cambios" type="submit" />
      </form>
    </motion.div>
  );
};

export default EForm;
