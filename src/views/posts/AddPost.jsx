import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddPostForm = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [link, setLink] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');

  const categoryOptions = [
    { value: 'Tissage et bonneterie', label: 'Tissage et bonneterie' },
    { value: 'Finissage', label: 'Finissage' },
    { value: 'Filature', label: 'Filature' },
    // Add more categories as needed
  ];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dfnxagwsr/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleFileSelect1 = async (e) => {
    const url = await handleImageUpload(e);
    if (url) setImageUrl1(url);
  };

  const handleFileSelect2 = async (e) => {
    const url = await handleImageUpload(e);
    if (url) setImageUrl2(url);
  };

  const handleCategorySelect = (value) => {
    const index = selectedCategories.indexOf(value);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      const newCategories = [...selectedCategories];
      newCategories.splice(index, 1);
      setSelectedCategories(newCategories);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        link: link,
        categorie1: selectedCategories[0], // Assuming only one category selected
        categorie2: selectedCategories[1] || '', // Assuming at most two categories selected
        categorie3: selectedCategories[2] || '', // Assuming at most three categories selected
        image1: imageUrl1,
        image2: imageUrl2,
      };

      const response = await fetch(`http://localhost:5000/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        window.location.reload();
        console.log('Data sent successfully');
      } else {
        console.error('Error sending data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Ajouter un nouveau partenaire</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <div className="mb-4">
            <label htmlFor="link" className="block text-gray-700 font-medium mb-2">
              Lien:
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Entrez le lien"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Catégories:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categoryOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option.value}
                    value={option.value}
                    checked={selectedCategories.includes(option.value)}
                    onChange={() => handleCategorySelect(option.value)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="image1" className="block text-gray-700 font-medium mb-2">
              Image 1 :
            </label>
            <input
              type="file"
              id="image1"
              name="image1"
              onChange={handleFileSelect1}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image2" className="block text-gray-700 font-medium mb-2">
              Image 2 :
            </label>
            <input
              type="file"
              id="image2"
              name="image2"
              onChange={handleFileSelect2}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-[#003566] text-white px-4 py-2 rounded-lg transition">
              Ajouter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
