import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Link, useLocation} from "react-router-dom";
import * as React from "react";
import AccountMenu from "./AccountMenu";

export default function MyTabs() {
    const location = useLocation();
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    // const routeMatch = useRouteMatch(['/inbox/:id', '/drafts', '/trash']);
    // const currentTab = routeMatch?.pattern?.path;

    return (
        <Tabs value={location.pathname}>
            {/* <Tab label="Inbox" value="/inbox/:id" to="/inbox/1" component={Link} /> */}
            <Tab label="Anniversary" value="/anniversary" to="/anniversary" component={Link} />
            <Tab label="Christmas" value="/christmas" to="/Christmas" component={Link} />
            <AccountMenu/>
        </Tabs>
    );
}
