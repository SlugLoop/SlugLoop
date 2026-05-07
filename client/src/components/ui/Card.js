import React from 'react'
import {cx} from './cx'

/**
 * Notebook-style card. Uses notebook-page treatment by default; opt out with
 * `interactive={false}` to get a plainer paper-card look without hover sheen.
 */
export function Card({children, className, interactive = true, ...props}) {
  return (
    <div
      className={cx(
        interactive ? 'museum-card' : 'museum-static-card',
        'rounded-md',
        className,
      )}
      {...props}
    >
      <div className={interactive ? 'museum-card-content' : undefined}>{children}</div>
    </div>
  )
}

export default Card
