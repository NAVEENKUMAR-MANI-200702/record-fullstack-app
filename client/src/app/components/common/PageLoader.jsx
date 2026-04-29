import React from 'react';

const PageLoader = () => {
  const ballColor = "bg-red-500"; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
      <div className="flex items-center justify-between w-[120px]">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`w-5 h-5 rounded-full ${ballColor} animate-pulse`}
            style={{
              // Adding the staggered delay from your SCSS
              animationDelay: `${index * 0.2}s`,
              animationDuration: '0.8s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PageLoader;