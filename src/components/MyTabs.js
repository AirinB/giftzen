import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, useLocation } from "react-router-dom";
import * as React from "react";
import AccountMenu from "./AccountMenu";
import { CategoriesContext } from "../contexts/CategoriesContext";
import { useContext } from "react";

// Capitalize
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function MyTabs() {
  const location = useLocation();
  const { categories, categoriesByName } = useContext(CategoriesContext);

  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  // const routeMatch = useRouteMatch(['/inbox/:id', '/drafts', '/trash']);
  // const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={location.pathname}>
      {/* <Tab label="Inbox" value="/inbox/:id" to="/inbox/1" component={Link} /> */}
      {Object.entries(categoriesByName).map(([categoryName, categoryId]) => (
        <Tab
          key={categoryId}
          label={categoryName}
          value={`/category/${categoryName}`}
          to={`/category/${categoryName}`}
          component={Link}
        />
      ))}
      <AccountMenu />
    </Tabs>
  );
}
