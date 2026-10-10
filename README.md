# DriveWise 3D

Interactive 3D learn-to-drive site (UK rules): crossings, roundabouts, junctions, traffic lights,
cyclists, stopping distances, motorway joining/overtaking/following gaps, plus a 3D quiz.

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production files in dist/
    npm run preview    # test the production build locally

## Deploy
`dist/` is a static site (relative paths), so upload it to Netlify, Vercel, Cloudflare Pages,
GitHub Pages or any web host. No server or environment variables needed.

## Where things are
- `src/world.js`  all Three.js scenes, vehicles, camera
- `src/App.jsx`   page layout, scroll-to-scene, speed buttons, quiz
- `src/quiz.js`   quiz questions (add more here, each tied to a scene key)
- `src/styles.css` styling (mobile layout under 700px)

Notes: Three.js is pinned to 0.128.0 (scenes are tuned for its lighting). Learning aid only;
always follow your instructor and the official Highway Code.
