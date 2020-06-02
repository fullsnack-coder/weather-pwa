import React from 'react';
import { useFormik } from 'formik';
import Input from './Input';
import EButton from '../../eButton/eButton';

type formValues = {
  username: string;
  userlastname: string;
};

const FormEdit: React.FC = () => {
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
    <form onSubmit={handleSubmit}>
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
  );
};

export default FormEdit;
