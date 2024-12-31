### URL Shortener
* a simple url shortener to keep me from boredom.

```
# URL Shortener Project Summary

Its a lazy saturday afternoon and i get bored easily, so i built this.

## How It Works

1. **Frontend**:
   - The frontend consists of an input form where users can enter the long URL they want to shorten.
   - When the form is submitted, a POST request is sent to the backend API with the long URL.
   - The backend responds with the shortened URL, which is then displayed on the frontend along with a "Copy" button.
   - Users can click the "Copy" button to copy the shortened URL to their clipboard. A confirmation message is displayed for a brief period after copying.

2. **Backend**:
   - The backend is built using Express and handles the URL shortening logic.
   - When a long URL is received, the backend checks if it already exists in the database. If it does, the existing shortened URL is returned.
   - If the long URL is new, it is encoded using a custom Base58 encoding function to generate a unique short code.
   - The long URL and its corresponding short code are stored in the MongoDB database.
   - When a user visits the shortened URL, the backend decodes the short code to find the original long URL in the database and redirects the user to it.


## Environment Variables

BASE_URL: Specifies the base URL for the generated short URLs. This allows the application to be flexible and work correctly in different environments.

MONGO_URI: Specifies mongodb connection string.

## Running the Application

Ensure MongoDB is running locally or on

Compile the TypeScript code and start the server using the following commands:

```client
tsc && node dist/server.ts

```
Access the application by navigating to http://localhost:3000 in your web browser. Input a long URL to get a shortened version and test the redirection.


### ![URL Shortener Screenshot](./screenshot.png)
