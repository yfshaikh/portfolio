import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaExternalLinkAlt, FaBars, FaTimes } from 'react-icons/fa'
import styles from './Navbar.module.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header>
      <nav>
        {/* Center the hamburger icon */}
        <div className={styles['hamburger-icon']} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={30} color="white" /> : <FaBars size={30} color="white" />}
        </div>

        {/* Hide menu items when the menu is open */}
        <ul className={`${styles.navList} ${isMenuOpen ? styles.showMenu : ''}`}>
          <li><Link to='/' className={styles['nav-btn']}>Home</Link></li>
          <li><Link to='/resume' className={styles['nav-btn']}>Resume</Link></li>
          <li><Link to='/notes' className={styles['nav-btn']}>Notes</Link></li>
          <li>
            <a 
              href='https://github.com/yfshaikh' 
              target='_blank' 
              rel='noopener noreferrer' 
              className={styles['nav-btn']}
            >
              Github <FaExternalLinkAlt className={styles['external-link-icon']} />
            </a>
          </li>
          <li>
            <a 
              href='https://www.linkedin.com/in/yfshaikh/' 
              target='_blank' 
              rel='noopener noreferrer' 
              className={styles['nav-btn']}
            >
              LinkedIn <FaExternalLinkAlt className={styles['external-link-icon']} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
