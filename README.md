# Short
A Wimmelbild-Game WebApp
## Planned Features (MVP)
- Accounts
   - Signup ✅
   - Login ✅
- Dashboard
   - Search Games
      - Search by GameName ✅
      - Search by User ✅
      - Latest Games (last 25 only) ✅
      - Finished Games / Highscore Indicator ✅
   - Leadboards for Games User has played (top 25 only)
   - Create games ✅
      - Upload Image ✅
      - Add Click-Areas ✅
      - Add Data (Description, Hints, Difficulty, etc.) ✅
   - Delete games ✅
- Game
   - Ready-Check ✅
   - Game-Info
   - Info: Timer, x/x Objectives ✅
   - Get hints/quests
   - Soundeffects ✅
   - Animations ✅
   - Page/State visual transitions ✅
   - Submit Score after game won ✅
## Todo (After this the App is "done")
- General
   - Add Setup commands (create DB, create Admin, create Sample-Games...)
      - More info on setup in Readme.
      - Make more things configurable via env vars
   - Compress Images, add a thumbnail image and add max-files size for upload
   - Cache API calls for gamedata for like an hour and uncache on delete.
- Game
   - Timer in HH:MM:SS
- Account
   - Add Password Hashing (with salt via env)
   - Add (optional) Account E-Mail Validation and Password Reset functionality
- Editor
   - Better UX
      - Implement proper drag and drop in Game Editor OR remove it and find a different solution (range-sliders on elemets for example)
         - See if shortened longpress will be fine as a long longpress to add Eggs feels awkward
- Design Cleanup
   - Add Emoji-Confetti on game-won.
## Future Ideas (Might never do those but here goes nothing)
- General
   - Music Player ✅
      - Autoplay setting via cookies
      - Looping
      - Dynamically import songs (and SFX) on demand
   - Add blob/cloud-storage/cdn for image-data
- Game
   - Add a Pause & Resume function when playing a game
   - Make it a bit cheat-safe and get "objective found" info only from server (dont store coordinates clientside basically)
   - Edit Game 
      - only if nobody has played the game yet?
      - maybe don't add this because it will have a lot of weird implications (do users keep their highscore etc)?
   - Submit half-finished games score (x/x eggs found indicator)
- Code/Architecture
   - Refactor some stuff into smaller components and composables ✅
   - try to reuse more code between actual game and game-editor if possible
- Design
   - Get something coherent going :) ✅
   - Rainbows and shiny stuff, i guess ✅
   - More visual effects
   - More Video-Gamey feel to the UI!
   - Add a slightly configurable Color-Theme :)
