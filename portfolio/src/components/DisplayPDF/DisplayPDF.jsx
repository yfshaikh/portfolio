import styles from './DisplayPDF.module.css'

function DisplayPDF({source, title}) {
  return (
    <>
        <div className={styles['pdf-container']}>
            <h1>{title}</h1>
        </div>
        <div className={styles['pdf-container']}>
            <iframe src={source} title={title} className={styles['pdf-doc']}></iframe>
        </div>
    </>
  )
}

export default DisplayPDF
