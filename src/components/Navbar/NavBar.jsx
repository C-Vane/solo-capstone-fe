import { Avatar, Menu, MenuItem, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Bar, Nav, Logo, NavItem, SIGN_IN, SIGN_UP, mapStateToProps, mapDispatchToProps } from "../../Assets/Assets";
import { getFunction } from "../../functions/CRUDFunctions";
import GetStarted from "../GetStarted/GetStarted";

export const NavBar = (props) => {
  const { user, location, setUser } = props;
  const [menu, setMenu] = useState(null);
  const [getStarted, setGetStarted] = useState(false);

  const logOut = () => {};
  const getUser = async () => {
    const loggedInUser = await getFunction("users/me");
    if (loggedInUser._id) {
      setUser(loggedInUser);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Bar>
      <Container>
        <Nav>
          <div>
            <Link to='/'>
              <Logo />
            </Link>
            <Link to='/' className={location.pathname === "/" ? "active" : ""}>
              <NavItem>Home</NavItem>
            </Link>

            {user._id && (
              <Link to='/startCall' className={location.pathname === "/startCall" ? "active" : ""}>
                <NavItem>Video Call</NavItem>
              </Link>
            )}
          </div>
          {user._id ? (
            <div>
              <Avatar alt={user.firstName} src={user.img} onClick={(e) => setMenu(e.target)}></Avatar>
              <Menu id='simple-menu' anchorEl={menu} keepMounted open={Boolean(menu)} onClose={() => setMenu(null)}>
                <MenuItem>
                  <Link to='/account'>My account</Link>
                </MenuItem>
                <MenuItem>
                  <Link to='/settings'>Settings</Link>
                </MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button variant='outlined' onClick={() => setGetStarted(SIGN_UP)}>
                Sign Up
              </Button>

              <Button variant='outlined' onClick={() => setGetStarted(SIGN_IN)}>
                Sign In
              </Button>
            </div>
          )}
        </Nav>
      </Container>

      {getStarted && <GetStarted welcome={getStarted === SIGN_IN} close={() => setGetStarted(false)} />}
    </Bar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
