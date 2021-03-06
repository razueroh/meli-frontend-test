# MELI Frontend Test

This project is a proof of concept of the search page for Mercado Libre. It was made with:

- React
- React Router
- SASS
- Express
- Webpack
- Node

It also uses:

- React hooks
- Code splitting with Webpack
- BEM methodology for the naming convention of the components classes
- CSS Grid and CSS Flexbox layouts
- Airbnb Javascript Style Guide
- Server Side Rendering with Express

### Disclaimer

For the challenge the `.env` file is public but that's not a good practice and could end in a lot of troubles.

## Summary

### Views

- The views are made for desktop
- They use a 12 column grid layout for the distribution of the components
- Colors, font sizes, paddings, and margins were given in the specs of the challenge and are defined in `Vars.scss`
- The project has three views with their routes:
  - **Search box:** `'/'`
  - **Result list:** `/items?search=`
  - **Product details:** `/items/:id`
- The **result list** and **product view** have three states
  - `loading`: shows a loading animation before every request to the API
  - `success`: shows the data if the request was successful
  - `error`: shows a message if the request doesn't return any result or if it was rejected
- The `error` state has two predefined messages for the following error codes:
  - `404`: the item doesn't exist
  - `500`: the server had an internal error

### Server

- It renders the page content with Server Side Rendering
- Also, it has two endpoints and uses the Mercado Libre API for the product search and product details requests.
  - Endpoint for search: `/api/items?q=:query`
    - `https://api.mercadolibre.com/sites/MLA/search?q=:query`
  - Endpoint for product details: `/api/items/:id`
    - `https://api.mercadolibre.com/items/:id`
    - `https://api.mercadolibre.com/items/:id/description`
    - `https://api.mercadolibre.com/categories/:category_id`

## Configuration

### Tools

- node (v14.6.0)
- npm (6.14.8)

### Clone the repo

```
git clone https://github.com/razueroh/meli-frontend-test.git
```

### Install dependencies

```
npm install
```

## Development

Run the development server

```
npm run dev
```

Finally, open your browser in http://localhost:3000/

### Production

Build the assets and start the production server

```
npm run build
npm start
```

Finally, open your browser in http://localhost:3000/
