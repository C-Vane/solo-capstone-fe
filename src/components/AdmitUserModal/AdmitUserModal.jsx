import { Avatar, IconButton, Paper } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { BackDrop, Container, Logo } from "../../Assets/Assets";
import { Button } from "react-bootstrap";

function AdmitUserModal({ close, admitUser, declineUser, waitingList }) {
  return (
    <BackDrop>
      <Container>
        <Paper className='w-xs-100 m-auto text-center' elevation={3}>
          <IconButton aria-label='close' className='float-right' onClick={close}>
            <CloseIcon />
          </IconButton>
          <div className='p-md-4 ps-1'>
            <Logo />
            <div className='mb-4 p-md-3 py-3'>
              <h3 className='mb-3'>Users Requestiong admition</h3>

              {waitingList.map((user, index) => (
                <div key={index} className='d-flex'>
                  <Avatar alt={user.firstname} src={user.img}></Avatar>
                  <span>
                    {user.firstname} {user.lastname}
                  </span>
                  <Button variant='outline-dark' className='mr-3 ml-3 rounded-0' onClick={() => admitUser(user)}>
                    ACCEPT
                  </Button>
                  <Button variant='dark' className='rounded-0' onClick={() => declineUser(user)}>
                    DECLINE
                  </Button>
                </div>
              ))}
            </div>
            <Button variant='outline-dark' className='m-auto w-md-50 w-75 mr-3 ml-3 rounded-0' onClick={close}>
              CLOSE
            </Button>
          </div>
        </Paper>
      </Container>
    </BackDrop>
  );
}

export default AdmitUserModal;
