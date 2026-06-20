'use client'

export function CinematicOverlay() {
  return (
    <>
      {/* Primary dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(10,10,11,0.72) 0%, rgba(10,10,11,0.3) 50%, rgba(10,10,11,0.55) 100%)',
          zIndex: 10,
        }}
        aria-hidden="true"
      />
      
      {/* Vignette edge darkening */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,10,11,0.65) 100%)',
          zIndex: 11,
        }}
        aria-hidden="true"
      />

      {/* Left side dramatic darkening — keeps katana visible on right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,11,0.55) 0%, transparent 45%)',
          zIndex: 12,
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '35%',
          background: 'linear-gradient(to top, rgba(10,10,11,0.9) 0%, transparent 100%)',
          zIndex: 13,
        }}
        aria-hidden="true"
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '15%',
          background: 'linear-gradient(to bottom, rgba(10,10,11,0.7) 0%, transparent 100%)',
          zIndex: 13,
        }}
        aria-hidden="true"
      />

      {/* Gold cinematic light ray — subtle */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '10%',
          right: '20%',
          width: '2px',
          height: '80%',
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.06), transparent)',
          zIndex: 15,
          transform: 'rotate(5deg)',
        }}
        aria-hidden="true"
      />
    </>
  )
}
