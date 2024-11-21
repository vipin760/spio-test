import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle } from '@mui/material';

export default function ReviewAlertModal({ open, handleClose, handleFunction }) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiPaper-root.MuiDialog-paper": {
                        padding: '24px',
                        width: '510px'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title"
                    sx={{
                        "&.MuiTypography-root": {
                            fontSize: '16px !important',
                            padding: '0 0 8px 0'
                        },

                    }}>
                    {"Discard Unsend message"}
                </DialogTitle>
                <DialogContent sx={{ padding: "0" }}>
                    <DialogContentText id="alert-dialog-description" style={{ color: 'inherit', fontSize: '16px' }}>
                        Your message, will not be send if you reply to another message.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ gap: '24px', padding: '24px 0 0 0' }}>
                    <Button onClick={handleClose}
                        style={{
                            border: "1px solid #000",
                            borderRadius: "8px",
                            color: " #000",
                            fontSize: "16px",
                            cursor: "pointer",
                            padding: "12px 20px 12px 20px",
                            "&:hover": {
                                bgcolor: "#E1E1E1",
                            },
                            "&:foscused":{
                                bgcolor: "#F4F4F4",
                            }
                        }}
                    >Cancel</Button>
                    <Button onClick={handleFunction}
                        autoFocus
                        sx={{
                            borderRadius: "8px",
                            cursor: "pointer",
                            bgcolor: "#F30002",
                            color: " #FFFFFF",
                            fontSize: "16px",
                            padding: "12px 20px 12px 20px",
                            marginLeft: '0',
                            "&:hover": {
                                bgcolor: "#FF4142",
                                boxShadow: "0 1px 3px 1px rgba(0,0,0,0.15),0 1px 2px 0px rgba(0,0,0,0.3)",
                            },
                            "&:focused":{
                                bgcolor: "#FF3739"
                            }
                        }}
                    >
                        Discard
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}