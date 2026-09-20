'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

type CustomSelectProps = {
  id: string;
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void;
};

const ROW_ESTIMATE = 48;

export function CustomSelect({
  id,
  value,
  options,
  placeholder = 'Select',
  onChange,
}: CustomSelectProps) {
  const uid = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<'down' | 'up'>('down');
  const [activeIndex, setActiveIndex] = useState(-1);

  const selectedIndex = value ? options.indexOf(value) : -1;
  const isPlaceholder = value.trim() === '';

  const optionId = useCallback(
    (index: number) => `${uid}-option-${index}`,
    [uid]
  );

  const computePlacement = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const estimate = Math.min(options.length, 6) * ROW_ESTIMATE + 16;
    setPlacement(estimate > spaceBelow ? 'up' : 'down');
  }, [options.length]);

  const openDropdown = useCallback(() => {
    setOpen(true);
    setActiveIndex(value ? options.indexOf(value) : 0);
    computePlacement();
  }, [computePlacement, options, value]);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const select = useCallback(
    (index: number) => {
      const option = options[index];
      if (option == null) return;
      onChange(option);
      closeDropdown();
      triggerRef.current?.focus();
    },
    [closeDropdown, onChange, options]
  );

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        closeDropdown();
      }
    };
    if (open) {
      document.addEventListener('pointerdown', handlePointerDown);
    }
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open, closeDropdown]);

  useEffect(() => {
    if (!open) return;
    const active = document.getElementById(optionId(activeIndex));
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open, optionId]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDropdown();
      }
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((prev) => (prev <= 0 ? options.length - 1 : prev - 1));
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        select(activeIndex);
        break;
      case 'Escape':
        event.preventDefault();
        closeDropdown();
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className="form-field-select">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        className={[
          'form-field-text form-field-select-trigger w-input',
          isPlaceholder ? 'is-placeholder' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => (open ? closeDropdown() : openDropdown())}
        onKeyDown={handleKeyDown}
      >
        <span className="form-field-select-value">{isPlaceholder ? placeholder : value}</span>
        <svg
          className="form-field-select-chevron"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1 1l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <div
          id={`${id}-listbox`}
          role="listbox"
          aria-label={placeholder}
          className={`form-field-select-panel placement-${placement}`}
        >
          {options.map((option, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={option}
                type="button"
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                className={[
                  'form-field-select-option',
                  index === activeIndex ? 'is-highlight' : '',
                  isSelected ? 'is-selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => select(index)}
              >
                {option}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}