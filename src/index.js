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
import Birthday from "./routes/birthday";
import Valentines from "./routes/valentines";
import Woman from "./routes/woman";
import Man from "./routes/man";
import PrivateRoute from "./components/PrivateRoute";

const rootElement = document.getElementById("root");

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="anniversary" element={<Anniversary />} />
                <Route path="christmas" element={<Christmas />} />
                <Route path="birthday" element={<Birthday />} />
                <Route path="valentines" element={<Valentines />} />
                <Route path="woman" element={<Woman />} />
                <Route path="man" element={<Man />} />
                <Route path="anniversary" element={<Anniversary />} />
                <Route path="profile" element={<SignIn />} />
                <Route element={<PrivateRoute/>}>
                    <Route path="account" element={<Account />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="new" element={<NewAccount />} />
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

