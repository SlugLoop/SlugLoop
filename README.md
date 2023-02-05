# SlugLoop

[Demo Link](https://slugloop.tech/)

### Contributors:

1.  bill.zhang.0902@gmail.com
2.  aliu98@ucsc.edu
3.  liu.alex01@gmail.com
4.  nsszwed@gmail.com

## Inspiration

For many students, the only sources of transportation on and off campus are the metro and loop buses. Often, students travelling around campus will take the first metro bus that comes along, since loop buses are much more unpredictable. Meanwhile, those who rely on metros to get back home or go to work off campus are forced to wait even longer because the metro buses are full of students. We believe that providing students with a real-time map of loop bus locations and routes will encourage them to wait for loop buses rather than taking up space on the metros from those who might need them. From this idea, SlugLoops was born.

## What are SlugLoop's Goals?

- To provide accurate and up-to-date information on the location of loop buses
- The allow UCSC students to make informed decisions about their transportation
- To relieve pressure on metro buses during peak hours
- To be maintainable and built upon by the school community

## How SlugLoops was built

- The development process involved researching frameworks and tools to provide accurate and up-to-date data to students.
- Utilizes existing gps emitting hardware on loop busses. These hardware were installed by the school to track the location of the buses.
- Raw data processed in ExpressJS and stored on a Firebase database
- Frontend UI pulls bus location data from Firebase and displays it on a map.
- User interface built with React and Node JS to provide a seamless user experience.

## Challenges

- Difficulty in obtaining data from relay stations on campus.
- Only Three out of five gps stations were functioning.
- Access to servers gained through communication with UCSC staff.
- Data transferred from receivers to server using LibCurl library and C.
- Technical issue with hosting service temporarily prevented project progress.
- Limited data availability from loop buses due to limited operating hours on weekends.

## Accomplishments

We are proud to have created SlugLoop since when it is launched it will have an immediate impact on the lives of students at UC Santa Cruz.

1.  Our group has created an application that will have an immediate and positive effect on the lives of the students at UC Santa Cruz.
2.  Our Application has a simple and attractive interface that allows the user to quickly access the data through their mobile device.
3.  This project provides accurate and up-to-date information to the students of UC Santa Crus to reduce the pressure on the city metro buses during peak hours.
4.  This application uses multiple frameworks that all work together in order to provide an incredibly useful service to students.

## What we learned

Our group learned a great deal through the development of our application SlugLoop. Some of which are:

- The importance of blueprinting and designing our application before actually writing any code
- We learned about the challenges involved with using multiple frameworks together to deliver a functioning product for the end user that is also convenient to use
- The importance of a simple interface that provides the data to the user without inconveniencing the user
- The importance of assigning roles to each member's strengths allowed us to quickly and efficiently build our application.

## What's next for SlugLoop

- Currently, our plan for this application is to collect data over teh next few week which we can then use to train a Machine Learning model. The goal of this model would be to accurately estimate arrival times to a user's location at a given bus stop.
- Upgrading/replacing the existing hardware around campus since there are some gaps in the coverage area.
- Installing Hardware on all loop buses since some buses are missing the required hardware.
