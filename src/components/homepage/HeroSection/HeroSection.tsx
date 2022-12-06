import React, { useRef, useEffect, useState } from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { PATH, URL } from '../../../constants/content'
import _ from 'lodash'
import { ReactComponent as TickSVG } from './TickSVG.svg'
import heroWebm from '../../../assets/hero.webm'
import heroMp4 from '../../../assets/hero.mp4'

import { useInView } from 'framer-motion'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { getConfig } from '../../../helpers/fpjs'

import styles from './HeroSection.module.scss'
import classNames from 'classnames'

export default function HeroSection() {
  const ref = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true })

  const { data } = useVisitorData(getConfig)
  const [startedPlaying, setStartedPlaying] = useState(false)

  const [visitorId, setVisitorId] = useState('hZ4W5oQ7pJVIHbW2fBXA')

  useEffect(() => {
    if (isInView && ref.current) {
      setStartedPlaying(false)
      ref.current.play()
      setStartedPlaying(true)
    }
  }, [isInView])

  useEffect(() => {
    if (data) {
      setVisitorId(data.visitorId)
    } else {
      setTimeout(shuffle, 100)
    }
    function shuffle() {
      const randomVisitorId = _.shuffle(visitorId).join('')
      setVisitorId(randomVisitorId)
    }
  }, [data, visitorId])

  return (
    <Container className={styles.container} size='large'>
      <section className={styles.heroSection}>
        <h1 className={styles.title}>The device identity platform for high-scale applications</h1>
        <p className={styles.description}>
          Powered by the most accurate device fingerprinting technology, Fingerprint enables engineers to prevent fraud,
          improve user experiences, and better understand their traffic.
        </p>
        <div className={styles.buttons}>
          <Button href={URL.signupUrl} variant='orangeGradient' className={styles.button}>
            Create Free Account
          </Button>
          <Button href={PATH.demoUrl} variant='orangeGradientOutline'>
            View Live Demo
          </Button>
        </div>
        <div className={styles.tips}>
          <BottomTip>Free for developers</BottomTip>
          <BottomTip>GDRP/CCPA Compliant</BottomTip>
          <BottomTip>Get Started in 10 minutes</BottomTip>
        </div>
      </section>
      <div className={styles.videoWrapper}>
        <div
          className={classNames(styles.animationText, {
            [styles.startVisitorId]: startedPlaying,
          })}
        >
          <p className={styles.animationLabel}>Your visitor ID_</p>
          <p className={styles.animationVisitorId}>{visitorId}</p>
        </div>
        <video onPlaying={() => setStartedPlaying(true)} muted playsInline ref={ref} className={styles.videoSection}>
          <source src={heroWebm} type='video/webm' />
          <source src={heroMp4} type='video/mp4' />
        </video>
      </div>
    </Container>
  )
}

interface BottomTipProps {
  children: string
}
function BottomTip({ children }: BottomTipProps) {
  return (
    <span className={styles.bottomTip}>
      <TickSVG />
      {children}
    </span>
  )
}
