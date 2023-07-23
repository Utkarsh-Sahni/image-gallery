import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload'
import Gallery from './Gallery'
import axios from 'axios';
import SearchImages from './SearchImages.js';

export default function Feed() {
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages= async()=>{
      try{
      const response= await axios.get('http://localhost:3001/posts/images')
      setImages(response.data);
      }
      catch(error){
     console.log('Error fetching images:', error);
      }
  }



  const updateGallery= (searchResults)=>{
    setImages(searchResults);
  }

  return (
    <div className='m-5 border border-2 border-dark-subtle rounded p-5'>
      <ImageUpload fetchImages={fetchImages}/>
      <SearchImages updateGallery={updateGallery}/>
      <Gallery images={images}/>
    </div>
  )
}
