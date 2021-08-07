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

- **Above requirement replaced with**: Introducing a “share your itinerary” with other users of the platform 
:heavy_check_mark:



-Customize past users’ itineraries for the primary user
:heavy_check_mark:


-Customize itineraries for users based on their past experiences and preferences (recommended for you) :heavy_multiplication_x:




## Technology Used: 

### - Unit 1: HTML, CSS, JS

Trippo uses CSS within React styled-components to write CSS and import style into functional components separately. Using CSS inside styled-components makes our React components more readable and uniform. CSS was easier to use for styling than HTML, along with adding design and flexibility to make the UI appear much more stylish and conveniently placed for Trippo users. We used TypeScript instead of JavaScript since it can detect bugs caused by dynamic typing that JavaScript cannot, and is a super set of JavaScript, making type recognition, reading, and working on each others code much easier.

### - Unit 2: React

Trippo uses React to create functional UI components that are reactive to state changes within the application such as forms, map data, and itinerary information. React lets us use the dynamic features of TypeScript to efficiently organize and reuse components, and allows sharing of component properties and state so that the right data is always updated displayed throughout the application. Compared to plain JavaScript, React allowed us to split our UI into functional components which helped streamline the coding process between teammates, along with combining HTML and JavaScript wherever was required.

### - Unit 3: Node & Express

Node and Express allowed us to call the external API's used within Trippo such as Yelp and Google, and also allowed us to use routing for itineraries based on their ID's. They also allowed us to Create, Read, Update, and Delete itineraries, activities, and itinerary information via sending requests. After creating models for our MongoDB database, we are able to send requests with formatted information to the database using Express. Since Express is a minimal framework that builds off of Node, it is easy to use and allowed us to quickly use robust routing, error handling, and middleware on the server side.

### - Unit 4: NoSQL with MongoDB

Trippo uses a MongoDB backend with custom schemas to store user, itinerary, and activity information. The flexible nature of NoSQL allowed us to plan a way that we wanted to store information, and make requests to the stored information in the MongoDB Atlas cloud database. With document-based query language and JSON-style information storage, working with and querying the data in our database was quicker and easier than would have been possible using traditional SQL storage considering our documents all do not have a standard layout.
