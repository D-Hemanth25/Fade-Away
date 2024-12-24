import { Upload, Timer, Share2 } from 'lucide-react';

export const steps = [
  {
    title: 'Upload Your Image',
    description: 'Drag and drop or select an image from your device.',
    icon: Upload,
  },
  {
    title: 'Set an Expiry Time',
    description: 'Choose how long your image will remain accessible.',
    icon: Timer,
  },
  {
    title: 'Share the Link',
    description: 'Get a sharable link to distribute your image.',
    icon: Share2,
  },
] as const;