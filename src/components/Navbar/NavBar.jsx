import { Avatar, Menu, MenuItem, Paper } from "@material-ui/core";
import { PagesSharp } from "@material-ui/icons";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { LogIn } from "../LogIn/LogIn";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: "SET_USER", payload: user }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) => dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});

export const NavBar = (props) => {
  const { user, location } = props;
  const [menu, setMenu] = useState(null);
  const [login, setLogin] = useState(false);
  const logOut = () => {};
  console.log(props);
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

            {user && (
              <Link to='/startCall' className={location.pathname === "/startCall" ? "active" : ""}>
                <NavItem>Video Call</NavItem>
              </Link>
            )}
          </div>
          {user ? (
            <div>
              <Avatar on alt={user} src={user} onClick={(e) => setMenu(e.target)}></Avatar>
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
              <Link to='/registration'>
                <Button variant='outlined'>Sign Up</Button>
              </Link>

              <Button variant='outlined' onClick={() => setLogin(true)}>
                Log In
              </Button>
            </div>
          )}
        </Nav>
      </Container>
      {login && <LogIn close={() => setLogin(false)} />}
    </Bar>
  );
};

const Bar = styled.header`
  min-height: 5vh;
  width: 100vw;
  position: fixed;
  z-index: 999;
  background: #fff;
`;

const Nav = styled.nav`
  display: flex;
  padding: 2vmin 2vmin 0 2vmin;
  justify-content: space-between;
  width: 100%;

  div {
    align-self: flex-end;
    display: flex;

    a {
      color: black;
      text-decoration: none;
      float: left;
      align-self: flex-end;
      border-bottom: 2px solid transparent;
      height: 100%;
      &:hover {
        border-bottom-color: rgb(38, 38, 38, 0.1);
        background: rgb(38, 38, 38, 0.05);
      }
      &.active {
        border-bottom-color: #262626;
        font-weight: 600;
        color: #262626;
      }
    }
  }
`;

const Logo = styled.div`
  width: 10vmin;
  height: 10vmin;
  max-height: 80px;
  max-width: 80px;
  min-height: 40px;
  min-width: 40px;
  background-color: #bdbdbd;
  border-radius: 5px;
  margin-right: 10px;
`;

const NavItem = styled.div`
  text: black;
  text-decoration: none;
  margin: 3px 5vmin;
`;

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
