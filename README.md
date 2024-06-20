# Event Calender App

## Demo & Snippets

## Requirements / Purpose

The purpose of this project is to allow users to add events to a calender that are assigned to a date and stored in the backend.

- Each of the days cells should be clickable.
- The user should be able to navigate between months - view the upcoming month, previous month etc.
- A card component should be displayed to represent an event on the corresponding day
- Validation to ensure events follow typing requirements
- Have a countdown for each events end date
- Backend requirements:
  - Create a new event
  - Update an existing future event
  - Delete an event
  - Retrieve all events from the database
  - Retrieve a single event from the database
  - Filter events by labels
  - Filter events by location

---

## Build Steps

- Run "npm run build && npm run dev" from within the ./Events Calender/ folder
- Run the "todolist\src\main\java\com\todolist\TodolistApplication.java" file within terminal to initiate backend

---

## Design Goals / Approach

- Keep the design as simple as possible and to not overcomplicate the user experience.
- Have buttons only appear after clicking a date or event to ensure theres no clutter on the calender itself.
- Have each label for events correspond to a different colour to make events more discernable

---

## Features

- CRUD operations for event objects
- Sets the first day of the month to the correct date and generate empty day slots
- Set start and end dates for each individual event
- Converts front end date inputs into LocalDateTime values in the backend
- Countdown on each event of how many days until end date

---

## Known issues

- Testing not currently working on the backend
- Sometimes the event is added to the day before/after (unsure why this is happening)

---

## Future Goals

- To allow users to have a list view of all events
  - For this list to have filtering and ordering functionality
- Create intricate testing of the frontend
- To change view of the calender (weekly, monthly, yearly)
- Add reminders for events
- Toast notifications

---

## What did you struggle with?

- Ran into issues with typing errors due to using typescript with a java backend. Especially with the dates. Had to setup a conversion function that translated the java LocalDateTime values so that the front end could use it and vice verca.
- Vitest configuration errors causing the testing to not be completed when I had liked

---

## Licensing Details

- Unlicensed

---
