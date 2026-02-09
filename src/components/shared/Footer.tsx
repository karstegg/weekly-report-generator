import React from 'react';

interface FooterProps {
  src: string;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ src, className }) => {
  return (
    <footer 
      className={className || 'absolute bottom-0 left-0 w-full h-32'}
      style={{ zIndex: 10 }}
    >
      <img
        src={src}
        alt="Slide Footer"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          if (e.currentTarget.parentElement) {
            e.currentTarget.parentElement.innerHTML =
              '<div class="w-full h-full bg-gray-800 flex items-center justify-center"><p class="text-white">Footer image failed to load.</p></div>';
          }
        }}
      />
    </footer>
  );
};

export default Footer;