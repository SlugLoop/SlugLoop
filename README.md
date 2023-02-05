# SlugLoop

### Contributors:

 1.	bill.zhang.0902@gmail.com
 2.	aliu98@ucsc.edu
 3.	liu.alex01@gmail.com
 4.	nsszwed@gmail.com
    

# What is SlugLoop?
For many students, the only source of transportation on and off the campus is the metro and loop buses and, currently many students. Every day some students need to take the metro bus but, when it arrives it is full of other students who are using it because there was not a loop bus immediately available. Students who take the metro around campus when do not need to take a seat on that bus from a student who relies on the metro buses to get back home or go to work off campus. We believe that if students had a real-time map with the current locations of the loop buses and the routes they were on they would be more willing to wait until that bus arrives which opens up space on metro buses. From this idea, SlugLoops was born.

# What are SlugLoop's Goals?
The goal of SlugLoop is to give students accurate and current information on the location of the loop buses so students can make an informed decision on their choice of transport.

Our web app, SlugLoop,  gives students access to the real-time location of the UCSC loop buses and the individual routes those buses are on.  With our app, students will be able to make an informed decision when they are choosing between a metro and a loop bus. With students able to see the locations of the UCSC loop buses some of the pressure on the metro buses will be relieved especially during peak hours. This app utilizes the existing hardware on the buses and the relay stations situated around campus but, our app provides a fresh new interface for the students to utilize the information provided by the hardware to make the best decision on which bus they need to take especially at peak hours. With our app, students will be provided with the current location of those buses and the route that those buses are on.  
Another goal of this app is to make it maintainable so it can be built upon by the school. One current aspect of this maintainability is to make use of the current infrastructure already in place so by using these materials the time and material costs of maintaining this application will be kept to a minimum. 
 
# How SlugLoops was built 
Through our blueprinting process, our group researched various frameworks and tools to accomplish our goal of providing students with accurate and up-to-date data to students. With this, we discovered the main aspects of our project. First, we wanted to utilize existing hardware on the loop buses so we had to get permissions for those appliances. Second We had to take this raw data and process it to make sure we're only getting the information we need.  After this, we had to store this data on our server where we can then interact with this data through our web interface. To accomplish these tasks we chose to utilize the following frameworks. First, we used Firebase web hosting to handle our app's server-side operations. This is important to our project since we had to ensure that the data we were receiving from the relays around campus could be used. After our server was implemented we had to implement a method of interacting with our server through our frontend UI. This was done with the Express JS framework which provides a vast array of tools for building web services. We chose to use Express JS since we believe that the majority of the users of our application would be interacting through a  mobile device which ExpressJs has a variety of tools that can be used to accomplish this. With the framework of our application built with Express, we chose React and Node Js to implement our user interface so we can provide a seamless user experience.

# Challenges
One of the issues we encountered during this project was getting data from the relay stations on campus. First, we discovered that only three out of the five stations were functioning but, after communicating with UCSC staff we were able to get access to these servers after we gained access to the hardware we were able to connect these devices to our server via the LibCurl library which allows us to transfer data from the receivers to our server where we could then utilize this information. After some issues getting access to the hardware, we encountered another issue when the hosting service we were using encountered an issue that prevented us from working on our project until the issues were resolved. Lastly, the most difficult challenge to overcome was the lack of data available from the loop buses since these buses only run from 4:30 to midnight on the weekends we had a very limited amount of time to test our application.

# Accomplishments

We are proud to have created SlugLoop since when it is launched it will have an immediate impact on the lives of students at UC Santa Cruz.

 1. Our group has created an application that will have an immediate and positive effect on the lives of the students at UC Santa Cruz.
 2. Our Application has a simple and attractive interface that allows the user to quickly access the data through their mobile device.
 3. This project provides accurate and up-to-date information to the students of UC Santa Crus to reduce the pressure on the city metro buses during peak hours.
 4. This application uses multiple frameworks that all work together in order to provide an incredibly useful service to students.

# What we learned
Our group learned a great deal through developing our application SlugLoop. Some of which are:

 - The importance of blueprinting and designing our application before actually writing any code
 - The challenges involved with using multiple frameworks together to deliver a functioning product for the end user that is also convenient to use
 - The importance of a simple interface that provides the data to the user without any hoops to jump through.
 - The importance of assigning roles to each member's strengths allowed us to quickly and efficiently build our application.
# What's next for SlugLoop

- Currently, our plan for the application is to collect a large array of data through which we can create a Machine Learning model to accurately estimate arrival times to a user's location at a bus stop.
 - Upgrading/replacing the existing hardware around campus since there are some gaps in the coverage area.
