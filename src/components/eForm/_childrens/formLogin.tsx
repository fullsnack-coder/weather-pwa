// eslint-disable-next-line no-unused-vars
import React, { SyntheticEvent, useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import EButton from '../../eButton/eButton';
import Input from './Input';
import { loginUser } from '../../../services/userAccount';
import { appContext } from '../../../context/app';

type formValues = {
  username: string;
  password: string;
};

type Props = {
  toRegister: any;
};

export default function FormLogin({ toRegister }: Props) {
  const { setUser } = useContext(appContext);
  const [errorAccount, setErrorAccount] = useState({ message: '' });
  const history = useHistory();

  function validate(values: formValues) {
    const errors: formValues = { username: '', password: '' };
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
    try {
      const req = await loginUser(values);
      const {
        ok,
        user: { username, profileImage, _id, places },
      } = req.data;
      if (ok) {
        setUser({
          username,
          userImage: profileImage,
          uuid: _id,
          userPlaces: places,
        });
        history.push('/');
      }
    } catch (err) {
      setErrorAccount({ message: err.response.data.error.message });
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
    <>
      <div className="Form__error">{errorAccount.message}</div>
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
        <div className="Form__register-box">
          <span>No tienes una cuenta?</span>
          <button onClick={toRegister} type="button">
            <h3>Registrate!</h3>
          </button>
        </div>
      </form>
    </>
  );
}
