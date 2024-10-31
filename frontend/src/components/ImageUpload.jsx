import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      // Optionally, save metadata (like text) in Firestore
      await addDoc(collection(db, 'uploads'), {
        imageUrl: `images/${image.name}`,
        text,
      });

      alert('Upload successful!');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter some text..."
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
