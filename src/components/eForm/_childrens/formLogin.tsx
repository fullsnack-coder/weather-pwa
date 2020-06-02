import React, { SyntheticEvent, useContext } from 'react';
import { useFormik } from 'formik';
import EButton from '../../eButton/eButton';
import Input from './Input';
import { loginUser } from '../../../services/login';
import { appContext } from '../../../context/app';

type formValues = {
  username: string;
  password: string;
};

export default function FormLogin() {
  const { setUser } = useContext(appContext);

  function validate(values: formValues) {
    let errors: formValues = { username: '', password: '' };
    if (values.username.length <= 0) {
      errors.username = 'El campo de username es requerido';
    }
    if (values.password.length <= 0) {
      errors.password = 'El campo de contraseña es requerido';
    }
    if (errors.username !== '' || errors.password !== '') {
      return errors;
    }
    return {};
  }

  async function formSubmit(values: formValues) {
    const req = await loginUser(values);
    console.log(req.data);
    const {
      ok,
      user: { username, profileImage },
    } = req.data;
    if (ok) {
      setUser({ username, userImage: profileImage });
    }
  }

  const {
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
  } = useFormik({
    onSubmit: formSubmit,
    initialValues: {
      username: '',
      password: '',
    },
    validate,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Ingrese su username"
        label="Username"
        type="text"
        name="username"
        value={values.username}
        handleBlur={handleBlur}
        handleChange={handleChange}
        invalid={!!errors.username && touched.username}
      />
      <Input
        type="text"
        placeholder="Ingrese su contraseña"
        label="Contraseña"
        name="password"
        value={values.password}
        handleBlur={handleBlur}
        handleChange={handleChange}
        invalid={!!errors.password && touched.password}
      />
      <EButton text="Iniciar sesión" type="submit" />
    </form>
  );
}
