import { useState, useEffect } from 'react'
import DisplayPDF from '../../components/DisplayPDF/DisplayPDF'
import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'

// FIREBASE
import { storage, db } from '../../firebase'
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { collection, getDoc, doc } from 'firebase/firestore';


function DisplayNote() {
  const { id } = useParams() // extract the 'id' parameter from the URL
  const [title, setTitle] = useState('')
  const [pdf, setPdf] = useState(null)


  useEffect(() => {
    async function fetchNote() {
        // fetch note from firestore based on id
        const docRef = doc(db, "notes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const noteData = docSnap.data();
            setTitle(noteData.title);
            console.log("Document data:", noteData);  
            const pdfName = noteData.pdfName;
            // Fetch PDF associated with the note from Firebase Storage
            if (pdfName) {
                const pdfRef = ref(storage, `notesPdfs/${pdfName}`);
                const pdfUrl = await getDownloadURL(pdfRef);
                setPdf(pdfUrl);
                console.log("PDF URL:", pdfUrl);
            } else {
                console.log("No PDF associated with this note.");
            }

          // Set the note data to state
          setNote(noteData);

          } else {
            console.log("No such document!");
          }

    }

    fetchNote()


 
  }, [id])


  
  return (
    <>
        <Navbar />
        <DisplayPDF source={pdf} title={title}/>
    </>
  )
}


export default DisplayNote

// <DisplayPDF source={pdf} title={title}/>