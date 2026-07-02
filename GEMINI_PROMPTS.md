# Gemini Video Prompts for Riar Berry's

## VIDEO 1 — Hero Loop (goes in /public/video/canny_transparent.webm)

Generate the hero video FIRST. This is the looping background.

### Prompt:

A cinematic slow-motion video of premium fresh and dried fruits — kiwi slices, mango cubes, strawberries, blueberries, raspberries, dragon fruit halves, apricot halves, figs, banana slices, goji berries, apple slices, orange segments, raisins, dried dates — all floating and slowly rotating in deep black space.

The scene begins with an explosion from the center: all fruits burst outward from one point in slow motion with golden light particles and juice micro-droplets.

After 2–3 seconds the explosion settles. Every fruit continues floating gently, each on its own slow drift path, barely moving — like objects in zero gravity. Very subtle organic motion. Small golden particles drift throughout the background.

The background is deep premium black (#080808) with barely visible warm golden particles and soft cinematic light rays from the upper right.

Lighting: warm, volumetric, cinematic. Soft shadows on every fruit. Ultra sharp macro detail on fruit textures.

The video MUST loop seamlessly — the last frame must match the first frame so it plays as a perfect infinite loop.

No camera movement. Camera is completely locked.
No text. No logos. No UI.
Duration: 8–10 seconds looping.
Style: Luxury organic food commercial. Apple keynote aesthetic. Hyper realistic. 8K HDR. Slow motion.

---

## VIDEO 2 — Category Grouping (goes in /public/video/circles_transparent.webm)

Generate this AFTER VIDEO 1. Start from the last frame of Video 1.

### Prompt:

**You are continuing from the EXACT LAST FRAME of the previous video.**

The first frame of this animation MUST be IDENTICAL to the input frame.
Do not generate new fruits.
Do not change the camera.
Do not change the lighting.
Do not change the background.
Every fruit keeps its exact size, orientation, texture, color and identity.

The background remains identical: deep premium black (#080808) with subtle golden particles and warm cinematic lighting.

The animation starts with all fruits floating gently exactly as in the input frame — perfectly static for the first second.

Then a soft invisible magnetic attraction begins. Every fruit slowly moves toward fruits of the same family using elegant curved paths — never straight lines, never sudden acceleration. The movement is calm, organic, premium.

**THE FINAL COMPOSITION must show exactly SIX ORGANIC WREATHS arranged in ONE PERFECTLY BALANCED HORIZONTAL ROW across the entire screen width.**

NEVER create multiple rows. NEVER stack circles vertically. ONE ROW ONLY.

The six wreaths and their fruits:

Wreath 1 — EXOTIC: kiwi, mango, dragon fruit, pineapple, papaya, banana, passion fruit
Wreath 2 — BERRIES: strawberry, blueberry, raspberry, blackberry, goji berry
Wreath 3 — CITRUS: orange, lemon, lime, grapefruit, mandarin
Wreath 4 — CLASSIC: apple, pear, grapes, cherry, plum, apricot
Wreath 5 — NATURALLY DRIED: dates, figs, raisins, dried apricot, dried banana, dried kiwi
Wreath 6 — PREMIUM MIX: a beautiful artistic composition mixing dried fruits, berries and nuts

Rules:
- Each wreath is made ONLY from its assigned fruits — no mixing between wreaths
- Wreaths are organic, not mathematically perfect — like luxury fruit arrangements made by an art director
- Fruits never touch — generous breathing space inside and between wreaths
- Large elegant negative space between the six wreaths
- No text. No labels. No logos. No UI anywhere
- The fruits communicate the categories by themselves

After the wreaths form, every fruit continues its subtle slow floating and gentle rotation.
Golden particles continue drifting through the background.

Duration: 8–10 seconds.
Style: Luxury organic food commercial. Apple keynote. Hyper realistic. 8K HDR. Macro food photography. Photorealistic. Elegant. Minimal. Premium.

---

## How to use in the project

1. Generate Video 1 → download → save as `canny_transparent.webm` (or MP4)
2. Generate Video 2 → download → save as `circles_transparent.webm` (or MP4)
3. Drop both into `/public/video/` folder
4. If Gemini exports MP4 (not WebM), run this command to add alpha:

```bash
ffmpeg -i your_video.mp4 -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 28 -auto-alt-ref 0 output_transparent.webm
```

Note: If the videos have a dark background instead of true transparency, the site
automatically removes the dark background using CSS `mix-blend-mode: screen` —
this makes black = invisible and bright fruits = visible over the green gradient.
