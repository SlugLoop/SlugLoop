'use client'

import dynamic from 'next/dynamic'
import Stamp from '../../src/components/ui/Stamp'

const Map = dynamic(() => import('../../src/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="paper relative flex min-h-screen items-center justify-center">
      <div className="paper-grid" />
      <p className="type-hand relative z-[1] text-[1.6rem] text-[var(--ink-soft)]">
        loading the field map...
      </p>
    </div>
  ),
})

export default function MapPage() {
  if (process.env.NEXT_PUBLIC_SLUGLOOP_TEST_MODE === '1') {
    return (
      <>
        <div id="map" data-testid="map" className="h-screen w-full">
          <div data-testid="google-map" className="h-full w-full" />
        </div>
        <div className="museum-map-panel absolute left-4 top-5 z-[2] max-w-[calc(100vw-110px)] rounded-md p-4 md:left-7 md:top-7 md:max-w-[420px]">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 flex-1">
              <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                // map artifact
              </p>
              <p className="font-display text-lg font-semibold leading-tight">
                Preserved demo of the original wiring.
              </p>
              <p className="text-sm leading-snug text-[var(--ink-soft)]">
                Original Firestore + Google Maps flow. Vehicle data is likely
                stale; the hardware stopped pinging some time ago.
              </p>
            </div>
            <Stamp tone="red" size="sm" rotate={-8}>
              archive
            </Stamp>
          </div>
        </div>
        <div
          role="alert"
          className="museum-alert absolute bottom-5 left-4 z-[2] max-w-[440px] rounded-md px-4 py-3 text-sm shadow-xl md:bottom-7 md:left-7"
        >
          <div className="flex items-start gap-3">
            <Stamp tone="red" size="sm" rotate={-6}>
              demo only
            </Stamp>
            <p className="text-[var(--ink)] type-hand text-[1.2rem] leading-tight">
              no buses match right now &mdash; the receivers stopped reporting.
              try showing past buses from the menu, or treat this as a still
              frame.
            </p>
          </div>
        </div>
      </>
    )
  }

  return <Map />
}
