# Wanderlust — React Destinations Explorer

This project is a lightweight, static site that showcases travel destinations. I added a new React-powered "Destinations Explorer" component for the `#destinations` section with the following features:

- Live search filter
- Sort by popularity (rating) or alphabetical
- View details modal
- Favorite toggle saved to localStorage

How to use:

1. Open the project folder and simply serve `index!.html` from a static server or open it directly in a browser.

Try running a quick HTTP server in Windows PowerShell (this serves only the static files):

```powershell
# If you have Python installed
python -m http.server 8080; # then open http://localhost:8080/index!.html in a browser
```

Alternatively, if you prefer `npm` scripts, I've added a `package.json` that runs a local Node server for static hosting via `server.js`:

```powershell
cd 'C:\Users\Koushika.s\Desktop\wanderlustweb'
npm install
npm start
# then open http://localhost:3000/
```

Note: Some servers or hosting providers may not support or may require URL-encoding for special characters like `!` in filenames. To avoid issues, the project also includes a copy of `index!.html` named `index.html` that you can use as the default entry point.

Note: The site now loads JSON data directly from `data/states.json` and `data/destinations.json`, so no separate API endpoints are required.

Example response:

```json
[
  {
    "id": 1,
    "title": "Discover the Soul of India in the South",
    "image": "/images/img1.png",
    "region": "South",
    "rating": 4.5,
    "description": "Beaches, historic temples, and vibrant culture..."
  }
]
```

Notes:

- I used the React and ReactDOM UMD builds and Babel standalone in the browser for a fast development setup (no build system required). For production, it's recommended to compile using a bundler (Vite, Create React App, or similar).
- All new code is in the `js/app.js` file; CSS additions are in `css/style.css`.

Files changed:

- `index!.html` — insert React mount point and CDN scripts
- `css/style.css` — added styles for the React UI and modal
- `js/app.js` — new React application and components
- `data/states.json` — list of Indian states with images and brief info
- `js/app.js` — updated React app to be a State Explorer (search states)
- `data/states.json` — contains a dataset for all 28 Indian states with fields: name, image, intro, culture, and popular attractions
  - Images for the states are now local and stored in `images/1.jpg` through `images/28.jpg` and referenced from `data/states.json`.
- The site is now responsive across viewport sizes: updated navigation (mobile toggle), hero section, about, values, state cards, and contact form.
- `README.md` — this file
- `data/destinations.json` — dataset with images and descriptions for each destination

If you'd like, I can:

- Convert this to a proper React app (using Vite or Create React App)
- Add unit tests for the components
- Add more destination data and filters (region / rating range)
- Add more destination data and filters (region / rating range). Note: Each destination in `data/destinations.json` includes an `image` property so the front end shows an image for every place.

---

Happy to extend features; let me know what you want next! (e.g. serverless contact form, more destinations, transitions, or converting to a bundled React project.)
