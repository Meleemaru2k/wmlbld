# Short
A Wimmelbild-Game WebApp
## Planned Features
- Accounts
   - Signup ✅
   - Login ✅
- Dashboard
   - Search Games by Gamename
   - Finished Games (last 25 only)
   - Leadboards by Gamename (top 25 only)
   - Create games
      - Upload Image
      - Add Click-Areas
      - Add Data (Description, Hints, Difficulty, etc.)
- Game
   - Ready-Check
   - Info: Timer, x/x Objectives, Description ✅
   - Get hints/quests
   - Soundeffects ✅
   - Animations
   - Page/State visual transitions
   - Submit Score after game won
## Todo (After Done)
- General
   - Add Setup commands (create DB, create Admin, create Sample-Games...)
   - More info on setup (env vars and stuff)
- Account
   - Add Password Hashing (with salt via env)
   - Add (optional) Account E-Mail Validation and Password Reset functionality
      - Should be enabled via env
- Game
   - Add a Pause & Resume function when playing a game
   - Make it a bit cheat-safe and get "objective found" info only from server (dont store coordinates clientside basically)