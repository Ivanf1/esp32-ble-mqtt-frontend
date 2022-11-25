import { useEffect, useRef, useState } from "react";
import AnalogRead from "./components/AnalogRead";
import DeviceInfo from "./components/DeviceInfo";
import BLEService from "./services/BLEService";

function App() {
  const [currentDevice, setCurrentDevice] = useState<BluetoothDevice | null>(null);
  const connectionButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = async () => {
    if (currentDevice) {
      await BLEService.disconnect(currentDevice);
      setCurrentDevice(null);
    } else {
      const device = await BLEService.connect();
      setCurrentDevice(device);
    }
  };

  useEffect(() => {
    if (connectionButtonRef.current) {
      connectionButtonRef.current.style.background = currentDevice ? "#e3170a" : "#0c57f7";
    }
  }, [currentDevice]);

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-center">ESP32 BLE Test</h1>
      <div className="m-auto w-full flex flex-col gap-8">
        <DeviceInfo device={currentDevice} />
        <AnalogRead device={currentDevice} />
        <div>
          <button
            onClick={handleClick}
            ref={connectionButtonRef}
            className="mt-4 px-8 py-2 rounded-md text-white"
          >
            {currentDevice ? "disconnect" : "connect"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
