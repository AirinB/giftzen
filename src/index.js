import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from "./App";
import Christmas from "./routes/christmas";
import Anniversary from "./routes/anniversary";
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
                <Route path="christmas" element={<Christmas />} />
                <Route path="anniversary" element={<Anniversary />} />
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

