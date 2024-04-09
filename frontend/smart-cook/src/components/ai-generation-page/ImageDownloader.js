import { useState } from 'react';
import axios from 'axios'; 
import defaultAvatar from '../../../public/images/defaultFood.png';
import Image from 'next/image';

const ImageDownloader = ({ imageUrl }) => {
  const [imageSrc, setImageSrc] = useState(defaultAvatar); 

  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to download image');
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setImageSrc(objectUrl);

      // Step 3: Send image data to backend
      const formData = new FormData();
      formData.append('image', blob, 'image.png');

      const backendUrl = 'https://your-backend-api-url'; // Replace with your backend API URL
      const backendResponse = await axios.post(backendUrl, formData);
      console.log('Backend response:', backendResponse.data);
    } catch (error) {
      console.error('Error downloading or sending image:', error);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={downloadImage}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Download Image
      </button>
      <div className="flex-shrink-0">
        <Image src={imageSrc} alt="Downloaded Image" width={100} height={100} />
      </div>
    </div>
  );
};

export default ImageDownloader;
