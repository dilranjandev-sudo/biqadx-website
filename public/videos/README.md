# Hero video

Drop the generated hero clip here as **`hero.mp4`** (H.264, 1080p, ~8–10s, muted/loopable).
Poster/fallback stays `public/images/home-platform.png`.

Once it's here, `components/home/CinematicHero.tsx` is switched from the still
`<Image>` to an autoplay-muted-loop `<video>` (with the image as the reduced-motion
poster). Keep the file reasonably small (ideally < 8–10 MB) for fast hero load —
export at 1080p, or 720p if needed.
