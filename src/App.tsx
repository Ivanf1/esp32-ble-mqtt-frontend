import { useEffect, useRef, useState } from "react";
import AnalogRead from "./components/AnalogRead";
import DeviceInfo from "./components/DeviceInfo";
import MQTTPanel from "./components/MQTTPanel";
import BLEService from "./services/BLEService";

function App() {
  const [currentDevice, setCurrentDevice] = useState<BluetoothDevice | null>(null);
  const connectionButtonBLERef = useRef<HTMLButtonElement | null>(null);

  const handleBLEButtonClick = async () => {
    if (currentDevice) {
      await BLEService.disconnect(currentDevice);
      setCurrentDevice(null);
    } else {
      const device = await BLEService.connect();
      setCurrentDevice(device);
    }
  };

  useEffect(() => {
    if (connectionButtonBLERef.current) {
      connectionButtonBLERef.current.style.background = currentDevice ? "#e3170a" : "#0c57f7";
    }
  }, [currentDevice]);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-center">ESP32 BLE MQTT Test</h1>
      <div className="flex flex-row gap-8">
        <div className="w-full flex flex-col gap-8">
          <DeviceInfo device={currentDevice} />
          <AnalogRead device={currentDevice} />
          <div className="flex justify-end">
            <button
              onClick={handleBLEButtonClick}
              ref={connectionButtonBLERef}
              className="mt-4 px-8 py-2 rounded-md text-white"
            >
              {currentDevice ? "disconnect" : "connect"}
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <MQTTPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
