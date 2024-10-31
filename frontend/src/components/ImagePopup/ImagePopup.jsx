import styles from './ImagePopup.module.css';

const ImagePopup = ({ imageSrc, closePopup, show }) => {
  if (!imageSrc) return null;

  return (
    show ? (
    <div className={styles['overlay']} onClick={closePopup}>
      <div className={styles['popup']} onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Popup" className={styles['image']} />
      </div>
    </div> 
    ) : ("")
  );
};

export default ImagePopup;
