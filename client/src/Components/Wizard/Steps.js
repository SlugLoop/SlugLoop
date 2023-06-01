import {DirectionsBus, Menu} from '@mui/icons-material'
import {Stack, Typography, IconButton, useTheme} from '@mui/material'
import {motion} from 'framer-motion'

const commonStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 2,
  m: 1,
  color: 'text.primary',
}

const MotionStack = motion(Stack)

// Step components
const Step1 = () => {
  const theme = useTheme()
  return (
    <MotionStack
      sx={commonStyles}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      key="step1"
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        marginLeft={1}
      >
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <DirectionsBus fontSize="medium" />
        </IconButton>

        <Typography variant="h6">Bus Routes</Typography>
      </Stack>

      <Typography>
        This button opens the bus selection menu where you can select which
        route(s) to display
      </Typography>
    </MotionStack>
  )
}

const Step2 = () => {
  const theme = useTheme()
  return (
    <MotionStack
      sx={commonStyles}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      key="step12"
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        marginLeft={1}
      >
        <IconButton
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Menu fontSize="medium" />
        </IconButton>
        <Typography variant="h6">Menu & Settings</Typography>
      </Stack>

      <Typography>
        This button opens the menu where you can change the map settings as well
        as navigate to different pages in the app
      </Typography>
    </MotionStack>
  )
}

const Step3 = () => {
  return (
    <MotionStack
      sx={commonStyles}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      key="step3"
    >
      <Typography variant="h6">Loop Buses</Typography>
      <Typography>
        Loop: This is the standard loop bus that runs around campus in both
        difections. It runs from base to base and hits every stop, but only runs
        on weekdays.
      </Typography>
      <Typography>
        Upper Campus: This is the loop bus that runs around upper campus. It
        departs from the West and East remote parking lots and runs both
        directions. It only runs on weekdays.
      </Typography>
    </MotionStack>
  )
}

const Step4 = () => {
  return (
    <MotionStack
      sx={commonStyles}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      key="step4"
    >
      <Typography variant="h6">Loop Buses Cont.</Typography>
      <Typography>
        Loop Out of Service At Barn Theater: This runs the same route as the
        loop, but stops at the base of campus at the Barn Theater.
      </Typography>
      <Typography>
        Out of Service: This is a bus that is not in service.
      </Typography>
      <Typography>
        Special: This is the bus that goes down to the costal campus.
      </Typography>
    </MotionStack>
  )
}

const Step5 = () => {
  return (
    <MotionStack
      sx={commonStyles}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      key="step5"
    >
      <Typography variant="h6">Metro Buses</Typography>
      <Typography>
        Odd Buses such as the 15 and 19 run counter clockwise around campus.
      </Typography>
      <Typography>
        Even Buses such as the 10, 18, and 20 run clockwise around campus.
      </Typography>
    </MotionStack>
  )
}

const Step6 = () => {
  return (
    <MotionStack
      sx={commonStyles}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      key="step6"
    >
      <Typography variant="h6">Map Settings</Typography>
      <Typography>
        This button opens the menu where you can change the map settings as well
        as navigate to different pages in the app.
      </Typography>
      <Typography>
        Hide/Show Time: This button toggles the time that the bus was last
        pinged.
      </Typography>
      <Typography>
        Dark Mode: This button toggles the map between light and dark mode.
      </Typography>
      <Typography>
        Show Past/Recent Buses: This button toggles whether or not to show buses
        that haven't updated in the last 30 minutes.
      </Typography>
    </MotionStack>
  )
}

export {Step1, Step2, Step3, Step4, Step5, Step6}
