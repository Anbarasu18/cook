import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

const TagInput: React.FC<TagInputProps> = ({ 
  tags, 
  onChange, 
  placeholder = 'Add tags...',
  suggestions = []
}) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input
  useEffect(() => {
    if (input.trim()) {
      const filtered = suggestions.filter(
        suggestion => 
          suggestion.toLowerCase().includes(input.toLowerCase()) && 
          !tags.includes(suggestion)
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [input, suggestions, tags]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onChange([...tags, trimmedTag]);
    }
    setInput('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-transparent">
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm"
          >
            <span>{tag}</span>
            <button 
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-amber-800 hover:text-amber-900"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => input && setShowSuggestions(filteredSuggestions.length > 0)}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="w-full border-none focus:outline-none focus:ring-0 p-1 bg-transparent"
          />
          {showSuggestions && (
            <div 
              ref={suggestionsRef}
              className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-amber-50 cursor-pointer flex items-center"
                >
                  <Plus size={14} className="mr-2 text-amber-600" />
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Press Enter to add a tag, Backspace to remove the last tag
      </p>
    </div>
  );
};

export default TagInput;