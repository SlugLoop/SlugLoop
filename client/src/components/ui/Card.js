import React from 'react'
import {cx} from './cx'

export function Card({children, className, interactive = true, ...props}) {
  return (
    <div
      className={cx(interactive ? 'museum-card' : 'museum-static-card', 'rounded-2xl', className)}
      {...props}
    >
      <div className={interactive ? 'museum-card-content' : undefined}>{children}</div>
    </div>
  )
}

export default Card
