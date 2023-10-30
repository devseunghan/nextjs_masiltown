type SvgIconProps = {
  src: string;
  width: string;
  height: string;
}

export default function SvgIcon({ src, width, height }: SvgIconProps) {
  return (
    <img src={`/img/svg/${src}`} alt={src} width={width} height={height} />
  );
};
