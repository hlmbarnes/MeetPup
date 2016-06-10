PROJECT 4 | MeetPup

Heroku: https://meetpup.herokuapp.com
---------------------------------
CONCEPT: Tinder for dog playdates. An app  made for dog owners to find man's best friend their own best friend. 

TECHNOLOGIES USED:
-MEAN STACK: MongoDB, Express.js, Angular.js, and Node.js.
-Bootstrap, Bycrypt, JWT

GENERAL APPROACH:
-I first worked on my user-flow for the application keeping in mind my user stories *see below*. 
-From there I was able to work on my Database structure and relationships setting up my two Models (pup, user), and their corresponding controllers. 
-Once I had my basic flow, routes and controllers setup I worked on the authorization for the app which took the longest amount of time in my app. 
-After auth, the focus was on updating the views and the logic behind matching for users based on angular (ng-click)
-Styling

INSTALL INSTRUCTIONS:
In Terminal:
-NPM Install
-Run npm install npm install --save express body-parser mongoose express-jwt jsonwebtoken
-To host locally, launch Mongod in one terminal and simultaneously launch Nodemon in another terminal window.

USER FLOW:
Wireframes:https://ninjamock.com/s/N2QFD

USER STORIES:
  -Primary user is a dedicated  pup mom/dad who wants to find other local pup parents similar to themselves to have their dog play with.  (no need to show up to a dog park and randomly hope for dog chemistry)
  -Secondary users: dedicated dog parents also seeking to coordinate with similar minded animal lovers to make connections (friendships / dates).

UNSOLVED ISSUES / MAJOR HURDLES:
- I had a lot of difficulty with the matching logic due to the database structure I setup (essentially twice nested data to access matches). Because of this I was not able to do MongoDB conversations as I hoped and most of my time was spent after auth differentiating the logged in user (myPup) and removing/ excluding other pups once they have been matched and pushing that into the matches database. 

With more time,  I hope to include more animations / styling, finish the removal of 'unmatched' pups as well as an image uploading system. 


