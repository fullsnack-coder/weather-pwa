/* eslint-disable indent */
/* eslint-disable operator-linebreak */
// eslint-disable-next-line object-curly-newline
import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaPenAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

import './Profile.css';
import EHeader from '../../components/eHeader/eHeader';
import EForm from '../../components/eForm/eForm';
import { appContext } from '../../context/app';
import config from '../../utils/config';
import useUser from '../../hooks/useUser';

const Profile: React.FC = () => {
  const { darkMode } = useContext(appContext);
  const { setUser } = useUser();
  const user = useUser();
  const username: string | undefined = user?.username;
  const [newUser, setNewUser] = useState(false);
  const [supportImage, setImage] = useState<any>('/assets/person.svg');
  const el = document.createElement('form');
  const formRef = useRef<HTMLFormElement>(el);

  function handleChange(e: any) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if (user?.userImage !== '') {
      setImage(user?.userImage);
    }
  }, [user.userImage]);

  async function updateUserImage(e: any) {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const req = await axios.post(
      `${config.server.serverUri}/upload/image`,
      formData,
      {
        headers: {
          userId: user?.uuid,
        },
      },
    );
    if (req.status === 200) {
      setUser((prevUser: any) => ({ ...prevUser, userImage: supportImage }));
      Swal.fire({
        title: 'Enhorabuena',
        text: 'Imagen actualizada correctamente',
        icon: 'success',
        toast: true,
        timer: 2000,
      });
    } else {
      Swal.fire({
        title: 'Oh oh',
        text: 'Ocurrió un error inesperado, intente de nuevo mas tarde',
        icon: 'error',
        timer: 2000,
      });
    }
  }

  return (
    <motion.div
      className={darkMode ? 'Profile darkMode' : 'Profile'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <EHeader />
      <div className="wrapper">
        {username && (
          <div className="relative User__header mb10">
            <figure className="User__picture mb10">
              <img src={supportImage} alt="userimage" />
            </figure>
            <form ref={formRef}>
              <label
                className={
                  supportImage === '/assets/person.svg' ||
                  supportImage === user?.userImage
                    ? 'Profile__edit-pict'
                    : 'Profile__edit-pict active'
                }
                htmlFor="img-input"
                aria-label="User-img"
              >
                <FaPenAlt className="icon" />
                <input
                  type="file"
                  id="img-input"
                  name="file-input"
                  onChange={handleChange}
                />
              </label>
              {supportImage !== '/assets/person.svg' &&
                supportImage !== user?.userImage && (
                  <button
                    onClick={updateUserImage}
                    type="submit"
                    className="Profile__upload-button"
                  >
                    Actualizar imagen
                  </button>
                )}
            </form>
          </div>
        )}
        {username ? (
          <EForm variant="edit" />
        ) : (
          <EForm
            variant={newUser ? 'register' : 'login'}
            setNewUser={() => setNewUser(!newUser)}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
