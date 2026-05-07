import {Wizard, useWizard} from 'react-use-wizard'
import {Step1, Step2, Step3, Step4, Step5} from './Steps'
import {Button, Box, Grid, IconButton, useTheme} from '@mui/material'
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import {useViewportWidth} from '../../App'
import {AnimatePresence, motion} from 'framer-motion'

const MotionBox = motion(Box)

const WizardFooter = ({closeWizard, neverShowAgain}) => {
  const {isFirstStep, isLastStep, previousStep, nextStep} = useWizard()
  const theme = useTheme()

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <IconButton
          disabled={isFirstStep}
          onClick={previousStep}
          sx={{
            color: theme.palette.text.primary,

            '&.Mui-disabled': {
              color: theme.palette.text.primary + '80',
            },
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>
        {isLastStep ? (
          <IconButton
            onClick={closeWizard}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={nextStep}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        )}
      </Grid>
      <Grid item>
        <Button
          onClick={neverShowAgain}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          Never Show Again
        </Button>
      </Grid>
    </Grid>
  )
}

const MainWizard = ({closeWizard, neverShowAgain}) => {
  const viewportWidth = useViewportWidth()
  return (
    <MotionBox
      width={viewportWidth > 600 ? '50%' : '70%'}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{
        delay: 0.5,
        duration: 0.2,
      }}
      exit={{opacity: 0}}
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
        backgroundColor: 'background.default',
        borderRadius: 1,
        p: 2,
        boxShadow: 3,
      }}
    >
      <Wizard
        footer={
          <WizardFooter
            closeWizard={closeWizard}
            neverShowAgain={neverShowAgain}
          />
        }
        wrapper={<AnimatePresence initial={false} mode="wait" />}
      >
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <Step5 />
      </Wizard>
    </MotionBox>
  )
}

export default MainWizard
