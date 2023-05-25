import React, {useEffect, useState, useRef} from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import {Box, Typography} from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LaptopIcon from '@mui/icons-material/Laptop'
import AutoGraphIcon from '@mui/icons-material/AutoGraph'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const events = {
  'January 2023': {
    url: 'background/planning.png',
    icon: <LightbulbIcon />,
    name: 'Planning',
    description:
      'We are planning to make a bus tracking app for UCSC students based on a reddit post.',
  },
  'February 2023': {
    url: 'background/hackathon.png',
    icon: <LaptopIcon />,
    name: 'Hackathon',
    description:
      'We participated in a hackathon and developed the first prototype of our app.',
  },
  'March 2023': {
    url: 'background/data.png',
    icon: <AutoGraphIcon />,
    name: 'Data Analysis',
    description:
      'We collected and analyzed data to improve the efficiency of our bus tracking system.',
  },
  'April 2023': {
    url: 'background/competition.png',
    icon: <EmojiEventsIcon />,
    name: 'Competition',
    description:
      'We entered our app in a competition and received positive feedback.',
  },
  'May 2023': {
    url: 'background/coding.png',
    icon: <TrendingUpIcon />,
    name: 'Coding',
    description:
      'We spent this month coding and refining the app based on the feedback we received.',
  },
}

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

function TimelineElement({date, setBackgroundImage}) {
  const triggerRef = useRef(null)
  const entry = useIntersectionObserver(triggerRef, {threshold: 0.1})

  useEffect(() => {
    if (entry?.isIntersecting) {
      setBackgroundImage(events[date].url)
    }
  }, [entry, date, setBackgroundImage])

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      date={date}
      contentStyle={{
        marginBottom: '50vh',
      }}
      iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
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
  const [backgroundImage, setBackgroundImage] = useState(
    events['January 2023'].url,
  )

  return (
    <div>
      <Box
        component="section"
        width="100vw"
        height="100vh"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundImage: 'url(' + backgroundImage + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
          overflow: 'hidden',

          zIndex: -1,
        }}
      />
      <Typography variant="h3" marginTop="5vh" align="center" color="white">
        Timeline
      </Typography>
      <VerticalTimeline>
        {Object.keys(events).map((date) => (
          <TimelineElement
            key={date}
            date={date}
            setBackgroundImage={setBackgroundImage}
            contentStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
            iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
          />
        ))}
      </VerticalTimeline>
    </div>
  )
}
