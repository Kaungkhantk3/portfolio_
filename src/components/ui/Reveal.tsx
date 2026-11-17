import { useEffect, useRef, type ReactNode } from "react";
import { useMotionPrefs } from "../../hooks/useMotionPrefs";

/* Step 7 version: switched to a lazy Motion component (whileInView) on idle.
   Replaced in step 8 so Motion never loads on small screens. MotionReveal.tsx
   is kept in the repo but no longer imported.

const MotionReveal = lazy(() => import("./MotionReveal"));

export default function Reveal({ children, className }) {
  const { lightMotion } = useMotionPrefs();
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (!lightMotion) return;
    const decide = () => {
      const el = ref.current;
      if (el && el.getBoundingClientRect().top > window.innerHeight) setAnimate(true);
    };
    ...requestIdleCallback(decide)...
  }, [lightMotion]);
  const plain = <div ref={ref} className={className}>{children}</div>;
  if (!lightMotion || !animate) return plain;
  return <Suspense fallback={plain}><MotionReveal className={className}>{children}</MotionReveal></Suspense>;
}
*/

/**
 * Small screens with motion: fade up once when scrolled into view, using an
 * IntersectionObserver and a CSS transition (.reveal-wait / .reveal-in in
 * index.css). No animation library involved.
 *
 * Desktop and reduced motion: a plain <div>; desktop reveals are GSAP's job.
 *
 * The decision is made once the browser is idle, and anything already on
 * screen at that point is left alone, so nothing visible ever blinks.
 */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { lightMotion } = useMotionPrefs();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!lightMotion || !el) return;

    let observer: IntersectionObserver | null = null;
    const arm = () => {
      if (el.getBoundingClientRect().top <= window.innerHeight) return; // already on screen
      el.classList.add("reveal-wait");
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          el.classList.add("reveal-in");
          observer?.disconnect();
        },
        { threshold: 0.15 },
      );
      observer.observe(el);
    };

    let cancel: () => void;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(arm, { timeout: 2000 });
      cancel = () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(arm, 300);
      cancel = () => clearTimeout(id);
    }

    return () => {
      cancel();
      observer?.disconnect();
      el.classList.remove("reveal-wait", "reveal-in");
    };
  }, [lightMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
