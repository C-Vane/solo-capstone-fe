import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/Navbar/NavBar";
import Protected from "./functions/Protected";
import { CallPage } from "./pages/CallPage";
import { JoinCallPage } from "./pages/JoinCallPage";
import { LandingPage } from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import { SettingsPage } from "./pages/SettingsPage";
import { StartVideoCallPage } from "./pages/StartVideoCallPage";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/registration", component: RegistrationPage },
  { path: "/startCall", component: StartVideoCallPage, isProtected: true },
  { path: "/settings", component: SettingsPage, isProtected: true },
  { path: "/video/:id", component: CallPage },
  { path: "/join/:id", component: JoinCallPage },
];
function App() {
  return (
    <Router>
      <Route component={NavBar} />
      <Switch>
        {routes.map((route, key) => (
          <Route
            exact
            path={route.path}
            key={key}
            render={(props) => (
              <>
                {route.isProtected ? (
                  <Protected>
                    <route.component {...props} />
                  </Protected>
                ) : (
                  <route.component {...props} />
                )}
              </>
            )}
          ></Route>
        ))}
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
