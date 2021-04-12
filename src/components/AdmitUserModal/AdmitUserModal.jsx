import { Avatar, IconButton, Paper } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { BackDrop, ContainerAdmitModal, Logo } from "../../Assets/StyledComponents";
import { Button } from "react-bootstrap";

function AdmitUserModal({ close, admitUser, declineUser, waitingList }) {
  return (
    <BackDrop>
      <ContainerAdmitModal>
        <Paper className='w-xs-100 m-auto text-center' elevation={3}>
          <IconButton aria-label='close' className='float-right' onClick={close}>
            <CloseIcon />
          </IconButton>
          <div className=' ps-1'>
            <div className='mb-1 p-md-3 py-3 d-flex flex-column'>
              <h5 className='mb-1'>Users Requesting Admition</h5>

              {waitingList.map((user, index) => (
                <div key={index} className='d-flex m-auto'>
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
          </div>
        </Paper>
      </ContainerAdmitModal>
    </BackDrop>
  );
}

export default AdmitUserModal;
