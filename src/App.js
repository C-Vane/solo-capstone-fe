import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import FullPage from "./FullPageErrorLoader/FullPage";
import Protected from "./functions/Protected";
import CallEndPage from "./pages/CallEndPage";
import CallPage from "./pages/CallPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import StartVideoCallPage from "./pages/StartVideoCallPage";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/startCall", component: StartVideoCallPage, isProtected: true },
  { path: "/account", component: ProfilePage, isProtected: true },
  { path: "/video/:id", component: CallPage },
  { path: "/callEnded", component: CallEndPage },
];
function App() {
  return (
    <Router>
      <FullPage />
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
