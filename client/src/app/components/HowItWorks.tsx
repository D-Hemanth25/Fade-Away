import React from 'react';
import { Upload, Timer, Share2 } from 'lucide-react';

const steps = [
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
];

export function HowItWorks() {
  return (
    <div className="bg-black py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            How Does It <span className="text-cyan-400">Work?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-black to-cyan-950 rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-cyan-950 flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white text-center">
                    {step.title}
                  </h3>
                  <p className="text-cyan-100/70 text-center">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}