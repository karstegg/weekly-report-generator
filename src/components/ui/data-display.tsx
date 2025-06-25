import React from 'react';

const DataRow = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex justify-between items-center py-1.5 border-b border-gray-100 last:border-b-0 ${className}`}>
    {children}
  </div>
);

export { DataRow };
