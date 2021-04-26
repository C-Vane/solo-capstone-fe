import { Avatar, IconButton, Paper, Button } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { BackDrop, ContainerAdmitModal, Logo } from "../../Assets/StyledComponents";

function AdmitUserModal({ close, admitUser, declineUser, waitingList }) {
  return (
    <BackDrop>
      <ContainerAdmitModal>
        <Paper className='w-xs-100 m-auto text-center' elevation={3}>
          <div className='p-1'>
            <IconButton aria-label='close' className='float-right' size='small' onClick={close}>
              <CloseIcon />
            </IconButton>
            <div className='mb-3 w-100 d-flex flex-column'>
              <h5 className='mb-2'>Waiting List</h5>
              {waitingList.map((user, index) => (
                <div key={index} className='d-flex m-auto justify-content-around'>
                  <div className='d-flex'>
                    <Avatar alt={user.firstname} src={user.img}></Avatar>
                    <span className='ml-3 mt-2 '>
                      {user.firstname} {user.lastname}
                    </span>
                  </div>
                  <div>
                    <Button className='mr-3 ml-3' size='small' onClick={() => admitUser(user)}>
                      Accept
                    </Button>
                    <Button color='secondary' size='small' onClick={() => declineUser(user)}>
                      Decline
                    </Button>
                  </div>
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
