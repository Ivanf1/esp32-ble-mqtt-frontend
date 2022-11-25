import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import mqtt from "mqtt/dist/mqtt";
import analogReadSubject, { AnalogReadObserver } from "../subjects/AnalogReadSubject";

interface MQTTConnectionParameters {
  host: string;
  port: string;
  username: string;
  password: string;
  topic: string;
}

const MQTTPanel = () => {
  const [mqttClient, setMqttClient] = useState<mqtt.Client | null>(null);
  const connectionButtonMqttRef = useRef<HTMLButtonElement | null>(null);
  const [mqttTopic, setMqttTopic] = useState("");

  const initialMQTTConnectionParametersValues: MQTTConnectionParameters = {
    host: "",
    port: "",
    username: "",
    password: "",
    topic: "",
  };

  const onReadingUpdated: AnalogReadObserver = (reading: number) => {
    if (mqttClient && mqttClient.connected) {
      mqttClient.publish(mqttTopic, reading.toString());
    }
  };

  useEffect(() => {
    if (connectionButtonMqttRef.current) {
      connectionButtonMqttRef.current.style.background = mqttClient ? "#e3170a" : "#0c57f7";
    }
    if (mqttClient) {
      analogReadSubject.attach(onReadingUpdated);
    } else {
      analogReadSubject.detach(onReadingUpdated);
    }
  }, [mqttClient]);

  return (
    <>
      <div>
        <h3 className="mb-2 text-xl font-semibold">MQTT Connection parameters</h3>
        <div>
          <Formik
            initialValues={initialMQTTConnectionParametersValues}
            validate={(values: MQTTConnectionParameters) => {
              const errors: Partial<MQTTConnectionParameters> = {};
              if (values.host.length === 0) {
                errors.host = "Host not valid";
              }
              if (values.port.length === 0) {
                errors.port = "Port not valid";
              }
              if (values.username.length === 0) {
                errors.username = "Username not valid";
              }
              if (values.password.length === 0) {
                errors.password = "Password not valid";
              }
              if (values.topic.length === 0) {
                errors.topic = "Topic not valid";
              }
              return errors;
            }}
            onSubmit={(values) => {
              if (mqttClient) {
                mqttClient.end();
                setMqttClient(null);
                return;
              }

              let client: mqtt.MqttClient = mqtt.connect({
                protocol: "ws",
                host: values.host,
                port: Number(values.port),
                username: values.username,
                password: values.password,
              });
              setMqttClient(client);
              setMqttTopic(values.topic);
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-[auto_1fr] gap-4 card">
                  <label className="ble-info-label">Host:</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.host}
                    id="host"
                  />
                  <label className="ble-info-label">Port:</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.port}
                    id="port"
                  />
                  <label className="ble-info-label">Username:</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    id="username"
                  />
                  <label className="ble-info-label">Password:</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    id="password"
                  />
                  <label className="ble-info-label">Topic:</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.topic}
                    id="topic"
                  />
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    ref={connectionButtonMqttRef}
                    type="submit"
                    className="mt-4 px-8 py-2 rounded-md text-white"
                  >
                    {mqttClient ? "disconnect" : "connect"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default MQTTPanel;
