const DeviceInfo = () => {
  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold">Device Info</h3>
      <div className="card">
        <DeviceInfoDisplay
          modelNumber="0"
          firmwareRevision="0"
          hardwareRevision="1"
          softwareRevision="1"
          manufacturerName="2"
        />
      </div>
    </div>
  );
};

interface DeviceInfoDisplayProps {
  modelNumber: string;
  firmwareRevision: string;
  hardwareRevision: string;
  softwareRevision: string;
  manufacturerName: string;
}

const DeviceInfoDisplay = ({
  modelNumber,
  firmwareRevision,
  hardwareRevision,
  softwareRevision,
  manufacturerName,
}: DeviceInfoDisplayProps) => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4">
      <span className="ble-info-label">Model Number:</span>
      <span>{modelNumber}</span>
      <span className="ble-info-label">Firmware Revision:</span>
      <span>{firmwareRevision}</span>
      <span className="ble-info-label">Hardware Revision:</span>
      <span>{hardwareRevision}</span>
      <span className="ble-info-label">Software Revision:</span>
      <span>{softwareRevision}</span>
      <span className="ble-info-label">Manufacturer Name:</span>
      <span>{manufacturerName}</span>
    </div>
  );
};

export default DeviceInfo;
