import React, { useRef } from 'react'

import Container from '../../common/Container'

import styles from './CustomerStoriesSection.module.scss'
import { ReactComponent as CheckoutSVG } from '../../../../static/img/company-logos/checkout.svg'

import { useInView } from 'framer-motion'
import classNames from 'classnames'

export default function CustomerStoriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <Container
      size='large'
      className={classNames(styles.container, {
        [styles.visible]: isInView,
      })}
    >
      <div className={styles.labelWrapper}>
        <span className={styles.label}>Customer Stories</span>
      </div>
      <div className={styles.logoSection}>
        <CheckoutSVG className={styles.logo} />
      </div>
      <div className={styles.quoteSection}>
        <p className={styles.quote} ref={ref}>
          “With Fingerprint, we&apos;re able to identify fraudulent payment attempts with higher accuracy. The developer
          experience was outstanding - we got all the way to production in less than a week.”
        </p>
        <p className={styles.author}>Pierre Roudaut</p>
        <p className={styles.position}>Senior Engineering Manager - Fraud Detection</p>
      </div>
    </Container>
  )
}