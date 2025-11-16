import * as React from 'react'
import { useState } from 'react'
import Header from './header'
import Footer from './footer'
import {
  container,
} from './layout.module.css'

const Layout = ({ children }) => {
  const [isDark, setIsDark] = useState(true)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Load theme preference on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  // Handle scroll for hiding/showing header and footer on mobile
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Only hide on mobile (width < 768px)
      if (window.innerWidth < 768) {
        // Show header/footer when at top of page
        if (currentScrollY < 50) {
          setIsScrollingDown(false)
        } else if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsScrollingDown(true)
        } else {
          // Scrolling up
          setIsScrollingDown(false)
        }
      } else {
        setIsScrollingDown(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Save theme preference when it changes
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')

    // Dispatch custom event for other components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('themeChange', { detail: { isDark: newTheme } }))
    }
  }

  return (
    <div className={`${container} ${!isDark ? 'lightMode' : ''}`}>
      <Header isDark={isDark} toggleTheme={toggleTheme} isHidden={isScrollingDown} />
      <main>
        {children}
      </main>
      <Footer isHidden={isScrollingDown} />
    </div>
  )
}

export default Layout
