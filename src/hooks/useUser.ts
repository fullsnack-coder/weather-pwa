import { useContext } from 'react';
import { userContext } from '../context/userContext';

function useUser() {
  const { user, setUser } = useContext(userContext);
  return {
    ...user,
    setUser,
  };
}

export default useUser;
