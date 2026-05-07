'use client'

export const externalLinks = {
  liveSite: 'https://slugloop.tech/',
  alternateSite: 'https://www.slugloop.com/',
  githubOrg: 'https://github.com/SlugLoop/',
  githubRepo: 'https://github.com/SlugLoop/SlugLoop',
  devpost: 'https://devpost.com/software/slugloop',
  top100DemoVideo: 'https://youtu.be/fEAl8MajeOs',
  top10DemoVideo: 'https://youtu.be/DlAGp-IjtJM',
  demoVideo: 'https://youtu.be/DlAGp-IjtJM',
  ucscNews: 'https://news.ucsc.edu/2023/07/slugloop-google-solution-challenge/',
  sentinel:
    'https://www.santacruzsentinel.com/2023/07/26/uc-santa-cruz-team-make-final-round-of-google-app-challenge/',
  santaCruzWorks:
    'https://www.santacruzworks.org/news/cruzhacks-team-in-the-top-10-google-solutions-challenge',
}

export const heroStats = [
  {value: 'Top 10', label: 'global Google Solution Challenge finalist'},
  {value: 'First US', label: 'team in the global Top 10 in three years'},
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
    title: 'Archive showcase',
    description:
      'The site becomes an archive, portfolio case study, and preserved map demo rather than a commuter-facing production service.',
    source: 'Current redesign',
  },
]

/**
 * Rich journey entries used by /journey. Each entry can carry a photo,
 * pull-quote, stamp, and optional embedded video. Photos reference assets in
 * client/public/background/ and client/public/about/.
 */
