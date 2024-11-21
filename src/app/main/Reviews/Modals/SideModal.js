
import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, FormLabel, Grid, RadioGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import { useTab } from '@mui/base';
import { autoGenerateReviews } from 'app/store/fuse/reviewSlice';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { useTheme } from '@mui/material/styles'
import LoadingButton from '@mui/lab/LoadingButton'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    height: '100vh',
    maxHeight: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    right: 0,
    top: 0,
    borderRadius: 0,
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    overflow: 'auto', // Allow content to scroll if necessary
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiBackdrop-root': {
    backgroundColor: 'transparent',
    backdropFilter: 'none',
  },
}));

const SideModal = ({
  clickedProfile,
  setGeneratedReview,
  generatedReview,
  setReplyText,
  setOne
}) => {

  const theme = useTheme()

  const [clickedItem, setClickedItem] = useState()
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState()

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (generatedReview?.length > 1) {
      setOpen(true);
    }
  }, [generatedReview]);

  const handleAutogenerateReply = async (id, value, styleValue, GR_name, rating) => { // Update function signature

    if (open) {
      try {
        const response = await dispatch(autoGenerateReviews({ id, value, styleValue, GR_name, rating }));
        response?.meta?.requestStatus == "fulfilled" ? setGeneratedReview([...generatedReview, response.payload]) : ''
      } catch (err) {
        console.log(err);
      }
    }
  };

  // const generatedReview = [
  //   "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It ha",
  //   "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It ha",
  //   "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It ha",
  //   "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It ha",
  // ]


  return (
    <div className='sideModal'>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div className="flex flex-col sm:flex-row flex-1 w-full justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32" >
          <div className="flex flex-col sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography
                className="flex items-center sm:mb-12"
                role="button"
                color="inherit"
                onClick={() => {
                  setOpen(false)
                }}
              >
                <FuseSvgIcon size={20}>
                  {theme.direction === 'ltr'
                    ? 'heroicons-outline:arrow-sm-left'
                    : 'heroicons-outline:arrow-sm-right'}
                </FuseSvgIcon>
                <span className="flex mx-4 font-medium">
                </span>
              </Typography>
            </motion.div>

            <div className="flex items-center max-w-full">
              <motion.div
                className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
                initial={{ x: -20 }}
                animate={{ x: 0, transition: { delay: 0.3 } }}
              >
                <Typography className="text-16 sm:text-20 truncate font-semibold">
                  {name || 'Generated Reviews '}
                </Typography>
              </motion.div>
            </div>

            <motion.div
              className="flex "
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}

            >
              <Grid container sx={{ justifyContent: 'end', mt: 2 }}>
                <FormControl sx={{
                  width: '100%', mt: { xs: 1, sm: 1, md: 2, lg: 3 },
                }}>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <Grid sx={{ height: 400, overflowY: 'scroll', bgcolor: '' }}>
                      {Array.isArray(generatedReview) && generatedReview.map((data, index) => (
                        // zjd
                        <FormControlLabel
                          sx={{
                            bgcolor: '',
                            p: 2,
                            border: clickedItem == index ? '1px solid red' : '',
                            borderRadius: 2,
                            m: .7
                          }}
                          onChange={(e) => {
                            setClickedItem(index)
                            setSelectedItem(e.target.value)
                          }}
                          value={data} control={<Radio />} label={data} />

                      ))}
                    </Grid>

                  </RadioGroup>
                </FormControl>
                <Grid container sx={{ mt: 3, justifyContent: 'end' }}>
                  {
                    selectedItem ?

                      <Button
                        className="hover:bg-red"
                        sx={{
                          borderRadius: "8px",
                          bgcolor: "#F30002",
                          color: " #FFFFFF",
                          fontSize: "16px",
                          padding: "12px 20px 12px 20px", mr: 2,
                          "&:hover": {
                            bgcolor: "#FF4142",
                            boxShadow: "0 1px 3px 1px rgba(0,0,0,0.15),0 1px 2px 0px rgba(0,0,0,0.3)",
                          },
                          "&:focused": {
                            bgcolor: "#FF3739"
                          }
                        }}
                        onClick={() => {
                          console.log("=======selectedItem========", selectedItem)
                          setReplyText(selectedItem)
                          setOpen(false)
                          setGeneratedReview([])
                          setOne(true)
                        }}
                      >
                        Submit
                      </Button> : ''
                  }

                  <Button
                    className="hover:bg-red"
                    sx={{
                      borderRadius: "8px",
                      bgcolor: "#F30002",
                      color: " #FFFFFF",
                      fontSize: "16px",
                      padding: "12px 20px 12px 20px",
                      "&:hover": {
                        bgcolor: "#FF4142",
                        boxShadow: "0 1px 3px 1px rgba(0,0,0,0.15),0 1px 2px 0px rgba(0,0,0,0.3)",
                      },
                      "&:focused": {
                        bgcolor: "#FF3739"
                      }
                    }}
                    onClick={

                      () => handleAutogenerateReply(
                        clickedProfile.id,
                        clickedProfile.coment,
                        clickedProfile.styleValue ? clickedProfile.styleValue : 'simpler',
                        "one",
                        clickedProfile.rating
                      )

                    }
                  >
                    Regenerate
                  </Button>
                </Grid>

              </Grid>
            </motion.div>
          </div>

        </div>

      </BootstrapDialog>
    </div >
  );
};

export default SideModal;