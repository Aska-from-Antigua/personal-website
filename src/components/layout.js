import * as React from 'react'
import { useState } from 'react'
import Header from './header'
import Footer from './footer'
import {
  container,
} from './layout.module.css'

const Layout = ({ children }) => {
  const [isDark, setIsDark] = useState(true)

  // Load theme preference on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

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
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
