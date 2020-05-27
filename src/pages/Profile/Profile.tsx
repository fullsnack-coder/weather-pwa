import React, { useContext } from 'react';
import { FaPenAlt } from 'react-icons/fa';

import './Profile.css';
import EHeader from '../../components/eHeader/eHeader';
import EForm from '../../components/eForm/eForm';
import { appContext } from '../../context/app';

export default function Profile() {
  const { darkMode } = useContext(appContext);
  return (
    <div className={darkMode ? 'Profile darkMode' : 'Profile'}>
      <EHeader />
      <div className="wrapper">
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
        <EForm title="Mi información" />
      </div>
    </div>
  );
}
