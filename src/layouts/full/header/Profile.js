import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Profile = () => {

  const handleLogout = () => {
    
    localStorage.removeItem('token');
  
  };
  
  return (
    <>
    <Button
      to="/auth/login"
      onClick={handleLogout}
      variant="outlined"
      color="primary"
      component={Link}
      fullWidth
      style={{ color: '#003566', borderColor: '#003566' }}
    >
      Déconnexion
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#003566" 
        strokeWidth="2" 
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-logout ml-2" 
      >
        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
        <path d="M9 12h12l-3 -3" />
        <path d="M18 15l3 -3" />
      </svg>
    </Button>
  </>
  );
};

export default Profile;
