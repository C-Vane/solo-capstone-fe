import { Avatar, Menu, MenuItem, Paper } from "@material-ui/core";
import { AccountCircleOutlined, ExitToAppOutlined, Home, VideocamOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Bar, Nav, Logo, NavItem, SIGN_IN, SIGN_UP } from "../../Assets/StyledComponents";
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
            <Logo className='h-100 w-100' />
          </Link>
          {user._id && (
            <div>
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
            <div>
              <Avatar alt={user.firstName} className={{ objectFit: "cover" }} src={user.img} onClick={(e) => setMenu(e.target)} className='mb-2 '></Avatar>
              <Menu id='simple-menu' anchorEl={menu} keepMounted open={Boolean(menu)} onClose={() => setMenu(null)} onClick={() => setMenu(null)}>
                <MenuItem>
                  <AccountCircleOutlined className='mr-2' />
                  <Link to='/account'>My account</Link>
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
            <div>
              <Button variant='outline-dark' className='ml-3 rounded-0' onClick={() => setGetStarted(SIGN_UP)}>
                Sign Up
              </Button>

              <Button variant='outline-dark' className='ml-3  rounded-0' onClick={() => setGetStarted(SIGN_IN)}>
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
