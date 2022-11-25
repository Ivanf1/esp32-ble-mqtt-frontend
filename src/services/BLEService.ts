const connect = async () => {
  try {
    console.log("Requesting any Bluetooth Device...");
    const device = await navigator.bluetooth.requestDevice({
      optionalServices: ["device_information", 0x00ff],
      filters: [{ name: "ESP_GATTS_DEMO" }],
    });

    return device;
  } catch (error) {
    console.log("Argh! " + error);
    return null;
  }
};

const disconnect = async (device: BluetoothDevice) => {
  if (device.gatt) {
    device.gatt.disconnect();
  }
};

const BLEService = {
  connect,
  disconnect,
};

export default BLEService;
