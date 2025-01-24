// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

type Props = {
    open: boolean
    setOpen: (val: boolean) => void
    onConfirm?: () => void // Add onConfirm prop

  }

const DialogAlert = (props: Props) => {
  // ** State
  const { open, setOpen, onConfirm }= props 


  const handleClose = () => setOpen(false)
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); // Call the onConfirm function if it is provided
    }
    handleClose();
  }

  return (
    <Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
         <DialogTitle id='alert-dialog-title'>Confirm Tenant Addition</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to add this new tenant?
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DialogAlert
