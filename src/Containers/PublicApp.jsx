import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

function PublicApp() {
  return <Outlet />;
}

export default PublicApp;
