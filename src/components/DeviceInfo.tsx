import { useEffect, useState } from "react";

interface DeviceInfoProps {
  device: BluetoothDevice | null;
}

interface DeviceInfoDisplayProps {
  modelNumber: string;
  firmwareRevision: string;
  hardwareRevision: string;
  softwareRevision: string;
  manufacturerName: string;
}

const DeviceInfo = ({ device }: DeviceInfoProps) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoDisplayProps | null>(null);

  useEffect(() => {
    const getDeviceInfo = async (device: BluetoothDevice) => {
      console.log("Connecting to GATT Server...");
      if (device.gatt) {
        let deviceInfo: DeviceInfoDisplayProps = {
          manufacturerName: "",
          modelNumber: "",
          hardwareRevision: "",
          firmwareRevision: "",
          softwareRevision: "",
        };
        const server = await device.gatt.connect();

        console.log("Getting Device Information Service...");
        const service = await server.getPrimaryService("device_information");

        console.log("Getting Device Information Characteristics...");
        const characteristics = await service.getCharacteristics();

        const decoder = new TextDecoder("utf-8");
        for (const characteristic of characteristics) {
          switch (characteristic.uuid) {
            // @ts-ignore
            case BluetoothUUID.getCharacteristic("manufacturer_name_string"):
              await characteristic.readValue().then((value) => {
                console.log("> Manufacturer Name String: " + decoder.decode(value));
                deviceInfo.manufacturerName = decoder.decode(value).trim();
              });
              break;

            // @ts-ignore
            case BluetoothUUID.getCharacteristic("model_number_string"):
              await characteristic.readValue().then((value) => {
                console.log("> Model Number String: " + decoder.decode(value));
                deviceInfo.modelNumber = decoder.decode(value).trim();
              });
              break;

            // @ts-ignore
            case BluetoothUUID.getCharacteristic("hardware_revision_string"):
              await characteristic.readValue().then((value) => {
                console.log("> Hardware Revision String: " + decoder.decode(value));
                deviceInfo.hardwareRevision = decoder.decode(value).trim();
              });
              break;

            // @ts-ignore
            case BluetoothUUID.getCharacteristic("firmware_revision_string"):
              await characteristic.readValue().then((value) => {
                console.log("> Firmware Revision String: " + decoder.decode(value));
                deviceInfo.firmwareRevision = decoder.decode(value).trim();
              });
              break;

            // @ts-ignore
            case BluetoothUUID.getCharacteristic("software_revision_string"):
              await characteristic.readValue().then((value) => {
                console.log("> Software Revision String: " + decoder.decode(value));
                deviceInfo.softwareRevision = decoder.decode(value).trim();
              });
              break;

            default:
              console.log("> Unknown Characteristic: " + characteristic.uuid);
          }
        }
        setDeviceInfo({ ...deviceInfo });
      }
    };
    if (device) {
      getDeviceInfo(device);
    }
  }, [device]);

  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold">Device Info</h3>
      <div className="card">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <span className="ble-info-label">Model Number:</span>
          <span>{deviceInfo ? deviceInfo.modelNumber : ""}</span>
          <span className="ble-info-label">Firmware Revision:</span>
          <span>{deviceInfo ? deviceInfo.firmwareRevision : ""}</span>
          <span className="ble-info-label">Hardware Revision:</span>
          <span>{deviceInfo ? deviceInfo.hardwareRevision : ""}</span>
          <span className="ble-info-label">Software Revision:</span>
          <span>{deviceInfo ? deviceInfo.softwareRevision : ""}</span>
          <span className="ble-info-label">Manufacturer Name:</span>
          <span>{deviceInfo ? deviceInfo.manufacturerName : ""}</span>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;
