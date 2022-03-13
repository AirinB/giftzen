import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import Account from "./routes/account";
import SignIn from "./routes/signIn";
import NotFound from "./routes/404";
import Settings from "./routes/settings";
import NewAccount from "./routes/new";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="expenses" element={<Expenses />} />
                <Route path="invoices" element={<Invoices />} />
                <Route path="profile" element={<SignIn />} />
                <Route path="account" element={<Account />} />
                <Route path="new" element={<NewAccount />} />
                <Route path="settings" element={<Settings />} />
                <Route
                    path="*"
                    element={
                        <NotFound/>
                    }
                />
            </Route>
        </Routes>
    </BrowserRouter>,
    rootElement
);

