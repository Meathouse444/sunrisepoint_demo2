Make a demo video of a website concept for The Inn at Sunrise Point, a 12-room
oceanfront inn in Lincolnville, Maine. This is the "2023 vision" version: a
site modeled on the Gregøri Webflow hotel template, in the inn's brand colors
(sandy gold #D4AF37, white, black) with Georgia headlines and Open Sans text.
It will be compared side by side with a second concept, so make the video feel
like a calm, guided tour a guest would take.

## Inputs (all in ./site/, ready to use)
- index.html (home), accommodations.html, amenities.html, activities.html,
  gallery.html, about.html, contact.html
- styles.css and main.js (shared by every page)
- logo.png (gold sun, black text) and logo-light.png (cream text, for photos
  and dark backgrounds)
- images/: real photos of the inn: rooms, gardens, breakfast, the shoreline

Treat every page as finished. Don't change copy, prices, photos or the
"Photo coming soon" placeholders, and leave rates as [$___]. Fix only a
rendering bug, and tell me what you changed.

Note: many of the outdoor photos are 940 px wide social-media exports, so the
full-screen hero images are a little soft at 1920 px. Don't upscale or filter
them; that's expected for this concept.

## Page controls for recording
Load every page with `?demo=1`. That turns off the hero's auto-advance so you
control timing. main.js exposes `window.SP`:
- `SP.goToSlide(n)`: show hero slide n (0–3) on index.html, with a 1.4 s crossfade
- `SP.filterRooms('cottage' | 'main' | 'garden' | 'all')` on accommodations.html
- `SP.openLightbox(i)` and `SP.closeLightbox()` on gallery.html
Prefer real clicks on the visible buttons when the cursor is on screen, and use
SP calls for the hero crossfades.

## Output (put everything in ./out/)
- sunrise-point-vision-demo.mp4: 1920×1080, 30 fps, H.264 (yuv420p, +faststart),
  about 100–130 seconds, no audio
- sunrise-point-vision-demo-square.mp4: 1080×1080 cut for texting and Instagram
- storyboard.png: one contact sheet with a frame from each section

## Method
- Serve ./site with a local static server (`python3 -m http.server` or
  `npx http-server`), never file://.
- Playwright with Chromium, 1920×1080 viewport, deviceScaleFactor 1.
- Capture frames yourself with page.screenshot on a fixed 1/30 s step and drive
  scrolling with window.scrollTo inside that loop. Don't use recordVideo.
- Before capturing each page: wait for network idle, then
  `await page.evaluate(() => document.fonts.ready)`, then confirm
  `document.fonts.check('16px "Open Sans"')` is true. If it's false, stop and
  tell me the fonts didn't load. Georgia is a system font: if the machine
  doesn't have it (most Linux machines don't), install a Georgia-metric font
  such as `fonts-gelasio` or the msttcorefonts package, or say which serif you
  used instead.
- Scrolls: ease-in-out cubic, no faster than 800 px per second, a 1.5 s hold
  at the top of each page and a 1 s hold on each key section.
- Assemble with ffmpeg, with 0.6 s crossfades between sections.

## Shot list
1. Title card, 3 s: logo-light.png centred on #111111 at about 420 px wide,
   with "The 2023 vision" below it in Georgia italic, 44 px, color #D4AF37.
   Build cards as small HTML pages and capture them the same way.
2. Home (index.html), about 32 s: hold on the hero, then crossfade through all
   four slides with SP.goToSlide (about 2.5 s each, so the captions change),
   back to slide 0. Then scroll through: the booking bar, "Our philosophy", the
   stats strip, "Unwind in style", "Stay by the water", the amenities cards,
   the review, the journal, the "Luxury awaits" band and the footer.
3. Rooms & Cottages (accommodations.html), about 22 s: hold on the banner,
   scroll to the filter buttons, then click "Cottages", "Main House",
   "Garden House" and "All rooms", holding 1.5 s after each. Then scroll the
   grid and the "Before you book" section.
4. Amenities (amenities.html), about 18 s: scroll through breakfast, gardens,
   the Garden Spa price table, the shoreline and evenings.
5. Gallery (gallery.html), about 15 s: scroll the photo grid slowly, then open
   the lightbox on two photos (for example index 0 and index 2), 2 s each, and
   close it.
6. Activities (activities.html), about 10 s: banner, then the six activity cards.
7. About (about.html), about 12 s: hosts, mission and values, the timeline.
8. Contact (contact.html), about 8 s: details, form and the map.
9. On a phone, about 8 s: render index.html?demo=1 at 390×844 with
   deviceScaleFactor 2, place it in a simple phone outline (48 px corner
   radius, 14 px #111111 bezel, soft shadow) centred on #F8F5EC at about 900 px
   tall, and scroll gently from the hero to the room cards.
10. End card, 4 s: logo.png on #FFFFFF with "A concept for The Inn at Sunrise
    Point" below it in Open Sans, 26 px, letter-spacing 0.2em, uppercase, #111111.

Before each page section (2 through 9) show a lower-third label for the first
2 s: "01 · Home", "02 · Rooms & Cottages", "03 · Amenities", "04 · Gallery",
"05 · Activities", "06 · About", "07 · Contact", "08 · On a phone". Style:
Open Sans 26 px, weight 600, uppercase, letter-spacing 0.2em, color #FFFFFF,
on a #111111 band at 85% opacity with a 4 px #D4AF37 rule on its left edge,
bottom-left, 48 px from the edges. Inject it into the page before capturing so
the fonts match.

For clicks, show a soft cursor dot (a 22 px #D4AF37 circle at 75% opacity)
gliding to each target over 0.6 s, injected as a fixed-position div, and remove
it between sections.

## Square version
Crop the centre 1080×1080 of each desktop frame. Move the lower-third labels
inside the crop for this version. Re-render the title card, end card and phone
shot at 1080×1080 instead of cropping them.

## If this is a Claude Code cloud session
- Playwright's own browser download may be blocked. If
  `npx playwright install chromium` fails, run
  `npx @puppeteer/browsers install chrome-headless-shell@stable` (downloads
  from storage.googleapis.com) and pass its path to
  `chromium.launch({ executablePath })`.
- Get ffmpeg with `apt-get install -y ffmpeg`; if that fails, use the
  `ffmpeg-static` npm package. Install a Georgia substitute with
  `apt-get install -y fonts-gelasio` if Georgia is missing.
- When the videos pass the checks, commit `out/sunrise-point-vision-demo.mp4`,
  `out/sunrise-point-vision-demo-square.mp4` and `out/storyboard.png` (not
  out/tmp) and push the branch, so I can download them on my phone. Reply with
  a direct GitHub link to each file.

## Checks before you finish
- ffprobe both videos and report duration, resolution and fps.
- Extract 12 evenly spaced frames from the main video and look at them. Fix and
  re-render if you see a blank or half-loaded frame, a missing photo, a filter
  click that didn't change the grid, a lightbox that didn't open, a cut-off
  label, or the cursor dot left on screen between sections.
- Build storyboard.png from one frame per section, labelled.
- Tell me anything you couldn't do and why.
