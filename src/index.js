import { render } from "react-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CategoriesContextWrapper } from "./contexts/CategoriesContext";
import RouterComponent from "./routerComponent";
import { UserContextWrapper } from "./contexts/UserContext";
const rootElement = document.getElementById("root");

render(
  <AuthProvider>
    <CategoriesContextWrapper>
      <UserContextWrapper>
        <RouterComponent />
      </UserContextWrapper>
    </CategoriesContextWrapper>
  </AuthProvider>,
  rootElement
);
