/**
 * A fresh instance of this wrapper mounts on every route change (that is what an
 * App Router `template` is, as opposed to a `layout`), so the enter animation
 * below replays on each navigation — a real page transition with no router
 * patching and no new dependency.
 *
 * The animation is opacity only, deliberately. A `transform` here would make this
 * wrapper the containing block for every `position: fixed`/`sticky` descendant
 * for the half-second it runs, which would jump the FAQ's pinned background and
 * the pinned scroll scenes. A fade touches none of that. Nav and Footer live in
 * `layout.tsx`, outside this wrapper, so the header never flickers. Reduced motion
 * collapses it to an instant cut via the global block in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
