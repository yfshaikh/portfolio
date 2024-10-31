import { Link } from 'react-router-dom'
import { FaExternalLinkAlt } from 'react-icons/fa'
import styles from './Navbar.module.css'


function Navbar() {
  return (
    <header>
        <nav>
            <ul>
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
