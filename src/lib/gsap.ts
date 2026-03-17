/**
 * Central GSAP configuration — import from here instead of 'gsap' directly.
 *
 * Registering ScrollTrigger in every section file that uses it would cause
 * the plugin to be registered multiple times (once per module), which produces
 * console warnings and can cause subtle animation conflicts. By registering it
 * once here, all sections share the same plugin instance.
 *
 * Usage in any section:
 *   import { gsap } from '@/lib/gsap';               // for scroll animations
 *   import { gsap, ScrollTrigger } from '@/lib/gsap'; // when calling ScrollTrigger API directly
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
