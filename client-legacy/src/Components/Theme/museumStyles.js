export const museumPageSx = (theme, variant = 'pageBackground') => ({
  minHeight: '100vh',
  color: theme.palette.text.primary,
  background: theme.museum[variant] || theme.museum.pageBackground,
})

export const museumGridOverlaySx = (theme) => ({
  position: 'fixed',
  inset: 0,
  pointerEvents: 'none',
  opacity: theme.palette.mode === 'dark' ? 0.22 : 0.3,
  backgroundImage: `linear-gradient(${theme.museum.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${theme.museum.gridLine} 1px, transparent 1px)`,
  backgroundSize: '54px 54px',
  maskImage: 'linear-gradient(to bottom, black, transparent 88%)',
})

export const museumCardSx = (theme, sx = {}) => ({
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid',
  borderColor: theme.museum.cardBorder,
  borderRadius: 4,
  background: theme.museum.cardBackground,
  boxShadow: theme.museum.cardShadow,
  backdropFilter: 'blur(18px)',
  '&:before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: theme.museum.cardSheen,
    transform: 'translateX(-100%)',
    transition: 'transform 700ms ease',
  },
  '&:hover:before': {
    transform: 'translateX(100%)',
  },
  ...sx,
})

export const museumStaticCardSx = (theme, sx = {}) => ({
  p: {xs: 3, md: 4},
  borderRadius: 4,
  border: '1px solid',
  borderColor: theme.museum.cardBorder,
  background: theme.museum.cardBackground,
  boxShadow: theme.museum.cardShadow,
  backdropFilter: 'blur(16px)',
  ...sx,
})

export const museumDividerSx = (theme) => ({
  borderColor: theme.museum.softDivider,
})

export const museumDotSx = (theme, size = 10) => ({
  width: size,
  height: size,
  borderRadius: '50%',
  bgcolor: 'secondary.main',
  boxShadow: theme.museum.dotGlow,
  flexShrink: 0,
})

export const mapPanelSx = (theme) => ({
  background: theme.museum.mapPanelBackground,
  border: `1px solid ${theme.museum.cardBorder}`,
  color: theme.museum.mapPanelText,
  boxShadow: theme.museum.cardShadow,
  backdropFilter: 'blur(18px)',
})
