import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function ModalComponent({ open, handleClose, info }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Notification</DialogTitle>
      <DialogContent>
        <p>{info}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalComponent;