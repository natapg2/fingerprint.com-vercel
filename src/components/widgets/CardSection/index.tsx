import React from 'react'
import Container from '../../common/Container'
import Section from '../../common/Section'
import CardGrid, { Card } from '../CardGrid'
import SubHeaderComponent from '../SubHeader'
import classNames from 'classnames'

import styles from './CardSection.module.scss'

export interface CardSection {
  title: string
  subtitle?: string
  cards: Card[]
  className?: string
}

export default function CardSectionComponent({ title, subtitle, cards, className }: CardSection) {
  return (
    <Section className={classNames(className, styles.root)}>
      <Container size='large'>
        <div className={styles.cardSection}>
          <SubHeaderComponent
            title={{ text: title, weight: 'primary' }}
            subtitle={subtitle ? { text: subtitle } : undefined}
          />
          <CardGrid cards={cards} />
        </div>
      </Container>
    </Section>
  )
}
