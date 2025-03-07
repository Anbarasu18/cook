import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  suggestion?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  suggestion = "Try searching for something else like 'chicken', 'pasta', or 'curry'."
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-amber-100 p-4 rounded-full mb-4">
        <Search className="text-amber-600" size={32} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{message}</h3>
      <p className="text-gray-600 max-w-md">{suggestion}</p>
    </div>
  );
};

export default EmptyState;