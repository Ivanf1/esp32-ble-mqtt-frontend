import { useCallback, useEffect, useState } from "react";
import ReadingBar from "./ReadingBar";

interface AnalogReadProps {
  device: BluetoothDevice | null;
}

const swap32 = (val: number) => {
  return (
    ((val & 0xff) << 24) | ((val & 0xff00) << 8) | ((val >> 8) & 0xff00) | ((val >> 24) & 0xff)
  );
};

const AnalogRead = ({ device }: AnalogReadProps) => {
  const [readingValue, setReadingValue] = useState<number>(0);

  const handleNotifications = useCallback((e: Event) => {
    if (e.target) {
      let value = (e.target as BluetoothRemoteGATTCharacteristic).value;
      if (value !== undefined) {
        let intValue = swap32(value.getUint32(0));
        setReadingValue(intValue);
      }
    }
  }, []);

  useEffect(() => {
    const subscribeToDeviceAnalogReading = async (device: BluetoothDevice) => {
      if (device.gatt) {
        const server = await device.gatt.connect();

        const analogReadingService = await server.getPrimaryService(0x00ff);

        const analogCharacteristic = await analogReadingService.getCharacteristic(0xff01);

        analogCharacteristic.addEventListener("characteristicvaluechanged", handleNotifications);
        analogCharacteristic.startNotifications();
        console.log("-------------- Notifications started");
      }
    };

    if (device) {
      subscribeToDeviceAnalogReading(device);
    }
  }, [device]);

  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold">Analog reading</h3>
      <AnalogReadDisplay value={readingValue} />
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