export const journeyEntries = [
  {
    id: 'reddit-thread',
    date: 'Jan 2023',
    handDate: 'jan \u201823',
    chapter: 'Chapter 01',
    title: 'A Reddit thread, half a complaint, half a problem statement.',
    body:
      'Students were stuck on the hill. The loop bus would sometimes show. Sometimes it wouldn\u2019t. Threads on r/UCSC carried the same frustration: nobody trusted the schedule, nobody knew where the buses actually were. That mood became the spec.',
    quote: 'where is the loop?? i\u2019ve been at the bus stop for 25 minutes',
    quoteAttribution: 'paraphrase \u2014 r/UCSC, jan 2023',
    side: 'left',
  },
  {
    id: 'cruzhacks-form',
    date: 'Jan 2023',
    handDate: 'cruzhacks weekend',
    chapter: 'Chapter 02',
    title: 'CruzHacks: four engineers, one weekend, one team.',
    body:
      'Bill, Alex, Annie, and Nick met up at CruzHacks and decided to attack the bus problem. Roles fell out fast: product and full\u2011stack lead, backend and data pipeline, frontend and UX, hardware and embedded. The team formed in maybe an hour. The repo went up shortly after.',
    photo: '/background/hackathon.png',
    photoAlt: 'CruzHacks team coding on laptops at the hackathon',
    photoCaption: 'CruzHacks \u2014 hour zero',
    stamp: 'team formed',
    stampTone: 'ink',
    side: 'right',
  },
  {
    id: 'first-prototype',
    date: 'Jan-Feb 2023',
    handDate: '36 hrs of build',
    chapter: 'Chapter 03',
    title: 'A prototype, taped together, but actually working.',
    body:
      'In a day and a half we wired Express to Firestore, taught the React client to read live vehicle docs, mocked the GPS pings while the real hardware was still pending, and stuck a Google Map underneath. The hackathon judges gave the project a GitHub recognition. The repo never really stopped after that.',
    photo: '/background/coding.png',
    photoAlt: 'Late-night coding at the hackathon',
    photoCaption: 'late night, library couch',
    secondaryPhoto: '/background/planning.png',
    secondaryPhotoAlt: 'Whiteboard planning session',
    secondaryPhotoCaption: 'sticky-note architecture',
    quote: 'we built the whole stack before the snacks ran out',
    quoteAttribution: 'team note, post-CruzHacks',
    stamp: 'shipped at 4 am',
    stampTone: 'ink',
    side: 'left',
  },
  {
    id: 'hardware-access',
    date: 'Spring 2023',
    handDate: 'spring qtr',
    chapter: 'Chapter 04',
    title: 'Permission to touch the hardware that was already on the buses.',
    body:
      'UCSC had GPS\u2011emitting devices on the loop fleet from a project nearly a decade earlier. Most were dormant. After conversations with campus staff and a Baskin Engineering professor, we got the green light to reprogram the units and the basestations on top of campus buildings. The signal stopped being theoretical.',
    photo: '/background/staircase.png',
    photoAlt: 'UCSC campus stairs',
    photoCaption: 'climbing to a basestation',
    margin: 'campus said yes \u2192 the network turned on',
    side: 'right',
  },
  {
    id: 'public-beta',
    date: 'Mar-May 2023',
    handDate: 'beta era',
    chapter: 'Chapter 05',
    title: 'A real beta, with real people standing at real stops.',
    body:
      'Slugloop.tech went public. We posted in r/UCSC. Friends checked it before walking down to Bay Tree. The PWA install banner stopped feeling theoretical and started feeling like a tool people pulled their phones out for in the rain.',
    photo: '/background/waitingBus.png',
    photoAlt: 'Students waiting for a bus on campus',
    photoCaption: 'first real users \u2192',
    quote: 'first time the bus actually showed up when the app said it would.',
    quoteAttribution: 'beta tester, may 2023',
    stamp: 'beta live',
    stampTone: 'ocean',
    side: 'left',
  },
  {
    id: 'top-100',
    date: 'Apr 2023',
    handDate: 'top 100',
    chapter: 'Chapter 06',
    title: 'Google Solution Challenge picks SlugLoop into the Top 100.',
    body:
      'The project was submitted to Google\u2019s Developer Student Clubs Solution Challenge in spring. A few weeks later: an email. Top 100 worldwide. We recorded a tighter walkthrough demo for the next round of judging.',
    video: 'https://www.youtube.com/embed/fEAl8MajeOs',
    videoLabel: 'Top 100 demo \u2014 GDSC submission',
    stamp: 'top 100',
    stampTone: 'red',
    side: 'right',
  },
  {
    id: 'sentinel',
    date: 'Jul 26, 2023',
    handDate: 'press starts',
    chapter: 'Chapter 07',
    title: 'Local press picks up the story.',
    body:
      'Santa Cruz Sentinel ran a piece on the team making the final round of the Google app challenge. It was the first piece of coverage from outside the university \u2014 the campus tool reading like a regional story.',
    clipping: {
      source: 'Santa Cruz Sentinel',
      date: 'Jul 26, 2023',
      headline:
        'UC Santa Cruz team make final round of Google app challenge.',
      body:
        '"The team made the final round of the Google app challenge and was the sole U.S. representative among the ten finalists."',
      href:
        'https://www.santacruzsentinel.com/2023/07/26/uc-santa-cruz-team-make-final-round-of-google-app-challenge/',
    },
    side: 'left',
  },
  {
    id: 'top-10',
    date: 'Jul 31, 2023',
    handDate: 'TOP 10 \u2014 FIRST US TEAM IN 3 YRS',
    chapter: 'Chapter 08',
    title: 'Top 10 global finalist. First U.S. team in three years.',
    body:
      'Google announced the Top 10 finalists of the 2023 Solution Challenge. SlugLoop was one of them \u2014 and the first United States team to crack the global Top 10 in three years. UCSC News ran the story. The team kept the screenshot.',
    video: 'https://www.youtube.com/embed/DlAGp-IjtJM',
    videoLabel: 'Top 10 demo \u2014 finalist stage',
    clipping: {
      source: 'UCSC News',
      date: 'Jul 31, 2023',
      headline:
        'Banana Slugs head to Google Solution Challenge global finals.',
      body:
        '"The only U.S. team selected as a Top 10 global finalist in the 2023 Google Solution Challenge."',
      href:
        'https://news.ucsc.edu/2023/07/slugloop-google-solution-challenge/',
    },
    stamp: 'top 10 finalist',
    stampTone: 'red',
    stampLarge: true,
    quote: 'first u.s. team in the top 10 in three years.',
    quoteAttribution: 'team note, aug 2023',
    side: 'right',
    feature: true,
  },
  {
    id: 'demo-day',
    date: 'Aug 3, 2023',
    handDate: 'demo day',
    chapter: 'Chapter 09',
    title: 'Demo day in front of Google\u2019s panel.',
    body:
      'The team presented at the Google Solution Challenge Demo Day with the Top 10 cohort. The campus loop bus and the basestation\u2011on\u2011a\u2011roof became a global presentation. After demo day the project shifted into maintenance: dependency updates, small bug fixes, and a steady GitHub trickle into 2024.',
    photo: '/background/competition.png',
    photoAlt: 'Top 10 demo day setup',
    photoCaption: 'demo day, global finalists',
    stamp: 'shipped',
    stampTone: 'ocean',
    side: 'left',
  },
  {
    id: 'archive',
    date: 'Now',
    handDate: 'present day',
    chapter: 'Closing',
    title: 'The receivers stopped pinging. The field log is what\u2019s left.',
    body:
      'Some time after the original launch the basestations stopped reporting. The team graduated. The map still loads, the routing logic still runs, but the live feed isn\u2019t live anymore. So this site became something different: a preserved demo, a journey, and a record of what four students built when they took the campus bus problem seriously.',
    margin:
      'thanks for reading the field log. \u2192 try the preserved map demo.',
    side: 'right',
    closing: true,
  },
]

