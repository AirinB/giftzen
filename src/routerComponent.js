import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Account from "./pages/account";
import SignIn from "./pages/signIn";
import NotFound from "./pages/404";
import Settings from "./pages/settings";
import NewAccount from "./pages/new";
import PrivateRoute from "./components/PrivateRoute";
import NewGift from "./pages/gift";
import CategoryPage from "./pages/CategoryPage";
import LikedGiftsPage from "./pages/LikedGiftsPage";

const RouterComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/liked-gifts" element={<LikedGiftsPage />} />
          <Route path="profile" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="account" element={<Account />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="new" element={<NewAccount />} />
          <Route path="gift" element={<NewGift />} />
          <Route path="gift/:categoryName" element={<NewGift />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterComponent;
