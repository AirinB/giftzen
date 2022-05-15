import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import './App.css';
import { AuthProvider } from '../contexts/AuthContext';
import { WishlistsContextWrapper } from '../contexts/WishlistContext';
import { CategoriesContextWrapper } from '../contexts/CategoriesContext';
import { UserContextWrapper } from '../contexts/UserContext';
import { AlertsContextWrapper } from '../contexts/AlertsContext';
import RouterComponent from '../routerComponent';

function App({ isPrivate = true }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <WishlistsContextWrapper>
          <CategoriesContextWrapper>
            <UserContextWrapper>
              <AlertsContextWrapper>
                <RouterComponent isPrivate={isPrivate} />
              </AlertsContextWrapper>
            </UserContextWrapper>
          </CategoriesContextWrapper>
        </WishlistsContextWrapper>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;

App.propTypes = {
  isPrivate: PropTypes.bool,
};
