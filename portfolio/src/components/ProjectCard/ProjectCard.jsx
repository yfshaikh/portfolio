import React from 'react';
import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'


const ProjectCard = ({ title, image, id, type, content }) => {
  return (
      <div>
          <div className={styles['card']}>
            <div className={styles['card-content']} style={{ backgroundImage: `url(${image})` }}>
              <Link to={`/${type}/${id}`} id={styles['project-title']}>{title}</Link>
            </div>
          </div>
      </div>    
  );
};

export default ProjectCard; 