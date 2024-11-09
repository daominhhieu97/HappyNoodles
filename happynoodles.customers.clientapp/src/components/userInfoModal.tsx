import React from 'react';
import { Typography, Button } from '@mui/material';
import CommonModal from './commonModal.tsx';
import EditableTextField from './editableTextField.tsx';
import Logout from './logout.tsx';

interface UserInfoModalProps {
  open: boolean;
  handleClose: () => void;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  address: string;
  setPhoneNumber: (value: string) => void;
  setAddress: (value: string) => void;
  handleSave: () => void;
  inactiveCustomer: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  open,
  handleClose,
  userName,
  userEmail,
  phoneNumber,
  address,
  setPhoneNumber,
  setAddress,
  handleSave,
  inactiveCustomer
}) => (
  <CommonModal open={open} handleClose={handleClose} title="USER INFORMATION">
    <Typography sx={{ mt: 2 }}>Username: {userName}</Typography>
    <Typography sx={{ mt: 2 }}>Email: {userEmail}</Typography>
    <EditableTextField
      label="Phone Number"
      defaultValue={phoneNumber}
      onChange={setPhoneNumber}
    />
    <EditableTextField
      label="Address"
      defaultValue={address}
      onChange={setAddress}
    />
    <Button sx={{ mt: 2 }} onClick={handleSave} variant="contained" color="primary">Save</Button>
    <Button sx={{ mt: 2, ml: 2 }} onClick={inactiveCustomer} variant="contained" color="error">Inactive</Button>
    <Logout />
  </CommonModal>
);

export default UserInfoModal;