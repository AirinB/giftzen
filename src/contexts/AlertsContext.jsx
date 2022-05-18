import { useSnackbar } from 'notistack';
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export const AlertsContext = React.createContext({
  setMessage: () => {},
});

const AlertsContextProvider = AlertsContext.Provider;

export const useAlerts = () => useContext(AlertsContext);

export const AlertsContextWrapper = ({ children }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const Action = useCallback(
    (key) => (
      <IconButton onClick={() => closeSnackbar(key)}>
        <CloseIcon />
      </IconButton>
    ),
    [closeSnackbar]
  );

  const setMessage = useCallback((message, severity = 'warning') => {
    enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      key: uuid(),
      variant: severity,
      autoHideDuration: 3000,
      action: Action,
    });
  }, []);

  return (
    <AlertsContextProvider
      value={{
        setMessage,
      }}
    >
      {children}
    </AlertsContextProvider>
  );
};

AlertsContextWrapper.propTypes = {
  children: PropTypes.node,
};
