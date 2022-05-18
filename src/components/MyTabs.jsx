import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from 'react-router-dom';
import * as React from 'react';
import AccountMenu from './AccountMenu';
import { CategoriesContext } from '../contexts/CategoriesContext';
import { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function MyTabs() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const { categoriesByName } = useContext(CategoriesContext);

  // You need to provide the pages in descendant order.
  // This means that if you have nested pages like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  // const routeMatch = useRouteMatch(['/inbox/:id', '/drafts', '/trash']);
  // const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={location.pathname}>
      {Object.entries(categoriesByName).map(([categoryName, categoryId]) => (
        <Tab
          key={categoryId}
          label={categoryName}
          value={`/category/${categoryName}`}
          to={`/category/${categoryName}`}
          component={Link}
        />
      ))}
      {!!currentUser && (
        <>
          <Tab
            key={'likedGifts'}
            label={'Liked Gifts'}
            value={`/liked-gifts`}
            to={`/liked-gifts`}
            component={Link}
          />{' '}
          <Tab
            key={'wishlists'}
            label={'Wishlists'}
            value={`/wishlists`}
            to={`/wishlists`}
            component={Link}
          />
        </>
      )}
      <div style={{ selfAlign: 'flex-end', justifySelf: 'flex-end' }}>
        <AccountMenu />
      </div>
    </Tabs>
  );
}
