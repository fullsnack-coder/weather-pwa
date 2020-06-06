import React, { useContext, useState, useRef } from 'react';
import axios from 'axios';
import { FaPenAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

import './Profile.css';
import EHeader from '../../components/eHeader/eHeader';
import EForm from '../../components/eForm/eForm';
import { appContext } from '../../context/app';
import config from '../../utils/config';

const Profile: React.FC = () => {
  const { darkMode, user } = useContext(appContext);
  const username: string | undefined = user?.username;
  const [newUser, setNewUser] = useState(false);
  const [supportImage, setImage] = useState<any>('/assets/person.svg');
  const el = document.createElement('form');
  const formRef = useRef<HTMLFormElement>(el);

  function handleChange(e: any) {
    if (e.target.value !== '') {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  }

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
    return req;
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
          <div className="relative mb10">
            <figure className="User__picture mb10">
              <img src={user?.userImage || supportImage} alt="userimage" />
            </figure>
            <form ref={formRef}>
              <label
                className="Profile__edit-pict"
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
              {supportImage !== '/assets/person.svg' && (
                <button onClick={updateUserImage} type="submit">
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
