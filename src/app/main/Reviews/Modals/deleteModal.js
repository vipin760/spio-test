import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch } from 'react-redux';
import { deleteComment } from 'app/store/fuse/reviewSlice';
import { DialogTitle } from '@mui/material';
import { bgcolor, fontSize } from '@mui/system';

export default function ReviewDeleteModal({ open, handleClose, deleteReviewId }) {

    const { review_id, _id } = deleteReviewId;
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await dispatch(deleteComment({ review_id, _id }));
        } catch (error) {
        }
        handleClose();
    }

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

                    }}
                >
                    {"Delete Reply"}
                </DialogTitle>
                <DialogContent sx={{ padding: "0" }}>
                    <DialogContentText id="alert-dialog-description" style={{ color: 'inherit', fontSize: '16px' }}>
                        Are you sure want to delete this reply?
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{
                        gap: '24px',
                        padding: '24px 0 0 0'
                    }}
                >
                    <Button onClick={handleClose}
                        sx={{
                            border: "1px solid #000",
                            borderRadius: "8px",
                            color: " #000",
                            fontSize: "16px",
                            cursor: "pointer",
                            padding: "12px 20px 12px 20px",
                            "&:hover": {
                                bgcolor: "red",
                                color: " #FFFFFF",
                                border:'1px solid #FFFFFF'
                            }
                        }}
                    >Cancel</Button>

                    <Button onClick={() => handleDelete()}
                        autoFocus
                        style={{
                            borderRadius: "8px",
                            cursor: "pointer",
                            background: "#F30002",
                            color: " #FFFFFF",
                            fontSize: "16px",
                            padding: "12px 20px 12px 20px",
                            marginLeft: '0'
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
