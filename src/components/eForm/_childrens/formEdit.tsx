import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Input from './Input';
import EButton from '../../eButton/eButton';
import { editUser } from '../../../services/userAccount';
import useUser from '../../../hooks/useUser';

type formValues = {
  userDescription: string;
};

const FormEdit: React.FC = () => {
  const user = useUser();
  const { setUser } = useUser();
  const history = useHistory();

  function validate(values: formValues) {
    const errors: formValues = { userDescription: '' };
    if (values.userDescription.length <= 0) {
      errors.userDescription = 'El campo descripción es requerido';
    }
    if (errors.userDescription === '') {
      return {};
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
    onSubmit: (formV) => {
      editUser({
        userDescription: formV.userDescription,
        userId: `${user?.uuid}`,
      }).then((resp) => {
        if (resp.data.ok) {
          setUser((prevUser: any) => ({
            ...prevUser,
            userDescription: resp.data.user.description,
          }));
          Swal.fire({
            text: 'Se actualizó su información correctamente',
            icon: 'success',
          });
          history.push('/');
        } else if (!resp.data.ok) {
          Swal.fire({
            title: 'Oh oh',
            text: 'Ocurrió un error al actualizar su información',
            icon: 'error',
          });
        }
      });
    },
    initialValues: {
      userDescription: '',
    },
    validate,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Ingrese su nombre"
        label="Descripción"
        type="text"
        name="userDescription"
        value={values.userDescription}
        handleBlur={handleBlur}
        handleChange={handleChange}
        invalid={errors.userDescription !== '' && touched.userDescription}
      />
      <EButton text="Guardar cambios" type="submit" />
    </form>
  );
};

export default FormEdit;
