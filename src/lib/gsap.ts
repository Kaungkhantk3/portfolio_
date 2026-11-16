// Single registration point for GSAP plugins. Import gsap/ScrollTrigger/etc.
// from here, never from "gsap" directly, so plugins are registered exactly once.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Flip, SplitText, useGSAP);

export { gsap, ScrollTrigger, Flip, SplitText, useGSAP };
