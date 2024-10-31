import React, { useState } from 'react';
import { Tiptap } from '../../components/Tiptap/Tiptap';
import Navbar from '../../components/Navbar/Navbar';
import { db, storage } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// STYLES
import './CreatePost.css';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [text, setText] = useState('');
  const [projectImage, setProjectImage] = useState(null); // For project image
  const [noteImage, setNoteImage] = useState(null); // For notes image
  const [pdfFile, setPdfFile] = useState(null); // For notes PDF
  const [postType, setPostType] = useState('project'); // Dropdown state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  // Handles file upload to Firebase storage and returns the download URL and file name
  const handleFileUpload = async (file, folderName) => {
    const storageRef = ref(storage, `${folderName}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return {
      url: await getDownloadURL(snapshot.ref),
      name: file.name, // Return file name
    };
  };

  // Function to handle saving the post to Firestore
  const handleSavePost = async () => {
    if (
      !title ||
      (postType === 'timeline' && (!subtitle || !text || !startDate)) ||
      (postType === 'project' && (!text || !projectImage)) ||
      (postType === 'notes' && (!noteImage || !pdfFile))
    ) {
      setError('Please provide all required fields.');
      return;
    }

    try {
      let projectImageUrl = '';
      let noteImageUrl = '';
      let pdfUrl = '';
      let imageName = '';
      let pdfName = '';

      if (postType === 'project' && projectImage) {
        const { url, name } = await handleFileUpload(projectImage, 'postImages');
        projectImageUrl = url;
        imageName = name; // Save project image name
      } else if (postType === 'notes') {
        if (noteImage) {
          const { url, name } = await handleFileUpload(noteImage, 'postImages');
          noteImageUrl = url;
          imageName = name; // Save note image name
        }
        if (pdfFile) {
          const { url, name } = await handleFileUpload(pdfFile, 'notesPdfs');
          pdfUrl = url;
          pdfName = name; // Save PDF file name
        }
      }

      const collectionName = postType === 'timeline' ? 'timelinePosts' : (postType === 'project' ? 'projects' : 'notes');
      const postsRef = collection(db, collectionName);
      const data = {
        title,
        subtitle: postType === 'timeline' ? subtitle : '',
        content: (postType === 'timeline' || postType === 'project') ? text : '',
        startDate: postType === 'timeline' ? startDate : '',
        endDate,
        projectImageUrl,
        noteImageUrl,
        pdfUrl,
        imageName,
        pdfName,
        createdAt: new Date(),
      };


      await addDoc(postsRef, data);

      // Clear inputs after a successful submit
      setTitle('');
      setSubtitle('');
      setText('');
      setStartDate('');
      setEndDate('');
      setProjectImage(null);
      setNoteImage(null);
      setPdfFile(null);
      setPostType('project'); // Reset to default type
      setError('');
      alert('Post saved successfully!');
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Failed to save post.');
    }
  };

  // File change handlers
  const handleProjectImageChange = (e) => {
    if (e.target.files[0]) {
      setProjectImage(e.target.files[0]);
    }
  };

  const handleNoteImageChange = (e) => {
    if (e.target.files[0]) {
      setNoteImage(e.target.files[0]);
    }
  };

  const handlePdfChange = (e) => {
    if (e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="create-post-page">
        <h2>Create a New Post</h2>
        <div className="post-form">
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value)}
            className="post-type-dropdown"
          >
            <option value="project">Project</option>
            <option value="notes">Notes</option>
            <option value="timeline">Timeline</option>
          </select>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="post-title"
          />

          {postType === 'project' && (
            <>
              <div className="file-input-wrapper">
                <label className="file-input-label" htmlFor="project-image-upload">
                  Choose Project Image
                </label>
                <input
                  type="file"
                  id="project-image-upload"
                  className="file-input"
                  accept="image/*"
                  onChange={handleProjectImageChange}
                />
              </div>
              <Tiptap text={text} setText={setText} />
            </>
          )} 
          {postType === 'notes' && (
            <>
              <div className="file-input-wrapper">
                <label className="file-input-label" htmlFor="note-image-upload">
                  Choose Note Image
                </label>
                <input
                  type="file"
                  id="note-image-upload"
                  className="file-input"
                  accept="image/*"
                  onChange={handleNoteImageChange}
                />
              </div>

              <div className="file-input-wrapper">
                <label className="file-input-label" htmlFor="pdf-upload">
                  Upload PDF
                </label>
                <input
                  type="file"
                  id="pdf-upload"
                  className="file-input"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                />
              </div>
            </>
            )}
            {postType === 'timeline' && (
            <>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Subtitle"
                className="post-title"
              />
              <Tiptap text={text} setText={setText} />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="post-date"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="post-date"
              />
            </>
          )}
          


          {error && <p className="error">{error}</p>}

          <button onClick={handleSavePost} className="save-button">
            Save Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePostPage;
