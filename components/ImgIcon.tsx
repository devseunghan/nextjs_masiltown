type ImgIconProps = {
  src: string;
  width: string;
  height: string;
}

export default function ImgIcon({ src, width, height }: ImgIconProps) {
  return (
    <img src={`/img/image/${src}`} alt={src} width={width} height={height} />
  );
};
