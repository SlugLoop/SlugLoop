import React, {useEffect, useState, useRef, useContext} from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import {Box, Typography, useTheme} from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LaptopIcon from '@mui/icons-material/Laptop'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AppContext from '../../appContext'
import {motion, AnimatePresence} from 'framer-motion'
import {useViewportWidth} from '../../App'

// Hook for animation check
function useIntersectionObserver(
  elementRef,
  {threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false},
) {
  const [entry, setEntry] = useState()

  const frozen = entry?.isIntersecting && freezeOnceVisible

  const updateEntry = ([entry]) => {
    setEntry(entry)
  }

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = {threshold, root, rootMargin}
    const observer = new IntersectionObserver(updateEntry, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin, frozen])

  return entry
}

function TimelineElement({date, setBackgroundImage, events}) {
  const triggerRef = useRef(null)
  const entry = useIntersectionObserver(triggerRef, {threshold: 0.1})
  const theme = useTheme()

  useEffect(() => {
    if (entry?.isIntersecting) {
      setBackgroundImage(events[date].url)
    }
  }, [entry, date, setBackgroundImage, events])

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      date={date}
      contentStyle={{
        marginBottom: '50vh',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[0],
      }}
      contentArrowStyle={{
        borderRight: `7px solid  ${theme.palette.background.paper}`,
      }}
      iconStyle={{
        background: theme.palette.primary.main,
        color: theme.palette.secondary.main,
      }}
      icon={events[date].icon}
    >
      <h3>{events[date].name}</h3>
      <p>{events[date].description}</p>
      <Box
        ref={triggerRef}
        sx={{
          position: 'relative',
          top: '10vh',
        }}
      />
    </VerticalTimelineElement>
  )
}

export default function MyTimeline() {
  const viewportWidth = useViewportWidth()

  const events = {
    'January 2023': {
      url:
        viewportWidth < 600
          ? 'background/planning.png'
          : 'background/planningDesktop.png',
      icon: <LightbulbIcon />,
      name: 'Planning',
      description:
        'Our journey began serendipitously when we stumbled upon a Reddit post. A fellow student expressed frustration about the unpredictable loop bus schedules. Among the sea of comments, one mentioned a discontinued bus tracker. A spark ignited within us. We saw an opportunity to contribute and immediately reached out to our professors. We were at the start of an incredible journey.',
    },
    'February 2023': {
      url:
        viewportWidth < 600
          ? 'background/hackathon.png'
          : 'background/hackathonDesktop.png',
      icon: <LaptopIcon />,
      name: 'Hackathon',
      description:
        'Cruzhacks was on the horizon, and we were searching for a challenge to tackle. Then, the idea of the loop bus tracker surfaced. We seized the opportunity, dedicating our energies to bring this concept to life during the hackathon. The weekend was a whirlwind of coding and collaboration, ultimately earning us the "Best Use of Github" prize. Our idea was starting to become a reality.',
    },
    'March 2023': {
      url:
        viewportWidth < 600
          ? 'background/competition.png'
          : 'background/competitionDesktop.png',
      icon: <EmojiEventsIcon />,
      name: 'Competition',
      description:
        'Bolstered by our success and the positive response from our community, we decided to take a leap of faith. We released a public beta of our app and entered it in the Google Developer Student Challenge. We were putting our creation out into the world, filled with anticipation.',
    },
    'April 2023': {
      url:
        viewportWidth < 600
          ? 'background/data.png'
          : 'background/dataDesktop.png',
      icon: <AutoGraphIcon />,
      name: 'Data Analysis',
      description:
        'April was a month of refinement. With our app in the hands of users, we received invaluable feedback. This was our opportunity to listen, learn, and iterate. We worked tirelessly to improve, resolving bugs and enhancing functionality.',
    },
    'May 2023': {
      url: 'background/coding.png',
      icon: <TrendingUpIcon />,
      name: 'Coding',
      description:
        'Our efforts did not go unnoticed. We were thrilled to learn we were among the top 100 teams chosen as finalists for the Google Developer Student Challenge, including just three from the United States! The recognition spurred us on to further refine our app, collaborate with school faculty, and work with transport officials to update aging infrastructure. We knew we were making a difference.',
    },
  }

  const [backgroundImage, setBackgroundImage] = useState(
    events['January 2023'].url,
  )
  const theme = useTheme()

  const {darkMode} = useContext(AppContext)

  return (
    <div>
      <AnimatePresence>
        <motion.section
          key={backgroundImage}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundImage: 'url(' + backgroundImage + ')',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: darkMode ? 'brightness(0.5)' : 'brightness(1)',
            overflow: 'hidden',
            zIndex: -1,
          }}
        />
      </AnimatePresence>
      <Typography
        variant="h3"
        marginTop="5vh"
        align="center"
        color={darkMode ? 'white' : 'black'}
      >
        Timeline
      </Typography>
      <VerticalTimeline lineColor={theme.palette.primary.main}>
        {Object.keys(events).map((date) => (
          <TimelineElement
            key={date}
            date={date}
            events={events}
            setBackgroundImage={setBackgroundImage}
          />
        ))}
      </VerticalTimeline>
    </div>
  )
}
