# Rental Property Web Application

## Overview

A React-based front-end application developed to integrate a rental-property user interface with a REST API. The application retrieves and presents rental data, supports multi-criteria searching and filtering, displays results through AG Grid, and provides rental rating functionality.

This project demonstrates practical front-end development with React and JavaScript, including API integration, asynchronous data handling, routing, forms, authentication-aware requests, and third-party component integration.

## Main Features

- Retrieve rental properties from REST API endpoints.
- Search and filter properties using criteria such as suburb, state, postcode, rent, bedrooms, bathrooms, parking, property type, and rating.
- Sort and paginate/infinite-load rental results through AG Grid.
- Retrieve supporting data such as property types and states from the API.
- Display and submit rental ratings and comments.
- Use authentication tokens stored in browser `localStorage` for authorised operations.
- Navigate between views using React Router.
- Provide reusable layout, navigation, form, grid, and rating components.

## Technologies

- JavaScript
- React
- React Router
- AG Grid / AgGridReact
- Bootstrap
- HTML5 / CSS3
- REST APIs, HTTP and JSON
- Browser `localStorage`
- npm / Vite

## Project Structure

The application uses a component-oriented structure. The entry point configures React and routing, layout components provide shared page structure, page/components contain rental and rating functionality, and styling files control presentation. API interaction is performed by the relevant components when user actions or component lifecycle events require data.

Typical responsibilities include:

- **Entry point** — starts the React application and configures routing.
- **Layout/navigation** — shared navigation, page structure and footer.
- **Rental views/components** — rental search, filtering, grid display and rental details.
- **Rating components** — retrieving, displaying and submitting ratings.
- **Styles** — application-specific CSS and Bootstrap styling.

## REST API Integration

A central requirement of the project was integrating an existing REST API into the React front end. User-selected search criteria are converted into URL query parameters and sent to the relevant endpoint. JSON responses are then transformed into application state and rendered by React components.

The application also integrates AG Grid with remote data loading so rental records can be requested as required instead of loading the entire dataset into the browser at once.

This provides experience with HTTP requests, query parameters, JSON, request/response handling, asynchronous programming, API-driven UI state, and integrating a front end with an independently developed back end.

## Concepts Demonstrated

### React and Component-Based Development
- Functional components
- Component composition and reuse
- Props and state
- Hooks such as `useState` and `useEffect`
- Separation of UI responsibilities

### Client-Side Routing
React Router is used to navigate between application views without full page reloads. This demonstrates route configuration, navigation, nested/shared layouts, and rendering route-specific content.

### REST API Consumption
The project demonstrates constructing HTTP requests, working with JSON, query parameters and request bodies, processing asynchronous responses, and connecting UI controls to API endpoints.

### Search and Filtering
The search interface maps user input to API query parameters. This is a practical example of translating a user-facing form into a structured server request.

### AG Grid Integration
AG Grid is used for structured rental-property data and remote/infinite row loading. This demonstrates configuration of a third-party React library and connecting its data-loading lifecycle to an API.

### Forms and Authentication
The application handles search and rating input and uses stored authentication information when protected API functionality is required. This provides experience with form handling, validation, token-based request patterns, and browser storage.

## Skills Developed / Demonstrated

### Technical Skills
- React.js
- JavaScript
- REST API integration
- HTTP and JSON
- React Router
- AG Grid / AgGridReact
- HTML and CSS
- Bootstrap
- Browser `localStorage`
- Asynchronous programming
- Form handling
- Client-side state management
- Query-string construction

### Software Development Skills
- Component-based design
- Reusable UI development
- Working with an existing API specification
- Front-end/back-end integration
- Debugging integration issues
- Understanding client/server data flow
- Structuring a multi-component React application

### Problem-Solving Skills
- Investigating unexpected API responses
- Debugging UI and API integration issues
- Diagnosing asynchronous data-flow problems
- Researching libraries and documentation
- Translating functional requirements into working UI features

## Running the Project

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The corresponding REST API must also be available at the endpoint configured by the project.
