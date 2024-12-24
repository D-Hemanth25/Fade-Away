'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { BounceLoader } from "react-spinners";

interface ImageResponse {
  url: string;
}

function ImageGallery() {
  const { user } = useUser();
  const userId = user?.primaryEmailAddress?.emailAddress.split('@')[0]?.toString();
  
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!userId) return;

      try {
        setIsLoading(true);
        const response = await axios.get<string[]>(`http://localhost:8000/images`, {
          params: { user: userId },
        });
        setImages(response.data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching images';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Image Gallery</h1>
          <p className="text-cyan-200">Browse through your uploaded images</p>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-cyan-500/10">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <BounceLoader color="#6e0783" size={60} />
              <p className="text-white mt-4">Loading Images...</p>
            </div>
          ) : error ? (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.length === 0 ? (
                <p className="text-white text-center col-span-full">No images found</p>
              ) : (
                images.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={imageUrl}
                      alt={`Uploaded Image ${index + 1}`}
                      className="w-full h-64 object-cover rounded-xl transition-transform transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold">View Image</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
