export const externalLinks = {
  liveSite: 'https://slugloop.tech/',
  alternateSite: 'https://www.slugloop.com/',
  githubOrg: 'https://github.com/SlugLoop/',
  githubRepo: 'https://github.com/SlugLoop/SlugLoop',
  devpost: 'https://devpost.com/software/slugloop',
  demoVideo: 'https://www.youtube.com/watch?v=DlAGp-IjtJM',
  ucscNews: 'https://news.ucsc.edu/2023/07/slugloop-google-solution-challenge/',
  sentinel:
    'https://www.santacruzsentinel.com/2023/07/26/uc-santa-cruz-team-make-final-round-of-google-app-challenge/',
  santaCruzWorks:
    'https://www.santacruzworks.org/news/cruzhacks-team-in-the-top-10-google-solutions-challenge',
}

export const heroStats = [
  {value: 'Top 10', label: 'global Google Solution Challenge finalist'},
  {value: 'Only US', label: 'team in the 2023 global finalist group'},
  {value: '4 students', label: 'built the first working version at UCSC'},
  {value: '500+', label: 'commits across the open-source project'},
]

export const exhibitSections = [
  {
    eyebrow: 'Problem',
    title: 'A campus where timing the loop bus mattered.',
    body:
      'UCSC students were making daily tradeoffs around unpredictable loop shuttles, steep hills, full Metro buses, and late arrivals. SlugLoop started from that frustration and turned it into a visible system.',
    accent: 'Transit pressure',
  },
  {
    eyebrow: 'Hardware',
    title: 'The project reached below the web app.',
    body:
      'The team reprogrammed existing GPS-emitting hardware and worked with campus base stations so shuttle positions could move from physical buses into a real-time software pipeline.',
    accent: 'Real devices',
  },
  {
    eyebrow: 'Software',
    title: 'A student-built data pipeline became a live map.',
    body:
      'React rendered the map, Firestore carried real-time vehicle state, Express handled ingestion and Metro sync, and Google Maps gave riders a familiar view of campus movement.',
    accent: 'Full stack',
  },
  {
    eyebrow: 'Recognition',
    title: 'The work traveled beyond campus.',
    body:
      'SlugLoop was recognized by UCSC News, local press, Santa Cruz Works, Devpost, and the 2023 Google Solution Challenge as a student-built response to a real transportation problem.',
    accent: 'Public proof',
  },
]

export const architectureFlow = [
  {
    step: '01',
    title: 'GPS hardware',
    detail: 'Reprogrammed bus hardware emitted location pings from the campus fleet.',
  },
  {
    step: '02',
    title: 'Base stations',
    detail: 'Campus receivers forwarded raw data toward the SlugLoop backend.',
  },
  {
    step: '03',
    title: 'Express ingestion',
    detail: 'A Node/Express server validated pings, normalized data, and wrote Firestore documents.',
  },
  {
    step: '04',
    title: 'Firestore',
    detail: 'Collections for buses, Metro vehicles, and bus stop ETAs became the app data layer.',
  },
  {
    step: '05',
    title: 'React map',
    detail: 'The client read Firestore and rendered route-filtered vehicles and stops on Google Maps.',
  },
]

export const milestones = [
  {
    date: 'January 2023',
    title: 'The frustration became visible',
    description:
      'Student conversations around unreliable campus shuttle timing framed the problem SlugLoop would solve.',
    source: 'Community problem discovery',
  },
  {
    date: 'January 2023',
    title: 'CruzHacks formed the team',
    description:
      'Bill Zhang, Alex Liu, Annie Liu, and Nicholas Szwed formed the project team and began turning the idea into a working app.',
    source: 'CruzHacks / Devpost',
  },
  {
    date: 'February 2023',
    title: 'Hackathon prototype',
    description:
      'The team built the first version during CruzHacks and earned recognition for its use of GitHub.',
    source: 'Devpost',
  },
  {
    date: 'March-May 2023',
    title: 'Public beta and competition run',
    description:
      'SlugLoop was released as a public beta and submitted to the Google Developer Student Clubs Solution Challenge.',
    source: 'Project timeline',
  },
  {
    date: 'April 2023',
    title: 'Top 100 selection',
    description:
      'The project advanced into the Top 100 projects in the Google Solution Challenge.',
    source: 'Google Solution Challenge',
  },
  {
    date: 'July 2023',
    title: 'Top 10 global finalist',
    description:
      'SlugLoop became the only United States team selected as a Top 10 global finalist in the 2023 Google Solution Challenge.',
    source: 'UCSC News / Santa Cruz Sentinel',
  },
  {
    date: 'August 2023',
    title: 'Demo Day',
    description:
      'The team presented the project on the global finalist stage and shared a public product demo.',
    source: 'Google Demo Day',
  },
  {
    date: '2024',
    title: 'Open-source maintenance',
    description:
      'Development and dependency work continued after the original launch window, leaving the project as a durable public artifact.',
    source: 'GitHub repository history',
  },
  {
    date: 'Now',
    title: 'Museum mode',
    description:
      'The site becomes an archive, portfolio case study, and preserved map demo rather than a commuter-facing production service.',
    source: 'Current redesign',
  },
]

export const pressLinks = [
  {
    label: 'UCSC News',
    title: 'SlugLoop reaches the Google Solution Challenge global finals',
    href: externalLinks.ucscNews,
  },
  {
    label: 'Santa Cruz Sentinel',
    title: 'UCSC team makes final round of Google app challenge',
    href: externalLinks.sentinel,
  },
  {
    label: 'Santa Cruz Works',
    title: 'CruzHacks team in the Top 10 Google Solutions Challenge',
    href: externalLinks.santaCruzWorks,
  },
  {
    label: 'Devpost',
    title: 'Original hackathon project page',
    href: externalLinks.devpost,
  },
]

export const teamMembers = [
  {
    name: 'Bill Zhang',
    role: 'Product, full-stack development, and project leadership',
    img: '/about/bill.png',
    linkedin: 'https://www.linkedin.com/in/bill-zhang1/',
  },
  {
    name: 'Alex Liu',
    role: 'Backend, data pipeline, and frontend development',
    img: '/about/alex.jfif',
    linkedin: 'https://www.linkedin.com/in/alex-liu-8689a1171/',
  },
  {
    name: 'Annie Liu',
    role: 'Frontend, UI/UX, and product experience',
    img: '/about/annie.png',
    linkedin: 'https://www.linkedin.com/in/annie-liu-33679624b/',
  },
  {
    name: 'Nicholas Szwed',
    role: 'Backend, hardware, and embedded systems',
    img: '/about/nick.png',
    linkedin: 'https://www.linkedin.com/in/nicholas-szwed/',
  },
]

export const proofPoints = [
  'Built for a real campus mobility problem, not a classroom prompt.',
  'Integrated physical bus hardware, base stations, backend services, and a web client.',
  'Shipped an open-source PWA with Google Maps and Firestore-backed real-time data.',
  'Coordinated with campus staff and local transit context while staying student-led.',
  'Earned public recognition from UCSC, local press, and Google Solution Challenge judges.',
]

export const resourceLinks = [
  {label: 'Open the preserved map', href: '/map', internal: true},
  {label: 'GitHub repository', href: externalLinks.githubRepo},
  {label: 'GitHub organization', href: externalLinks.githubOrg},
  {label: 'Watch demo video', href: externalLinks.demoVideo},
  {label: 'Read Devpost', href: externalLinks.devpost},
  {label: 'Original SlugLoop site', href: externalLinks.liveSite},
  {label: 'Alternate domain', href: externalLinks.alternateSite},
]
