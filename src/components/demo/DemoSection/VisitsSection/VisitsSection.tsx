import React from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'
import { CurrentVisitProps } from '../../../../types/currentVisitProps'
import Skeleton from '../../../Skeleton/Skeleton'
import { getVisitTitle } from '../../../../helpers/fpjs-widget'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

import { ReactComponent as IncognitoSVG } from './IncognitoSVG.svg'
import { ReactComponent as DotsSVG } from './DotsSVG.svg'
import { ReactComponent as IncognitoIconSVG } from './IncognitoIconSVG.svg'

import styles from './VisitsSection.module.scss'

export default function VisitsSection({ visits, currentVisit }: CurrentVisitProps) {
  const loadedCard = (
    <section className={styles.visitsSection}>
      <div className={classNames(styles.visitsCard, { [styles.incognitoCard]: currentVisit?.incognito })}>
        <table className={styles.visitsTable}>
          <tr className={styles.tableHeader}>
            <th>Time of visit</th>
            <th>incognito mode</th>
          </tr>
          {visits &&
            visits.slice(0, 6).map(({ requestId, timestamp, incognito }, i) => {
              return (
                <tr
                  className={classNames({ [styles.selected]: currentVisit?.requestId === requestId })}
                  id={`visit_${requestId}`}
                  key={requestId}
                >
                  <td>{i === 0 ? 'Current visit' : getVisitTitle(timestamp)}</td>
                  <td className={classNames({ [styles.incognito]: incognito })}>{incognito ? 'Yes' : 'No'}</td>
                </tr>
              )
            })}
        </table>
      </div>
      <div className={styles.incognito}>
        <IncognitoSVG className={styles.icon} />
        <div className={styles.rows}>
          {currentVisit?.incognito ? (
            <h3 className={styles.title}>you are in private browsing</h3>
          ) : (
            <>
              <h3 className={styles.title}>Not in private browsing</h3>
              <p className={styles.description}>Try revisiting in incognito mode</p>
            </>
          )}
        </div>
      </div>
    </section>
  )

  return <Content visitsSection={loadedCard} />
}
export function VisitsSectionLoading() {
  const repeatElement = (length, fn) => Array.from({ length }, (_, i) => fn(i))

  const loadingCard = (
    <section className={styles.visitsSection}>
      <div className={styles.visitsCard}>
        <table className={styles.visitsTable}>
          <tr className={styles.tableHeader}>
            <th>Time of visit</th>
            <th>incognito mode</th>
          </tr>
          <tr className={styles.selected}>
            <td>Current visit</td>
            <td>
              <Skeleton className={styles.visitSkeleton} width={24} />
            </td>
          </tr>
          {repeatElement(5, (i) => (
            <tr key={i}>
              <td>
                <Skeleton className={styles.visitSkeleton} width={104} />
              </td>
              <td>
                <Skeleton className={styles.visitSkeleton} width={24} />
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.incognito}>
        <IncognitoSVG className={styles.icon} />
        <div className={styles.rows}>
          <Skeleton width={202} height={20} />
          <Skeleton width={245} height={24} />
        </div>
      </div>
    </section>
  )

  return <Content visitsSection={loadingCard} />
}

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
}
function Card({ icon, title, description }: CardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}

interface VisitCardProps {
  incognito?: boolean
  mail: string
}
function VisitCard({ incognito, mail }: VisitCardProps) {
  return (
    <div className={styles.card}>
      <p className={styles.visitorId}>QyDG8Zmc3tIKmfzHg00e</p>

      {incognito ? (
        <div className={styles.incognitoSection}>
          <IncognitoIconSVG className={styles.icon} />
          <span className={styles.isIncognito}>Incognito mode</span>
        </div>
      ) : (
        <span className={styles.isIncognito}>Normal mode</span>
      )}
      <p className={styles.isIncognito}>{mail}</p>
    </div>
  )
}

interface ContentProps {
  visitsSection: React.ReactNode
}
function Content({ visitsSection }: ContentProps) {
  const data = useStaticQuery(graphql`
    query {
      incognito: file(relativePath: { eq: "IncognitoLayers.png" }) {
        childImageSharp {
          fixed(width: 104, height: 104, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      catchFraudsters: file(relativePath: { eq: "CatchLayers.png" }) {
        childImageSharp {
          fixed(width: 104, height: 104, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  return (
    <Section className={styles.root}>
      <Container className={styles.containerVisits} size='large'>
        {visitsSection}
        <section className={styles.cardSection}>
          <Card
            icon={<Img alt='Incognito Card' fixed={data.incognito.childImageSharp.fixed} />}
            title='Incognito Mode Detection'
            description='Your VisitorID remains constant even if you revisit the page in incognito mode or turn on a VPN. '
          />
        </section>
      </Container>
      <Container className={styles.containerFraudsters} size='large'>
        <section className={styles.cardSection}>
          <Card
            icon={<Img alt='Catch Fraudsters Card' fixed={data.catchFraudsters.childImageSharp.fixed} />}
            title='Catch fraudsters concealing their identity'
            description='VisitorIDs can be used to connect fraud vents across multiple visits.'
          />
        </section>
        <section className={styles.chartSection}>
          <DotsSVG className={styles.dotsImage} />
          <VisitCard incognito mail='fraud@yourmail.com' />
          <VisitCard incognito mail='8fraud@yourmail.com' />
          <VisitCard mail='fraud123@yourmail.com' />
        </section>
      </Container>
    </Section>
  )
}