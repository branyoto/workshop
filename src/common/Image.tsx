import { type ImgHTMLAttributes, type SyntheticEvent, useEffect, useState } from 'react';
import clsx from 'clsx';

const PLACEHOLDER_SRC = '/placeholder.png';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & { square?: boolean; fullWidth?: boolean };

export function Image({ src, onError, alt, className, square = true, fullWidth = true, ...props }: Readonly<ImageProps>) {
  const [hasError, setHasError] = useState(false);
  const currentSrc = hasError ? PLACEHOLDER_SRC : src;

  useEffect(() => {
    setHasError(false);
  }, [src]);

  function handleError(event: SyntheticEvent<HTMLImageElement, Event>) {
    onError?.(event);
    if (currentSrc !== PLACEHOLDER_SRC) setHasError(true);
  }

  return (
    <img
      alt={alt}
      src={currentSrc}
      onError={handleError}
      loading="lazy"
      className={clsx('rounded-md object-cover select-none', square && 'aspect-square', fullWidth && 'w-full', className)}
      {...props}
    />
  );
}
