import React, { useState } from 'react';
import styles from './Timeline.module.css'


const Timeline = ({ title, subtitle, content, startDate, endDate, _id, index }) => {

  return (
    <>
      <div className={styles["timeline-line"]}></div>
      <div className={styles["timeline-circle"]}></div>
      <div className={styles["timeline-component"]} key={_id}>
        <div className={styles["timeline-content"]}>
          <h3>{title}</h3>
          <h4>{subtitle}</h4>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <h5>{startDate} - {endDate ? endDate : 'Present'}</h5>
        </div>
      </div> 
    </>
        

  );
};

export default Timeline;
