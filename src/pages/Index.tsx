
import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from './Login';

const Index = () => {
  // For demo purposes, we're just showing the login page
  // In a real app, you might check authentication status here
  return <Login />;
};

export default Index;
