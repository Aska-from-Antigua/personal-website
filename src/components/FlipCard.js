import * as React from 'react'
import { useState } from 'react'
import {
  card,
  cardInner,
  cardFlipped,
  cardFront,
  cardBack,
  cardIcon,
  cardTitle,
  cardSubtitle,
  cardContent,
} from './FlipCard.module.css'

const FlipCard = ({ icon, title, subtitle, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`${card} ${isFlipped ? cardFlipped : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => e.key === 'Enter' && setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
    >
      <div className={cardInner}>
        <div className={cardFront}>
          <div className={cardIcon}>{icon}</div>
          <h3 className={cardTitle}>{title}</h3>
          <p className={cardSubtitle}>{subtitle}</p>
        </div>
        <div className={cardBack}>
          <div className={cardContent}>
            {backContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlipCard
