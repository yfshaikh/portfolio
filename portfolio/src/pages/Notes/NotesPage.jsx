import { useEffect, useState } from 'react';
import styles from './NotesPage.module.css'

// COMPONENTS
import Navbar from '../../components/Navbar/Navbar';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

// FIREBASE
import { storage, db } from '../../firebase'
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [pdfs, setPdfs] = useState({});
  const [images, setImages] = useState({});

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Fetch notes from Firestore
        const notesCollection = collection(db, 'notes'); 
        const noteDocs = await getDocs(notesCollection);
        const noteList = noteDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Include document ID and data
        console.log('Fetched notes from Firestore:', noteList); 
  
        // Fetch images from Firebase Storage under 'postImages' folder
        const imagesRef = ref(storage, 'postImages/');
        const imageList = await listAll(imagesRef);
        const imageNames = imageList.items.map(item => item.name);
        console.log('Fetched Images from Storage:', imageNames); 

        // Fetch pdfs from Firebase Storage under 'notesPdfs' folder
        const pdfsRef = ref(storage, 'notesPdfs/');
        const pdfList = await listAll(pdfsRef);
        const pdfNames = pdfList.items.map(item => item.name);
        console.log('Fetched pdfs from Storage:', pdfNames); 
  
        
        // Match post titles with images and pdfs
        // also add the note id 
        const notesWithAttatchments = await Promise.all(
          noteList.map(async (note) => {            
            console.log(`Checking for note: ${note.title}, imageName: ${note.imageName}, pdfName: ${note.pdfName}`); 
            const imageRef = imageList.items.find((item) => item.name === note.imageName);
            const pdfRef = pdfList.items.find((item) => item.name === note.pdfName);
            
            // Log image/pdf name and found image/pdf reference
            console.log(`Note Image Name: ${note.imageName}, Found Image: ${imageRef ? imageRef.name : 'No image found'}`);
            console.log(`Note pdf Name: ${note.pdfName}, Found pdf: ${pdfRef ? pdfRef.name : 'No pdf found'}`);
  
            const imageUrl = imageRef ? await getDownloadURL(imageRef) : '';
            const pdfUrl = pdfRef ? await getDownloadURL(pdfRef) : '';
            console.log(`Post: ${note.title}, Image URL: ${imageUrl}, pdf URL: ${pdfUrl}`); 

            // Return the note data with URLs and the note's Firestore ID
            return { ...note, imageUrl, pdfUrl, id: note.id };
          })
        );
        
  
        setNotes(notesWithAttatchments);
        console.log('Notes with Attachments:', notesWithAttatchments); 
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
  
    fetchNotes();
  }, []);

  

    







  return (
    <div>
      <Navbar />  
      <div className={styles['pdf-container']}>
        <h2 style={{fontWeight: '400'}}>These are my notes. I publish notes from college classes, online courses, and anything else I'm interested in!</h2>
      </div>
      <div className='row-container'>
        {notes.map((note, index) => (
          <ProjectCard 
            key={index}
            title={note.title}
            image={note.noteImageUrl} 
            id={note.id}
            type='notes'
          />
        ))}
      </div>
    </div>
  );
}

export default NotesPage;
