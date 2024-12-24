import React from 'react';
import { StepCard } from './StepCard';
import { steps } from '../data/steps';
import Link from 'next/link';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-black h-screen flex items-center">
      {/* Decorative gradient circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Securely upload and share your images that will{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600">
                fade away
              </span>{' '}
              whenever you want
            </h1>
            <div className="flex justify-center gap-4 mb-16">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-cyan-500/25">
                <Link href="/sign-up">Sign Up</Link>
              </button>
              <button className="px-8 py-3 border-2 border-cyan-500/50 text-cyan-400 rounded-full font-semibold hover:bg-cyan-500/10 transition-all">
                
                <Link href="sign-in">Log In</Link>
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                {...step}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}