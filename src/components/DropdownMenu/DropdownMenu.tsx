import React, { useState } from 'react'
import classNames from 'classnames'
import { ReactComponent as ExpandMoreSvg } from '../../img/expand-more.svg'
import styles from './DropdownMenu.module.scss'
import ClickOutside from '../../helpers/ClickOutside'
import { AnimatePresence, motion } from 'framer-motion'

export interface DropdownMenuProps {
  name: string
  children?: React.ReactNode
  className?: string
}
export default function DropdownMenu({ name, children, className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ClickOutside handleClickOutside={() => setIsOpen(false)}>
      <div className={className}>
        <span onClick={() => setIsOpen(!isOpen)} className={styles.link}>
          {name}
          <ExpandMoreSvg
            className={classNames(styles.icon, {
              [styles.iconIsOpen]: isOpen,
              [styles.iconHover]: typeof isOpen === 'undefined',
            })}
          />
        </span>
        <AnimatePresence initial={false}>
          {children && isOpen && (
            <motion.div
              className={styles.dropdown}
              initial={{
                opacity: 0,
                translateY: -15,
              }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -15, transition: { duration: 0.15 } }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClickOutside>
  )
}
