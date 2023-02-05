# SlugLoop

[Demo Link](https://slugloop.tech/)

### Contributors:

 1.	bill.zhang.0902@gmail.com
 2.	aliu98@ucsc.edu
 3.	liu.alex01@gmail.com
 4.	nsszwed@gmail.com
    

## Inspiration

For many students, the only source of transportation on and off the campus is the metro and loop buses and, currently many students. Every day some students need to take the metro bus but, when it arrives it is full of other students who are using it because there was not a loop bus immediately available. Students who take the metro around campus when do not need to take a seat on that bus from a student who relies on the metro buses to get back home or go to work off campus. We believe that if students had a real-time map with the current locations of the loop buses and the routes they were on they would be more willing to wait until that bus arrives which opens up space on metro buses. From this idea, SlugLoops was born.

## What are SlugLoop's Goals?

 - The goal of SlugLoop is to provide accurate and up-to-date information on the location of loop buses at UCSC for students to make informed transport decisions.
 - The web app provides real-time information on the location and routes of UCSC loop buses.
 - The app aims to relieve pressure on metro buses during peak hours by allowing students to make informed decisions.
 - The app is designed to be maintainable and built upon by the school.
 
## How SlugLoops was built 

 - The development process involved researching frameworks and tools to provide accurate and up-to-date data to students.
 - Utilizing existing gps emitting hardware on loop busses. These hardware were installed by the school to track the location of the buses.
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

 1. Our group has created an application that will have an immediate and positive effect on the lives of the students at UC Santa Cruz.
 2. Our Application has a simple and attractive interface that allows the user to quickly access the data through their mobile device.
 3. This project provides accurate and up-to-date information to the students of UC Santa Crus to reduce the pressure on the city metro buses during peak hours.
 4. This application uses multiple frameworks that all work together in order to provide an incredibly useful service to students.

## What we learned
Our group learned a great deal through developing our application SlugLoop. Some of which are:

 - The importance of blueprinting and designing our application before actually writing any code
 - The challenges involved with using multiple frameworks together to deliver a functioning product for the end user that is also convenient to use
 - The importance of a simple interface that provides the data to the user without any hoops to jump through.
 - The importance of assigning roles to each member's strengths allowed us to quickly and efficiently build our application.
  
## What's next for SlugLoop

 - Currently, our plan for the application is to collect a large array of data through which we can create a Machine Learning model to accurately estimate arrival times to a user's location at a bus stop.
 - Upgrading/replacing the existing hardware around campus since there are some gaps in the coverage area.
 - Installing Hardware on newer loop buses since newer buses does not have the hardware installed.
