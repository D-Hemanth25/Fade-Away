'use client'

import React, { useState } from 'react';
import { Upload, Clock } from 'lucide-react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { BounceLoader } from "react-spinners";

interface UploadResponse {
  url: string;
  message: string;
}

async function uploadImage(userId: string, file: File, expiry: number): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('file', file);
  formData.append('expiry', expiry.toString());

  try {
    const response = await axios.post<UploadResponse>('http://localhost:8000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error uploading image');
    }
    throw error;
  }
}

function App() {
  const { user } = useUser();
  const userId = user?.primaryEmailAddress?.emailAddress.split('@')[0]?.toString()

  const [image, setImage] = useState<File | null>(null);
  const [expiry, setExpiry] = useState('1');
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image');
      toast.error('Please select an image');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await uploadImage(userId, image, parseInt(expiry));
      toast.success('Image uploaded successfully!');
      setImage(null);
      setPreview(null);
      setExpiry('1');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while uploading';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Upload Images to Share</h1>
          <p className="text-cyan-200">Upload your image and set an expiry time</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-cyan-500/10">
          <div className="relative mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
              disabled={isLoading}
            />
            <label
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed border-cyan-400 hover:border-cyan-300 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} bg-black/20`}
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <BounceLoader color="#6e0783" size={60} />
                  <p className="text-white mt-4">Uploading...</p>
                </div>
              ) : preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-contain rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-cyan-400 mb-2" />
                  <p className="text-white">Drop your image here or click to browse</p>
                </div>
              )}
            </label>
          </div>

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-white mb-2">
                <Clock className="w-4 h-4" />
                Expiry Time (hours)
              </label>
              <input
                type="number"
                min="1"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/20 border border-cyan-400/30 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all outline-none"
                placeholder="Enter hours"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-500 hover:to-cyan-300 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-cyan-400/20 outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <BounceLoader color="#ffffff" size={24} />
                <span>Uploading...</span>
              </div>
            ) : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;