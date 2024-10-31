import { useState, useEffect } from 'react';
import { storage, db } from '../firebase'; // Ensure both storage and db are imported
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { collection, getDocs } from 'firebase/firestore';


// COMPONENTS
import ProjectCard from '../components/ProjectCard/ProjectCard';
import Navbar from '../components/Navbar/Navbar';
import Timeline from '../components/Timeline/Timeline';

// STYLES
import '../styles/Home.css';

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [timelines, setTimelines] = useState([]);

  const fetchProjects = async () => {
    try {

      // Fetch post titles and image names from Firestore
      const projectsCollection = collection(db, 'projects'); 
      const projectDocs = await getDocs(projectsCollection);
      const projectList = projectDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Include the document ID here
      }));
      console.log('Fetched projects from Firestore:', projectList); 

      // Fetch images from Firebase Storage under 'postImages' folder
      const imagesRef = ref(storage, 'postImages/');
      const imageList = await listAll(imagesRef);
      const imageNames = imageList.items.map(item => item.name);
      console.log('Fetched Images from Storage:', imageNames); 
 
      // Match post titles with images
      const projectsWithImages = await Promise.all(
        projectList.map(async (project) => {
          console.log(`Checking for post: ${project.title}, imageName: ${project.imageName}`); // Log image name in post
          const imageRef = imageList.items.find((item) => item.name === project.imageName);
          
          // Log both image name and found image reference
          console.log(`Post Image Name: ${project.imageName}, Found Image: ${imageRef ? imageRef.name : 'No image found'}`);

          const imageUrl = imageRef ? await getDownloadURL(imageRef) : '';
          console.log(`Post: ${project.title}, Image URL: ${imageUrl}`); 
          return { ...project, imageUrl, id: project.id };
        })
      );

      setProjects(projectsWithImages);
      console.log('Projects with Images:', projectsWithImages); 
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTimelines = async () => {
    try {
      // Fetch post titles and image names from Firestore
      const timelinesCollection = collection(db, 'timelinePosts'); 
      const timelineDocs = await getDocs(timelinesCollection);
      const timelineList = timelineDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Include the document ID
      }));
      console.log('Fetched timlines from Firestore:', timelineList); 
      setTimelines(timelineList);
    } catch (error) {
      console.error('Error fetching timelines:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTimelines();
  }, []);
  

  return (
    <div>
      <Navbar />  
      <div className="intro-container">
      <div className="profile-section">
        <img src="images/pfp.jpeg" alt="Profile" className="profile-pic" />
        <div className="text-container">
          <p>Hi, my name is</p>
          <h1>Yusuf Shaikh, I'm a</h1>
          <h1>Software <span>Developer</span></h1>
        </div>
      </div>
      
      <div className="about-section">
        <h3>About Me</h3>
        <ul className="about-list">
          <li>📖 Honors Computer Science Student @ <strong>UT Dallas</strong></li>
          <li>💻 Passionate about <strong>Fullstack Development</strong> and <strong>AI</strong></li>
          <li>👀 Looking for internships</li>
        </ul>
      </div>
    </div>

     <h2 className="section-header">Projects</h2>
      <div className='row-container'>
        {projects.map((project, index) => (
          <ProjectCard 
            key={index}
            title={project.title}
            image={project.imageUrl} 
            id={project.id}
            type='projects'
          />
        ))} 
      </div>

      <h2 className="section-header">Experience</h2>
      <div className='design-section'>
        <div className='row-container'>
          <div className='timeline'>
            {timelines.length > 0 && timelines.map((experience, index) => (
              // Pass all the props of a timeline to the Timeline component
              <Timeline key={experience._id} {...experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
