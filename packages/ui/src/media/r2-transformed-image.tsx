import type { ImgHTMLAttributes, ReactElement } from "react";
import {
  buildR2ImageSrcSet,
  DEFAULT_R2_IMAGE_SIZES,
  type R2ImageConfig,
} from "./r2-image-transformations";

interface R2TransformedImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "srcSet" | "sizes" | "loading"
> {
  readonly alt: string;
  readonly config: R2ImageConfig;
  readonly fill?: boolean;
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly src: string;
}

const fillStyle = {
  height: "100%",
  inset: 0,
  position: "absolute",
  width: "100%",
} as const;

export function R2TransformedImage({
  alt,
  config,
  fill,
  priority,
  sizes,
  src,
  style,
  ...props
}: R2TransformedImageProps): ReactElement {
  const loadingProps =
    priority === true
      ? { fetchPriority: "high" as const }
      : { loading: "lazy" as const };
  const imageStyle = fill === true ? { ...fillStyle, ...style } : style;

  return (
    <img
      {...props}
      {...loadingProps}
      alt={alt}
      sizes={sizes ?? DEFAULT_R2_IMAGE_SIZES}
      src={src}
      srcSet={buildR2ImageSrcSet(src, config)}
      style={imageStyle}
    />
  );
}
