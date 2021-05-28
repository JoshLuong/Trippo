# CPSC455-project
## Project Description:

For users who want to go travelling and plan an itinerary. It will allow users to create a travel plan and get suggestions of where to go. The application will store login data and user preferences, which can be used to make suggestions to tailor the travel itinerary to the user’s liking. Additional functionality that could be added includes sharing itinerary with other users and flight/hotel information.

### Task Requirements:
Minimal(3-5):

-User is able to pick a starting location, destination location, and a time to go there

-Location preferences + Login info in database (unless using social media API for login?)

-Save itinerary information (time, place, comments)

### Standard(3-7):

-Recommend places (e.g. restaurants based on location/ time of last location/ destination (ranked on preferences set by user)) nearby the destination that are open during the itinerary plan and allow users to “quick create” entries into itinerary using these suggestions

-Ability to save fully formed itineraries to the user’s profile/make it shareable for future use-- make the itinerary collaboratable by inviting other users

-User can choose travel type and application returns time required and destination availability

-Ability to check airbnbs/hotels nearby destination for availability during longer trips (API/external link or other) (maybe have this as just a suggestion during the creation of itinerary)

### Stretch (2-3):

-Travel plans for vacationing far away (flights and hotels)

-Introducing a “share your itinerary” with other users of the platform that decide to go to the same place (i.e. if a user decides to go to LA, the user can see popular itineraries that past users created)

-Customize past users’ itineraries for the primary user

-Customize itineraries for users based on their past experiences and preferences (recommended for you)



## Task Breakdown:
-Edit Itinerary: User is able to pick a starting location, destination location, and a time to go there

    -Search bar for a location, ability to pin it on the map (prompt to be able to attach the location as a stop or create a new starting location)
    
    -By adding the destination to the itinerary, the user will have the ability to drag + drop to time slot/ change the order of destinations/ stops
    
    -By choosing a time slot, the user will be prompted to brief suggestions on other destinations
    
-Create/Save itinerary information (time, place, comments)

    -Create multiple itineraries that are linked to the user’s account
    
    -Itinerary will prompt users to enter information about travel location, dates of travel, collaborators, etc…
    
    -Itinerary will provide different views (specific date, entire trip)
    
    -Allows user(or collaborators) to edit/create/save their own entries with time (start and end) + place
    
    -Link comments with specific place or provide description of entire itinerary
    
    -Allow users to quickly create entries using the search bar (which provides recommendations on where to go)

## Prototypes: 
![image](https://user-images.githubusercontent.com/45836234/119914722-b2ce1200-bf15-11eb-976d-943d2b00ca87.png)
![image](https://user-images.githubusercontent.com/45836234/119914746-c8433c00-bf15-11eb-9cfc-3f1f57b5c5a6.png)

