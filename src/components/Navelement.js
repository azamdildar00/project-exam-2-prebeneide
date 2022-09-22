
import React from 'react'
import { useAuth } from '../context/AuthContext';
import UserNav from './UserNav';
import AdminNav from './AdminNav'; 

function Navelement() {
  const [auth] = useAuth();

  return (
              auth? (
                          <AdminNav />
              ) : (       <UserNav />
              )
  );
};
export default Navelement