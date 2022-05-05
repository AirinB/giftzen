import React, { useContext } from "react";
import "./App.css";
import { AuthProvider } from "../contexts/AuthContext";
import { WishlistsContextWrapper } from "../contexts/WishlistContext";
import { CategoriesContextWrapper } from "../contexts/CategoriesContext";
import { UserContextWrapper } from "../contexts/UserContext";
import { AlertsContextWrapper } from "../contexts/AlertsContext";
import RouterComponent from "../routerComponent";

function App({ isPrivate = true }) {
  return (
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
  );
}

export default App;
