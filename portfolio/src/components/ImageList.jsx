import React, { useEffect, useState } from 'react';
import { storage } from '../firebase'; 
import { ref, getDownloadURL, listAll } from 'firebase/storage';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, 'images/');
      const imageList = await listAll(imagesRef);
      const urls = await Promise.all(
        imageList.items.map(item => getDownloadURL(item))
      );
      setImages(urls);
    };
    fetchImages();
  }, []);

  return (
    <div>
      {images.map((url, index) => (
        <img key={index} src={url} alt={`Uploaded Image ${index}`} />
      ))}
    </div>
  );
};

export default ImageList;
