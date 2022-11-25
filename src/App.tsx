import AnalogRead from "./components/AnalogRead";
import DeviceInfo from "./components/DeviceInfo";

function App() {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-center">ESP32 BLE Test</h1>
      <div className="m-auto w-full flex flex-col gap-8">
        <DeviceInfo />
        <AnalogRead value={0} />
      </div>
    </div>
  );
}

export default App;
