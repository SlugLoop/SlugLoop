'use client'

import dynamic from 'next/dynamic'
import Chip from '../../src/components/ui/Chip'

const Map = dynamic(() => import('../../src/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      Loading SlugLoop map...
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
        <div className="museum-map-panel absolute left-4 top-5 z-[2] max-w-[calc(100vw-110px)] rounded-3xl p-4 md:left-7 md:top-7 md:max-w-[430px]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Chip label="Map artifact" />
              <span className="type-caption text-[var(--museum-map-panel-subtle)]">
                Preserved demo
              </span>
            </div>
            <p className="text-sm">
              This keeps the original Firestore and Google Maps flow. Vehicle data
              may be stale if the hardware or sync jobs are no longer running.
            </p>
          </div>
        </div>
        <div
          role="alert"
          className="museum-alert absolute bottom-5 left-4 z-[2] max-w-[440px] rounded-2xl px-4 py-3 text-sm text-[#7a4a00] shadow-xl md:bottom-7 md:left-7"
        >
          No recent vehicles match the selected routes. Try showing past buses
          from the menu, or treat this as a static demo moment.
        </div>
      </>
    )
  }

  return <Map />
}
