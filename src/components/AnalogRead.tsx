import ReadingBar from "./ReadingBar";

interface AnalogReadProps {
  value: number;
}

const AnalogRead = ({ value }: AnalogReadProps) => {
  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold">Analog reading</h3>
      <AnalogReadDisplay value={value} />
    </div>
  );
};

interface AnalogReadDisplayProps {
  value: number;
}

const AnalogReadDisplay = ({ value }: AnalogReadDisplayProps) => {
  return (
    <div className="flex gap-4 card">
      <span className="ble-info-label">Value:</span>
      <span>{value}</span>
      <ReadingBar value={value} />
    </div>
  );
};

export default AnalogRead;
