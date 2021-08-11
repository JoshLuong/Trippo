# Trippo
## Project Description:

Trippo is a collaborative, map-based, suggestive itinerary planner that allows users to create create customizable itineraries while managing their expenses at each destination.

With Trippo, you can plan for your favorite destinations, add collaborators, create budgets, get Yelp® suggested activities, and more!
Say Goodbye to using traditional documents and spreadsheets, and say Hello to Trippo!

### Task Requirements:
Minimal(3-5):

-User is able to pick a starting location, destination location, and a time to go there :heavy_check_mark:

-Location preferences + Login info in database (unless using social media API for login?)
**Decided on social media API**
:heavy_check_mark:

-Save itinerary information (time, place, comments) :heavy_check_mark:


### Standard(3-7):

-Recommend places (e.g. restaurants based on location/ time of last location/ destination (ranked on preferences set by user)) nearby the destination that are open during the itinerary plan and allow users to “quick create” entries into itinerary using these suggestions. 
(**No quick create**) :heavy_check_mark:


-Ability to save fully formed itineraries to the user’s profile/make it shareable for future use-- make the itinerary collaboratable by inviting other users :heavy_check_mark: 

-User can choose travel type and application returns time required and destination availability 

- **Above requirement replaced with**: application returns destination distances
:heavy_check_mark:

-Ability to check airbnbs/hotels nearby destination for availability during longer trips (API/external link or other) (maybe have this as just a suggestion during the creation of itinerary) 
:heavy_multiplication_x:

### Stretch (2-3):

-Travel plans for vacationing far away (flights and hotels) :heavy_multiplication_x:


-Introducing a “share your itinerary” with other users of the platform that decide to go to the same place (i.e. if a user decides to go to LA, the user can see popular itineraries that past users created)

- **Above requirement replaced with**: Introducing a “share your itinerary” with others
:heavy_check_mark:



-Customize past users’ itineraries for the primary user
:heavy_check_mark:


-Customize itineraries for users based on their past experiences and preferences (recommended for you) :heavy_multiplication_x:




## Technologies Used: 

### - Unit 1: HTML, CSS, JS

Trippo uses CSS within React styled-components to write CSS and import style into functional components separately. Using CSS inside styled-components makes our React components more readable and uniform. CSS was easier to use for styling than HTML, along with adding design and flexibility to make the UI appear much more stylish and conveniently placed for Trippo users. We used TypeScript instead of JavaScript since it can detect bugs caused by dynamic typing that JavaScript cannot, and is a super set of JavaScript, making type recognition, reading, and working on each others code much easier.

### - Unit 2: React

Trippo uses React to create reusable, functional UI components that are reactive to state changes within the application such as forms, map data, and itinerary information. React lets us use the dynamic features of TypeScript to efficiently organize and reuse components, and allows sharing of component properties and state so that the right data is always updated displayed throughout the application.  Through various state management techniques (e.g. Redux, React Context) we were able to efficiently propagate any state changes to the React components, effectively updating the UI, while also benefiting from Redux's internal performance optimizations.

### - Unit 3: Node & Express

Node and Express allowed us to call the external API's used within Trippo such as Yelp and Google, and also allowed us to use routing for itineraries based on their ID's. They also allowed us to Create, Read, Update, and Delete itineraries, activities, and itinerary information via sending requests. After creating models for our MongoDB database, we are able to send requests with formatted information to the database using Express. Since Express is a minimal framework that builds off of Node, it is easy to use and allowed us to quickly use robust routing, error handling, and middleware on the server side.

### - Unit 4: NoSQL with MongoDB

Trippo uses a MongoDB backend with custom schemas to store user, itinerary, and activity information. The flexible nature of NoSQL allowed us to plan a way that we wanted to store information, and make requests to the stored information in the MongoDB Atlas cloud database. With document-based query language and JSON-style information storage, working with and querying the data in our database was quicker and easier than would have been possible using traditional SQL storage considering our documents do not all have a standard layout.

### - Unit 5: Release Engineering

Trippo uses Git and GitHub for version control, with collaborators using different branches to write enhancements and fix bugs. We only push changes to the "final_project" branch after collaborators manually test enhancements to ensure there are no new bugs introduced. We set up an admin email with a new Heroku account, configuring the "final_project" branch to automatically deploy changes to the production build through Heroku because Heroku is a simple to use platform that team members were familiar with, and it contains GitHub integration. 


## Above and Beyond Functionality:

Trippo securely uses the Google Login API `OAuth2Client` to log in to user accounts, linking itineraries to their Google login. Using the Mapbox map components, Trippo populates the map with colour-coded activity pins, and sets custom latitude and longitudes during its first render. Trippo uses custom Yelp API calls to get suggested destinations based on user preferences, Trippo activity locations, destination times, and the business hours of suggested destinations. Trippo allows users to share their itineraries online and offline by letting users create read-only itinerary links that can be shared and accessed without creating an account, as well as generate downloadable PDFs of their full itineraries. With Trippo's focus on User Experience and usability, minute details such as the zoom functionality of the map, to the user feedback during any user changes, as well as overall style and responsiveness were not overlooked.

## Next Steps:

To further improve on Trippo, we plan to complete our missing standard requirement and use AirBNB's API to allow users to book lodging for their trips through Trippo. We also plan to look into flight planning API's, use information from a users previously created itineraries to recommend new locations, and allows users to choose their mode of travel to return estimated times between destinations.

## List of Contributions:

#### Joshua Luong:

- Overhauled UX/UI design of the application, as well as contributing to the re-design- implementing the itineraries home page, itinerary edit/ calendar page, itinerary master plan view, and new activitiy popup
- Implemented secure Google log in, user validation, React router redirects, Yelp APIs/ models/ suggested yelp data design; assisted in form validation and overall UI implementation
- Created the secure link sharing capability, and export to PDF feature.

#### Andre Ramkairsingh:

- Created database models for itineraries, activities and users, added seed scripts and setup the backend directory structure.
- Connected the itinerary list and edit pages to the backend, added the map feature with Mapbox's API.
- Created build scripts for continuous deployment via Heroku and GitHub.

#### Richard Ho:

- Constructed API for itinerary (PUT/DEL), and user (GET by email or id) using RTK toolkit for client-side and Express on server side. 
- Ensuring data integrity with form validation + mongoose schemas/indexes on both front end and back end for itinerary creation and edits, and rendering server response in front-end with toasts.
- Creating responsive UI for welcome page and itinerary creation/edit.

#### Rohit Bassi:

- Integrated the navigation bar and search bar with routing and styling, created and assisted in styling the About page for Trippo.
- Creation and form validation for new activities, adding new activities to existing itineraries, itinerary deletion, retrieving information about existing map pins from itineraries.
- Connected Yelp API requests to new activity creation, created Trippo user documentation, drafted presentation script, wrote final project report.


## Prototypes: 
![image](https://user-images.githubusercontent.com/45836234/119914722-b2ce1200-bf15-11eb-976d-943d2b00ca87.png)
![image](https://user-images.githubusercontent.com/45836234/119914746-c8433c00-bf15-11eb-9cfc-3f1f57b5c5a6.png)
