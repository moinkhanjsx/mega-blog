import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = userData && userData.labels && userData.labels.includes('admin');
  
  if (!isAdmin) {
    return <Navigate to="/not-authorized" />;
  }
  
  return children;
};

export default AdminRoute; 