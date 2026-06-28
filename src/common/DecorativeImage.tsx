import { Image, type ImageProps } from './Image';

export function DecorativeImage(props: Readonly<ImageProps>) {
  return <Image alt="" aria-hidden="true" {...props} />;
}
