import "lazysizes";

export default function Image({ alt, src, previewSrc, className, ...rest }) {
  return (
    <img
      className={`lazyload blur-up ${className}`}
      alt={alt}
      src={previewSrc ?? src}
      data-srcset={src}
      {...rest}
    />
  );
}

export function TechImage({ name, alt, ...rest }) {
  return (
    <Image
      style={{ width: "30px" }}
      src={require(`../content/assets/tech/${name}?resize&size=30`)}
      className="my-0"
      alt={alt}
      {...rest}
    />
  );
}

// for some reason I can't make the resize a variable in the component????
export function TechImageSmall({ name, alt, ...rest }) {
  return (
    <Image
      style={{ width: "25px" }}
      src={require(`../content/assets/tech/${name}?resize&size=25`)}
      className="my-0"
      alt={alt}
      {...rest}
    />
  );
}
