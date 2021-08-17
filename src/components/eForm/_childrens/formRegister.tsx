import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import EButton from '../../eButton/eButton';
import { registerUser } from '../../../services/userAccount';
import useUser from '../../../hooks/useUser';

type formValues = {
  username: string;
  email: string;
  password: string;
};

type Props = {
  toLogin?: () => void;
};

const FormRegister: React.FC<Props> = ({ toLogin }) => {
  const [errorAccount, setErrorAccount] = useState({ message: '' });
  const { setUser } = useUser();
  const history = useHistory();

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
    if (
      errors.username !== '' ||
      errors.password !== '' ||
      errors.email !== ''
    ) {
      return errors;
    }
    return {};
  }

  async function formSubmit(values: any) {
    try {
      const req = await registerUser(values);
      const {
        ok,
        user: { username, profileImage, places, _id, description },
      } = req.data;
      if (ok) {
        setUser({
          username,
          userImage: profileImage,
          userPlaces: places,
          uuid: _id,
          userDescription: description,
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
      email: '',
      password: '',
    },
    validate,
  });

  return (
    <>
      <div className="Form__error">{errorAccount.message}</div>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Ingrese su nombre de usuario"
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
          placeholder="Ingrese su correo electrónico"
          label="Email"
          name="email"
          value={values.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
          invalid={!!errors.email && touched.email}
        />
        <Input
          type="password"
          placeholder="Ingrese su contraseña"
          label="Contraseña"
          name="password"
          value={values.password}
          handleBlur={handleBlur}
          handleChange={handleChange}
          invalid={!!errors.password && touched.password}
        />
        <EButton text="Registrarme" type="submit" />
        <div className="Form__register-box">
          <span>Ya tienes una cuenta?</span>
          <button onClick={toLogin} type="button">
            <h3>Inicia sesión!</h3>
          </button>
        </div>
      </form>
    </>
  );
};

export default FormRegister;
