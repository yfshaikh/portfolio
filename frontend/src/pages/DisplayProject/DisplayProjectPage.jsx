import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// COMPONENTS
import Navbar from "../../components/Navbar/Navbar";
import ImagePopup from "../../components/ImagePopup/ImagePopup";

// STYLES
import styles from "./DisplayProjectPage.module.css";

// FIREBASE
import { storage, db } from "../../firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { collection, getDoc, doc } from "firebase/firestore";

function DisplayProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    async function fetchProject() {
      // fetch project from firestore based on id
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const projectData = docSnap.data();
        setProject(projectData);

        const imageName = projectData.imageName;
        // Fetch image associated with the project from Firebase Storage
        if (imageName) {
          const imageRef = ref(storage, `postImages/${imageName}`);
          const imageUrl = await getDownloadURL(imageRef);
          setImage(imageUrl);
        } else {
          console.log("No image associated with this project.");
        }
      } else {
        console.log("No such document!");
      }
    }
    fetchProject();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className={styles['container']}>
        {project && (
          <>
          <div className={styles['image-container']}>
            <h1 className={styles['project-title']}>{project.title}</h1>
            {image && <img src={image} alt="Project" onClick={() => setShowPopup(true)} className={styles['project-image']} />}
          </div>
          <div className={styles['text-container']}>
            <div className={styles['project-text']} dangerouslySetInnerHTML={{ __html: project.content }}></div>
          </div>
          <ImagePopup imageSrc={image} closePopup={() => setShowPopup(false)} show={showPopup} />
          </>
        )}
      </div>
    </>
  );
}

export default DisplayProjectPage;
