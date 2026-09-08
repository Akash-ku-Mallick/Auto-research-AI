import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F4F8FD]">
      
      {/* Base Daylight Sky Gradient Mesh */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#E7F0FB] via-[#EFF5FD] to-[#F8FAFC] opacity-90"
      />

      {/* High-Performance Daylight Atmosphere Blobs (Zero-Cost Radial Gradients, No Software Blur Lag) */}
      <div
        className="absolute -top-[10%] left-[15%] w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(191,219,254,0.5)_0%,rgba(191,219,254,0.18)_40%,transparent_70%)] pointer-events-none"
      />

      <div
        className="absolute top-[20%] -right-[5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(221,214,254,0.45)_0%,rgba(221,214,254,0.15)_42%,transparent_70%)] pointer-events-none"
      />

      <div
        className="absolute top-[42%] left-[5%] w-[580px] h-[580px] rounded-full bg-[radial-gradient(circle,rgba(254,215,170,0.4)_0%,rgba(254,215,170,0.12)_40%,transparent_70%)] pointer-events-none"
      />

      <div
        className="absolute -bottom-[10%] right-[15%] w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(199,210,254,0.45)_0%,rgba(199,210,254,0.15)_40%,transparent_70%)] pointer-events-none"
      />

      {/* Subtle Fine Dot Mesh Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px]"
      />
    </div>
  );
};
