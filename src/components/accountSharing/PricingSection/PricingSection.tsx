import React, { useState } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL } from '../../../constants/content'
import Modal from '../../../components/common/Modal'
import ContactSalesForm from '../../../components/ContactSalesForm'
import { ReactComponent as FingerprintSVG } from './FingerprintSVG.svg'
import { ReactComponent as ShieldSVG } from './ShieldSVG.svg'

import styles from './PricingSection.module.scss'

export default function PricingSection() {
  const [isContactSalesModalOpen, setIsContactSalesModalOpen] = useState(false)

  return (
    <>
      <Section className={styles.root}>
        <Container className={styles.titleContainer}>
          <h1 className={styles.title}>Build Versus Buy</h1>
          <p className={styles.description}>
            Whether you are looking to integrate visitor identification with your existing system or want a complete
            end-to-end solution, FingerprintJS has an option for your business.
          </p>
        </Container>
        <Container size='large' className={styles.cardsContainer}>
          <Card
            icon={<FingerprintSVG />}
            label='Plans start at $0/Month'
            title='FingerprintJS Pro'
            description='Build your own system with our visitor identification API'
            leftTitle='Visitor Identification'
            leftContent='Generates a 99.5% accurate visitorID for each unique device that visits your website. VisitorIDs will need to be mapped to your logins and stored so you can identify shared accounts'
            rightTitle='Additional Visitor Data'
            rightContent='Collect geolocation, browser and device details, and incognito mode detection for every visitor. Access everything through our API or webhooks'
            btnText='Create Free Account'
            btnHref={URL.signupUrl}
            variant='outline'
          />
          <Card
            icon={<ShieldSVG />}
            label='Contact Sales for Custom Pricing'
            title='Account Sharing Prevention'
            description='An all-in-one solution for account sharing prevention'
            leftTitle='Visitor-Login Mapping'
            leftContent='Fully identify shared accounts and assess the extent of sharing within your customer base by mapping our 99.5% accurate visitorIDs to your logins'
            rightTitle='Account Sharing Identification'
            rightContent='Flag accounts that are highly likely to be shared.  Set up custom logic that makes sense for your business and be notified when rules are triggered'
            btnText='Talk to Sales'
            onClick={() => setIsContactSalesModalOpen(true)}
            variant='primary'
          />
        </Container>
      </Section>
      <Modal title='Contact Sales' open={isContactSalesModalOpen} onClose={() => setIsContactSalesModalOpen(false)}>
        <ContactSalesForm />
      </Modal>
    </>
  )
}

interface CardProps {
  icon: React.ReactNode
  label: string
  title: string
  description: string
  leftTitle: string
  leftContent: string
  rightTitle: string
  rightContent: string
  btnText: string
  btnHref?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  variant: 'primary' | 'outline'
}
function Card({
  icon,
  label,
  title,
  description,
  leftTitle,
  leftContent,
  rightTitle,
  rightContent,
  btnHref,
  onClick,
  btnText,
  variant,
}: CardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <h1 className={styles.label}>{label}</h1>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <section className={styles.contentSection}>
        <div>
          <h3 className={styles.sectionTitle}>{leftTitle}</h3>
          <p className={styles.sectionDescription}>{leftContent}</p>
        </div>
        <div>
          <h3 className={styles.sectionTitle}>{rightTitle}</h3>
          <p className={styles.sectionDescription}>{rightContent}</p>
        </div>
      </section>
      <Button size='big' href={btnHref} onClick={onClick} variant={variant} className={styles.button}>
        {btnText}
      </Button>
    </div>
  )
}