import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CheckCircleOutline } from '@mui/icons-material'; // Importing success icon
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { navbarOpen } from 'app/store/fuse/navbarSlice';
import { CircularProgress } from '@mui/material'; 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    textAlign: 'center', // Centering content
};

export const SuccessPopUp = ({ message, open }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function redirect() {
        navigate('/dash');
        dispatch(navbarOpen());
    }

    if (message) {
        setTimeout(function () {
            redirect();
        }, 3000);
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <CheckCircleOutline 
                    sx={{ fontSize: 60, color: 'green', mb: 2 }} // Success icon styling
                />
                <Typography 
                    id="modal-modal-title" 
                    variant="h6" 
                    component="h2" 
                    sx={{ fontWeight: 'bold' }} // Text styling
                >
                    {message ? message : 'It may take a few minutes'}
                </Typography>
                <Typography 
                    variant="body2" 
                    sx={{ mt: 1, color: 'text.secondary' }} // Optional description text
                >
                    You have successfully integrated Google reviews.
                </Typography>
            </Box>
        </Modal>
    )
}

export default SuccessPopUp;
