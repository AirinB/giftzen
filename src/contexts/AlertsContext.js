import React, { useContext, useEffect, useState } from "react";
import { getWishlists } from "../firebase/database";
import { AuthContext } from "./AuthContext";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/lab";

export const AlertsContext = React.createContext({
  addMessage: () => {},
});

const AlertsContextProvider = AlertsContext.Provider;

export const AlertsContextWrapper = ({ children }) => {
  const [alert, setAlert] = useState({
    message: "",
    severity: "warning",
  });

  const { message, severity } = alert;

  const clearAlert = () => {
    setAlert({
      message: "",
      severity: "warning",
    });
  };

  return (
    <AlertsContextProvider
      value={{
        setMessage: (message, severity = "warning") =>
          setAlert({ message, severity }),
      }}
    >
      <Snackbar
        autoHideDuration={3000}
        open={!!message}
        onClose={clearAlert}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={clearAlert} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {children}
    </AlertsContextProvider>
  );
};
