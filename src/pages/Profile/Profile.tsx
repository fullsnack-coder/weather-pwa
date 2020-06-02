import React, { useContext } from 'react';
import { FaPenAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

import './Profile.css';
import EHeader from '../../components/eHeader/eHeader';
import EForm from '../../components/eForm/eForm';
import { appContext } from '../../context/app';

const Profile: React.FC = () => {
  const { darkMode, user } = useContext(appContext);
  const username: string | undefined = user?.username;

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
              <img
                src="https://i.giphy.com/media/gFc4ioGkPc9DfSeBgr/giphy.webp"
                alt="userimage"
              />
            </figure>
            <div className="Profile__edit-pict">
              <FaPenAlt className="icon" />
            </div>
          </div>
        )}
        {username ? <EForm variant="edit" /> : <EForm variant="login" />}
      </div>
    </motion.div>
  );
};

export default Profile;
