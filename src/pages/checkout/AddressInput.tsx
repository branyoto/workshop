import { useEffect, useRef, useState } from 'react';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  id?: string;
  placeholder?: string;
  required?: boolean;
  'aria-describedby'?: string;
}

declare global {
  interface Window {
    google?: {
      maps?: {
        places?: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts: object,
          ) => { addListener: (event: string, cb: () => void) => void; getPlace: () => { formatted_address?: string } };
        };
      };
    };
  }
}

export function AddressInput({ value, onChange, onBlur, id, placeholder, required, 'aria-describedby': ariaDescribedBy }: Readonly<AddressInputProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mapsAvailable, setMapsAvailable] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
    if (!apiKey) return;

    // Load Google Maps SDK if not already loaded
    if (!window.google?.maps?.places) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = () => initAutocomplete();
      script.onerror = () => setMapsAvailable(false);
      document.head.appendChild(script);
    } else {
      initAutocomplete();
    }

    function initAutocomplete() {
      if (!inputRef.current || !window.google?.maps?.places) return;
      setMapsAvailable(true);
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'fr' },
        fields: ['formatted_address'],
        types: ['address'],
      });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onChange(place.formatted_address);
        }
      });
    }
  }, [onChange]);

  return (
    <textarea
      ref={inputRef as unknown as React.RefObject<HTMLTextAreaElement>}
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      aria-describedby={ariaDescribedBy}
      rows={3}
      className="w-full rounded-lg border border-neutral/50 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
    />
  );
}

