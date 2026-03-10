'use client'

import { useEffect, useState } from 'react';

/**
 * The two pricing/content regions Kiza supports.
 * - 'nigeria'       : visitor's IP resolves to Nigeria (NG country code)
 * - 'international' : all other countries; also the safe default on error
 */
export type Region = 'nigeria' | 'international';

interface UseRegionResult {
  /** Detected (or manually selected) region. */
  region: Region;
  /** True while the IP lookup is in-flight; hides price labels during detection. */
  loading: boolean;
  /** Lets the user manually override the auto-detected region. */
  setRegion: (r: Region) => void;
}

/**
 * Detects the visitor's region via IP geolocation on mount.
 *
 * Uses ipapi.co (free, no auth required). Resolves to 'nigeria' if the
 * country code is 'NG', otherwise falls back to 'international'.
 * Any network error or timeout silently falls back to 'international'
 * so pricing is always shown — never blocked on a geo failure.
 *
 * The returned `setRegion` lets users manually switch regions via the
 * RegionToggle UI component.
 */
export function useRegion(): UseRegionResult {
  // Default to 'international' so pricing always renders even before detection.
  const [region, setRegion] = useState<Region>('international');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Guard against state updates after the component unmounts.
    let cancelled = false;

    async function detect() {
      try {
        // 4-second timeout prevents the page hanging on slow networks.
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
        if (!res.ok) throw new Error('geo failed');
        const data = await res.json();
        if (!cancelled) {
          setRegion(data.country_code === 'NG' ? 'nigeria' : 'international');
        }
      } catch {
        // Silently fall back to 'international' — pricing is still shown.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    detect();

    // Cleanup: mark as cancelled so no state update fires after unmount.
    return () => { cancelled = true; };
  }, []);

  return { region, loading, setRegion };
}
