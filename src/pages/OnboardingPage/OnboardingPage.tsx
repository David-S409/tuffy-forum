import { useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import image1 from '../../images/test-image.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const OnboardingPage = () => {

  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      image: image1,
      alt: 'Description of image 1',
    },
    {
      image: image1,
      alt: 'Description of image 2',
    },
    {
      image: image1,
      alt: 'Description of image 3',
    },
  ];

  const handlePreviousSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  const isPreviousDisabled = slideIndex === 0;
  const isNextDisabled = slideIndex === slides.length - 1;

  const handleFinishedOnboarding = async () => {
    const updateOnboardUrl = 'http://localhost:8080/api/v1/user/onboard';
    try {
      const response = await axios.get(updateOnboardUrl, { withCredentials: true });

      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating isOnboard value:', error);
    }
  };


  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" align="center"
          sx={{
            backgroundImage: 'linear-gradient(to right, #00b09b, #96c93d)',
            color: 'primary.main',
            fontStyle: 'italic',
            fontWeight: 'bold',
            display: 'inline-block',
            padding: '0 16px',
            borderRadius: '20px',
            textShadow: '2px 2px 5px orange'
          }}>
          Thanks for joining the Tuffy Forum!!
        </Typography>
      </Box>
      <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0)', borderRadius: '20px', overflow: 'hidden' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ position: 'relative', minHeight: '400px' }}>
              <img
                src={slides[slideIndex].image}
                alt={slides[slideIndex].alt}
                style={{ width: '100', height: '100%', objectFit: 'cover', maxWidth: '600px' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '4px',
                  transform: 'translateY(-50%)',
                  zIndex: '1',
                }}
              >
                <Button
                  onClick={handlePreviousSlide}
                  startIcon={<ChevronLeft />}
                  disabled={isPreviousDisabled}
                  sx={{
                    backgroundImage: 'linear-gradient(to right, #00b09b, #96c93d)',
                    color: 'black',
                    '&:hover': { backgroundImage: 'linear-gradient(to left, #00b09b, #96c93d)' },
                    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Prev
                </Button>
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: '4px',
                  transform: 'translateY(-50%)',
                  zIndex: '1',
                }}
              >
                <Button
                  onClick={handleNextSlide}
                  endIcon={<ChevronRight />}
                  disabled={isNextDisabled}
                  sx={{
                    backgroundImage: 'linear-gradient(to right, #00b09b, #96c93d)',
                    color: 'black',
                    '&:hover': { backgroundImage: 'linear-gradient(to left, #00b09b, #96c93d)' },
                    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Button
        variant="contained"

        onClick={() => {
          if (slideIndex === slides.length - 1) {
            handleFinishedOnboarding();
          }
        }}
        sx={{
          mt: 2,
          display: 'inline-block',
          fontSize: '1.25rem',
          backgroundImage: 'primary',
          color: 'white',
          fontWeight: 'bold',
          '&:hover': { backgroundImage: 'primary', color: 'gold', textDecoration: 'underline', fontSize: '1.25rem' },
          boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          pointerEvents: slideIndex !== slides.length - 1 ? 'none' : 'auto',
          mx: 'auto',
        }}
      >
        {slideIndex !== slides.length - 1
          ? `${slideIndex + 1}/${slides.length}`
          : 'Finished Onboarding!'}
      </Button>
    </Box>
  );
};

export default OnboardingPage;

