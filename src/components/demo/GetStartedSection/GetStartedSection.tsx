import React from 'react'
import styles from './GetStartedSection.module.scss'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { URL, PATH } from '../../../constants/content'

import { ReactComponent as HomeCreditSVG } from '../../../../static/img/company-logos/home-credit.svg'
import { ReactComponent as TargetSVG } from '../../../../static/img/company-logos/target.svg'
import { ReactComponent as UsBankSVG } from '../../../../static/img/company-logos/us-bank.svg'
import { ReactComponent as BookingSVG } from '../../../../static/img/company-logos/booking.svg'
import { ReactComponent as AgodaSVG } from '../../../../static/img/company-logos/agoda.svg'
import { ReactComponent as CoinBaseSVG } from '../../../../static/img/company-logos/coinbase.svg'
import { ReactComponent as CheckoutSVG } from '../../../../static/img/company-logos/checkout.svg'
import { ReactComponent as YahooSVG } from '../../../../static/img/company-logos/yahoo.svg'

import Button from '../../common/Button'

interface GetStartedSectionProps {
  advertisingVariant?: boolean
}

export default function GetStartedSection({ advertisingVariant }: GetStartedSectionProps) {
  return (
    <Section className={styles.root}>
      <Container className={styles.heroContainer}>
        <h1 className={styles.title}>12% of the largest 500 websites use Fingerprint</h1>
        {advertisingVariant ? (
          <Button size='big' href={PATH.contactSales} className={styles.advertisingButton}>
            Contact Sales
          </Button>
        ) : (
          <>
            <h2 className={styles.subTitle}>Get Started For Free Today</h2>
            <Button size='big' href={URL.signupUrl} className={styles.button}>
              Create Free Account
            </Button>
          </>
        )}
      </Container>
      <Container size='large' className={styles.clientsContainer}>
        <div className={styles.content}>
          <CheckoutSVG className={styles.checkout} />
          <YahooSVG className={styles.yahoo} />
          <HomeCreditSVG className={styles.homeCredit} />
          <CoinBaseSVG className={styles.coinbase} />
          <AgodaSVG className={styles.agoda} />
          <UsBankSVG className={styles.usBank} />
          <BookingSVG className={styles.booking} />
          <TargetSVG className={styles.target} />
        </div>
      </Container>
    </Section>
  )
}
