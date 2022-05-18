import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import MyTabs from '../components/MyTabs';
import { useCategories } from '../contexts/CategoriesContext';
import styled from '@emotion/styled';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function PrivateApp() {
  const { isLoading } = useCategories();

  if (isLoading) {
    return (
      <CenteredContainer>
        {/* eslint-disable-next-line no-undef */}
        <img src={`${process.env.PUBLIC_URL}/loading-gift.webp`} alt="loader image" />
      </CenteredContainer>
    );
  }

  return (
    <div className="App">
      <MyTabs />
      <Outlet />
      <span>&nbsp;&nbsp;&nbsp;</span>
    </div>
  );
}

export default PrivateApp;
