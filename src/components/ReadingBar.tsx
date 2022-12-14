import { useEffect, useRef } from "react";

interface Props {
  value: number;
}

const scale = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const ReadingBar = ({ value }: Props) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  let scaledValue = scale(value, 0, 4095, 0, 100);

  useEffect(() => {
    if (barRef.current) {
      let bgColor = "";
      if (scaledValue >= 0 && scaledValue <= 65) {
        bgColor = "#43f70c";
      } else if (scaledValue > 65 && scaledValue < 85) {
        bgColor = "#fcba04";
      } else {
        bgColor = "#e3170a";
      }

      barRef.current.style.background = bgColor;
      barRef.current.style.width = `${scaledValue}%`;
    }
  }, [value]);

  return <div className="rounded-xl" ref={barRef}></div>;
};

export default ReadingBar;
