import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Account from './pages/Account';
import SignIn from './pages/signIn';
import NotFound from './pages/404';
import Settings from './pages/settings';
import CreateAccount from './pages/CreateAccount';
import PrivateRoute from './components/PrivateRoute';
import NewGift from './pages/gift';
import CategoryPage from './pages/CategoryPage';
import LikedGiftsPage from './pages/LikedGiftsPage';
import WishlistsPage from './pages/Wishlists';
import WishlistPage from './pages/WishlistPage';
import PrivateApp from './Containers/PrivateApp';
import PublicApp from './Containers/PublicApp';

const RouterComponent = ({ isPrivate }) => {
  return (
    <Routes>
      <Route path="/" element={isPrivate ? <PrivateApp /> : <PublicApp />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/wishlists" element={<WishlistsPage />} />
        <Route path="/wishlists/:wishlistId" element={<WishlistPage />} />
        <Route path="/public/wishlists/:wishlistId" element={<WishlistPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/liked-gifts" element={<LikedGiftsPage />} />
        <Route path="login" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="register" element={<CreateAccount />} />
        <Route path="gift" element={<NewGift />} />
        <Route path="gift/:categoryName" element={<NewGift />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default RouterComponent;

RouterComponent.propTypes = {
  isPrivate: PropTypes.bool,
};
