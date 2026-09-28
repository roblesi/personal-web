---
order: 2
name: "ffx-lsfg-fast-loads"
tagline: "Frame generation for Final Fantasy X, without the ten-second battle loads"
blurb: "Frame generation got FFX HD Remaster to 120 FPS on Linux, but every battle then took about eleven seconds to load. The cause was pacing: each real frame is held for several refreshes, capping the game at 30 real frames per second, and FFX loads a fixed amount of data per rendered frame. A small service tails the file loader's log, recognises the reads that mark a battle transition, and turns frame generation off for just the second the load takes."
result: "Battle loads: about 11s down to about 1s, still at 120 FPS while playing"
tags: ["Python", "Linux", "systemd", "Steam Deck"]
links: [{label: "GitHub", href: "https://github.com/roblesi/ffx-lsfg-fast-loads"}]
---
