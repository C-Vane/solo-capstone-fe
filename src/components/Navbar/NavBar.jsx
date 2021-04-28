import { Avatar, Menu, MenuItem } from "@material-ui/core";
import { AccountCircleOutlined, ExitToAppOutlined, Home, VideocamOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Bar, Nav, LogoFullName, NavItem, SIGN_IN, SIGN_UP } from "../../Assets/StyledComponents";
import { mapDispatchToProps, mapStateToProps } from "../../Assets/VideoCallFunctions";
import { getFunction, postFunction } from "../../functions/CRUDFunctions";
import GetStarted from "../GetStarted/GetStarted";

export const NavBar = (props) => {
  const { user, location, setUser } = props;
  const [menu, setMenu] = useState(null);
  const [getStarted, setGetStarted] = useState(false);

  const logOut = async () => {
    const { ok } = await postFunction("users/logOut");
    if (ok) {
      props.setLoading({ active: true });
      window.location.replace("/");
    }
  };
  const getUser = async () => {
    const loggedInUser = await getFunction("users/me");
    if (loggedInUser && loggedInUser._id) {
      setUser(loggedInUser);
    }
    setTimeout(() => {
      props.setLoading({ active: false });
    }, 1500);
  };

  useEffect(() => {
    getUser();
  }, []);
  if (props.location.pathname.includes("/video")) {
    return <div></div>;
  }
  return (
    <Bar>
      <Container>
        <Nav>
          <Link to='/'>
            <LogoFullName />
          </Link>
          {user._id && (
            <div className='nav-links'>
              <Link to='/' className={location.pathname === "/" ? "active" : ""}>
                <NavItem>
                  <Home /> <span className='d-none d-md-block'>Home</span>
                </NavItem>
              </Link>

              <Link to='/startCall' className={location.pathname === "/startCall" ? "active" : ""}>
                <NavItem>
                  <VideocamOutlined /> <span className='d-none d-md-block'>Video Call</span>
                </NavItem>
              </Link>
            </div>
          )}
          {user._id ? (
            <div className='nav-links'>
              <div onClick={(e) => setMenu(e.target)} className='mb-2 cursor-pointer dropdown-toggle d-flex'>
                <Avatar alt={user.firstName} className={{ objectFit: "cover" }} src={user.img}></Avatar>
              </div>
              <Menu id='simple-menu' anchorEl={menu} keepMounted open={Boolean(menu)} onClose={() => setMenu(null)} onClick={() => setMenu(null)}>
                <MenuItem>
                  <Link to='/account'>
                    <AccountCircleOutlined className='mr-2' /> My account
                  </Link>
                </MenuItem>
                {/*<MenuItem>
                <Settings/>
                  <Link to='/settings'>Settings</Link>
                </MenuItem>*/}
                <MenuItem onClick={logOut}>
                  <ExitToAppOutlined className='mr-2' />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className='d-flex'>
              <Button variant='outline-dark' className='ml-1 py-md-2 px-md-3 p-sm-1 rounded-0 text-nowrap' onClick={() => setGetStarted(SIGN_UP)}>
                Sign Up
              </Button>

              <Button variant='outline-dark' className='ml-1 ml-md-3 py-md-2 px-md-3 p-sm-1 rounded-0 text-nowrap' onClick={() => setGetStarted(SIGN_IN)}>
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
