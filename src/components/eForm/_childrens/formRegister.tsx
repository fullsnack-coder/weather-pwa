import React from 'react';
import { useFormik } from 'formik';
import Input from './Input';
import EButton from '../../eButton/eButton';

type formValues = {
  username: string;
  email: string;
  password: string;
};

const FormRegister: React.FC = () => {
  function validate(values: formValues) {
    const errors: formValues = { username: '', email: '', password: '' };
    if (values.username.length <= 0) {
      errors.username = 'El campo de username es requerido';
    }
    if (values.email.length <= 0) {
      errors.email = 'El campo email es requerido';
    }
    if (values.password.length <= 0) {
      errors.password = 'El campo contraseña es requerido';
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
      email: '',
      password: '',
    },
    validate,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Ingrese su nombre de usuario"
        label="Username"
        type="text"
        name="username"
        value={values.username}
        handleBlur={handleBlur}
        handleChange={handleChange}
        invalid={errors.username !== '' && touched.username}
      />
      <Input
        type="text"
        placeholder="Ingrese su correo electrónico"
        label="Email"
        name="email"
        value={values.email}
        handleBlur={handleBlur}
        handleChange={handleChange}
        invalid={errors.email !== '' && touched.email}
      />
      <Input
        type="text"
        placeholder="Ingrese su contraseña"
        label="Contraseña"
        name="password"
        value={values.password}
        handleBlur={handleBlur}
        handleChange={handleChange}
        invalid={errors.password !== '' && touched.password}
      />
      <EButton text="Registrarme" type="submit" />
    </form>
  );
};

export default FormRegister;
