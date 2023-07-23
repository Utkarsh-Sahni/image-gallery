import React, { useState } from 'react';
import axios from 'axios';

const SearchImages = ({ updateGallery }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/posts/images/search?query=${searchQuery}`);
      updateGallery(response.data);
    } catch (error) {
      console.error('Error searching images:', error);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='d-flex justify-content-center mt-5 form-group px-5'>
      <input className='form-control' type="text" value={searchQuery} onChange={handleChange} />
      <button className='btn btn-secondary' onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchImages;