export const journeyStats = [
  {value: '4', label: 'students on the team'},
  {value: '36 hrs', label: 'first prototype at CruzHacks'},
  {value: '500+', label: 'commits across the open source repo'},
  {value: 'Top 10', label: 'in the Google Solution Challenge'},
  {value: 'First US', label: 'team in the global Top 10 in three years'},
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

export const demoLinks = [
  {
    label: 'Top 100 demo video',
    stage: 'Top 100',
    title: 'The competition demo that moved SlugLoop into the global shortlist.',
    body:
      'A tighter product walkthrough from the Solution Challenge Top 100 phase, showing the app as a practical campus mobility tool.',
    href: externalLinks.top100DemoVideo,
  },
  {
    label: 'Top 10 demo video',
    stage: 'Top 10',
    title: 'The finalist-stage demo presented after SlugLoop reached the global Top 10.',
    body:
      'The polished global finalist video, used here as the primary demo artifact for the preserved archive.',
    href: externalLinks.top10DemoVideo,
  },
]

export const teamMembers = [
  {
    name: 'Bill Zhang',
    role: 'Product, full-stack development, and project leadership',
    fieldNote:
      'kept the whole stack stitched together. the one who decided the project would actually ship.',
    img: '/about/bill.png',
    linkedin: 'https://www.linkedin.com/in/bill-zhang1/',
  },
  {
    name: 'Alex Liu',
    role: 'Backend, data pipeline, and frontend development',
    fieldNote:
      'lived in the firestore docs. wrote the express ingestion that turned bus pings into pixels.',
    img: '/about/alex.jfif',
    linkedin: 'https://www.linkedin.com/in/alex-liu-8689a1171/',
  },
  {
    name: 'Annie Liu',
    role: 'Frontend, UI/UX, and product experience',
    fieldNote:
      'made the map look like something a student would actually open between classes.',
    img: '/about/annie.png',
    linkedin: 'https://www.linkedin.com/in/annie-liu-33679624b/',
  },
  {
    name: 'Nicholas Szwed',
    role: 'Backend, hardware, and embedded systems',
    fieldNote:
      'reprogrammed gps units already on the buses. wrangled basestations with libcurl and patience.',
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
  {label: 'Watch Top 100 demo video', href: externalLinks.top100DemoVideo},
  {label: 'Watch Top 10 demo video', href: externalLinks.top10DemoVideo},
  {label: 'Read Devpost', href: externalLinks.devpost},
  {label: 'Original SlugLoop site', href: externalLinks.liveSite},
  {label: 'Alternate domain', href: externalLinks.alternateSite},
]

/**
 * Categorized links used by the back-of-the-notebook page. Each card has a
 * tag for which "section" of the inside back cover it lives on.
 */
export const archiveLinks = {
  demo: [
    {
      label: 'Preserved map demo',
      title: 'Open the archive map.',
      body: 'The original Firestore + Google Maps client. Buses are stale, the map still loads.',
      href: '/map',
      internal: true,
      serial: 'MAP',
    },
    {
      label: 'Top 100 demo video',
      title: 'Top 100 walkthrough.',
      body: 'Submission demo recorded for the Solution Challenge round of 100.',
      href: externalLinks.top100DemoVideo,
      serial: '100',
    },
    {
      label: 'Top 10 demo video',
      title: 'Top 10 finalist demo.',
      body: 'The polished demo from the global finalist stage.',
      href: externalLinks.top10DemoVideo,
      serial: '010',
    },
  ],
  source: [
    {
      label: 'GitHub repo',
      title: 'SlugLoop / SlugLoop',
      body: 'Frontend, backend, cron job, README. Apache-2.0.',
      href: externalLinks.githubRepo,
      serial: 'GH',
    },
    {
      label: 'GitHub org',
      title: 'github.com/SlugLoop',
      body: 'The umbrella org for the project repos.',
      href: externalLinks.githubOrg,
      serial: 'ORG',
    },
    {
      label: 'Devpost',
      title: 'Original hackathon submission.',
      body: 'CruzHacks 2023 Devpost entry with team credits.',
      href: externalLinks.devpost,
      serial: 'DP',
    },
  ],
  press: [
    {
      label: 'UCSC News',
      title: 'Top 10 finalist coverage.',
      href: externalLinks.ucscNews,
      date: 'Jul 31, 2023',
    },
    {
      label: 'Santa Cruz Sentinel',
      title: 'Final round of Google app challenge.',
      href: externalLinks.sentinel,
      date: 'Jul 26, 2023',
    },
    {
      label: 'Santa Cruz Works',
      title: 'CruzHacks team in the Top 10.',
      href: externalLinks.santaCruzWorks,
      date: 'Jul 28, 2023',
    },
  ],
  origin: [
    {
      label: 'Live site',
      title: 'slugloop.tech',
      body: 'The original public domain.',
      href: externalLinks.liveSite,
      serial: 'WEB',
    },
    {
      label: 'Alternate',
      title: 'slugloop.com',
      body: 'The alternate alias domain.',
      href: externalLinks.alternateSite,
      serial: 'ALT',
    },
  ],
}
