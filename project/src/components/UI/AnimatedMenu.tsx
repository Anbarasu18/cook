import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

interface AnimatedMenuProps {
  items: MenuItem[];
  position?: 'left' | 'right';
  color?: 'blue' | 'pink' | 'green' | 'orange' | 'purple';
}

const AnimatedMenu: React.FC<AnimatedMenuProps> = ({
  items,
  position = 'right',
  color = 'blue',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  
  // Color variants
  const colorVariants = {
    blue: {
      button: 'bg-blue-500 hover:bg-blue-600',
      menu: 'bg-blue-50 border-blue-200',
      item: 'hover:bg-blue-100 text-blue-800',
      active: 'bg-blue-200',
    },
    pink: {
      button: 'bg-pink-500 hover:bg-pink-600',
      menu: 'bg-pink-50 border-pink-200',
      item: 'hover:bg-pink-100 text-pink-800',
      active: 'bg-pink-200',
    },
    green: {
      button: 'bg-emerald-500 hover:bg-emerald-600',
      menu: 'bg-emerald-50 border-emerald-200',
      item: 'hover:bg-emerald-100 text-emerald-800',
      active: 'bg-emerald-200',
    },
    orange: {
      button: 'bg-amber-500 hover:bg-amber-600',
      menu: 'bg-amber-50 border-amber-200',
      item: 'hover:bg-amber-100 text-amber-800',
      active: 'bg-amber-200',
    },
    purple: {
      button: 'bg-purple-500 hover:bg-purple-600',
      menu: 'bg-purple-50 border-purple-200',
      item: 'hover:bg-purple-100 text-purple-800',
      active: 'bg-purple-200',
    },
  };
  
  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle menu animation
  useEffect(() => {
    if (!menuRef.current || !itemsRef.current) return;
    
    // Clear any existing animations
    if (timeline.current) {
      timeline.current.kill();
    }
    
    // Create a new timeline
    timeline.current = gsap.timeline();
    
    if (isOpen) {
      // Menu opening animation
      timeline.current
        .to(menuRef.current, {
          width: 'auto',
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        })
        .fromTo(
          itemsRef.current.children,
          {
            x: position === 'right' ? 20 : -20,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.3,
            ease: 'power2.out',
          },
          '-=0.2'
        );
    } else {
      // Menu closing animation
      timeline.current
        .to(itemsRef.current.children, {
          x: position === 'right' ? 20 : -20,
          opacity: 0,
          stagger: 0.03,
          duration: 0.2,
          ease: 'power2.in',
        })
        .to(
          menuRef.current,
          {
            width: 0,
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power3.in',
          },
          '-=0.1'
        );
    }
  }, [isOpen, position]);
  
  return (
    <div className="relative">
      {/* Menu button */}
      <button
        onClick={toggleMenu}
        className={`
          rounded-full p-3 text-white shadow-lg transition-all
          ${colorVariants[color].button}
        `}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Menu container */}
      <div
        ref={menuRef}
        className={`
          absolute z-20 mt-2 overflow-hidden rounded-xl border shadow-lg
          ${position === 'right' ? 'right-0' : 'left-0'}
          ${colorVariants[color].menu}
          ${!isOpen && 'opacity-0 h-0 w-0'}
        `}
        style={{
          transformOrigin: position === 'right' ? 'top right' : 'top left',
        }}
      >
        {/* Menu items */}
        <div ref={itemsRef} className="py-2">
          {items.map((item, index) => (
            <div
              key={index}
              className={`
                flex cursor-pointer items-center px-4 py-2 transition-colors whitespace-nowrap
                ${colorVariants[color].item}
              `}
              onClick={() => {
                item.onClick && item.onClick();
                setIsOpen(false);
              }}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Backdrop for closing menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AnimatedMenu;