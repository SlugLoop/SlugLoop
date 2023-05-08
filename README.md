# SlugLoop

[![Demo Link](https://img.shields.io/badge/-Demo%20Link-blue)](https://slugloop.tech/)
[![Demo Video](https://img.shields.io/badge/-Demo%20Video-red)](https://www.youtube.com/watch?v=fEAl8MajeOs)

## Overview

SlugLoop is a real-time tracking application for loop buses at the University of California, Santa Cruz (UCSC). It provides students with accurate and up-to-date information on loop bus locations and routes, allowing them to make informed decisions about their transportation and relieving pressure on metro buses during peak hours.


## Contributors:

1.  [Bill Zhang](mailto:billzhangsc@gmail.com)
2.  [Annie Liu](mailto:aliu98@ucsc.edu)
3.  [Alex Liu](mailto:liu.alex01@gmail.com)
4.  [Nick Szwed](mailto:nsszwed@gmail.com)

## Table of Contents

- [SlugLoop](#slugloop)
  - [Overview](#overview)
  - [Contributors:](#contributors)
  - [Table of Contents](#table-of-contents)
  - [Inspiration](#inspiration)
  - [Goals](#goals)
  - [Built With](#built-with)
  - [Challenges](#challenges)
  - [Accomplishments](#accomplishments)
  - [What We Learned](#what-we-learned)
  - [What's Next](#whats-next)
  - [How to run](#how-to-run)

## Inspiration

Students at the University of California are frustrated at the rough scheduling of loop buses. Due to the size of campus and various elevation changes, buses are essential to getting to class on time. However, due to the unpredictability of the campus shuttles, students often take the metro, taking up valuable space for other students that want to go off campus. Other times, students opt to wait for loop bus, instead of walking to class, and end up late when the loop doesn’t show up in time. We needed a way to accurately determine when loop buses will show up, so students can plan their commutes more efficiently, reduce overcrowding on alternative transportation options, and ensure timely arrival to classes and campus activities.

## Goals

- Provide accurate and up-to-date information on loop bus locations
- Enable UCSC students to make informed decisions about their transportation
- Relieve pressure on metro buses during peak hours
- Be maintainable and built upon by the school community

## Built With

- GPS emitting hardware on loop buses, installed by the school for tracking purposes
- Raw data processed in ExpressJS and stored on a Firebase database
- Frontend UI built with React and Node.js, displaying bus location data from Firebase on a map
- Seamless user experience through a simple, attractive, and mobile-friendly interface

## Challenges

- Obtaining data from relay stations on campus
- Functionality issues with some GPS stations
- Gaining access to servers through communication with UCSC staff
- Data transfer from receivers to server using LibCurl library and C
- Technical issue with hosting service temporarily hindering project progress
- Limited data availability from loop buses due to restricted operating hours on weekends

## Accomplishments

We are proud to have created SlugLoop since when it is launched it will have an immediate impact on the lives of students at UC Santa Cruz.

1.  Our group has created an application that will have an immediate and positive effect on the lives of the students at UC Santa Cruz.
2.  Our Application has a simple and attractive interface that allows the user to quickly access the data through their mobile device.
3.  This project provides accurate and up-to-date information to the students of UC Santa Crus to reduce the pressure on the city metro buses during peak hours.
4.  This application uses multiple frameworks that all work together in order to provide an incredibly useful service to students.

## What We Learned

Throughout the development of SlugLoop, our team learned:

- The importance of blueprinting and designing applications before writing code
- The challenges of integrating multiple frameworks to deliver a functional and convenient product
- The value of a simple, user-friendly interface
- The significance of assigning roles based on team members' strengths for efficient development

## What's Next

- Collect data to train a machine learning model for estimating bus arrival times at given stops
- Upgrade or replace existing hardware on campus to fill coverage gaps
- Install required hardware on all loop buses to ensure comprehensive tracking
- Obtain official school sponsorship


## How to run

1. Clone the repository
2. Run Frontend
   1. `cd server`
   2. `npm install`
   3. `npm start`
3. Run Backend
   1. `cd server`
   2. `npm install`
   3. `npm start`

Some backend links and enviromental variables will be required. Please contact us for more information.