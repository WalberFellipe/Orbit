import Image from "next/image";
import sunPng from "@/assets/sun.png";

interface SunProps {
  x: number;
  y: number;
}

const Sun: React.FC<SunProps> = ({ x, y }) => {
  return (
    <Image
      src={sunPng}
      alt="Sun"
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    />
  );
};

export default Sun;
