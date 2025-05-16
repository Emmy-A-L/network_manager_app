import { useState, useEffect } from "react";
import api from "../utils/axios";

interface Device {
  ip_address: string;
  mac_address: string;
  hostname: string;
  last_seen: string;
}

export default function Dashboard() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchDevices = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/devices/scan/");
      setDevices(response.data.devices);
    } catch (error) {
      setError("Failed to fetch devices");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
    // Set up polling every 300 seconds
    const interval = setInterval(fetchDevices, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Network Devices
          </h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {devices.map((device) => (
                <li key={device.mac_address} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {device.hostname || "Unknown Device"}
                      </h3>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>IP: {device.ip_address}</p>
                        <p>MAC: {device.mac_address}</p>
                        <p>
                          Last seen:{" "}
                          {new Date(device.last_seen).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              {!isLoading && devices.length === 0 && (
                <li className="px-6 py-4 text-center text-gray-500">
                  No devices found
                </li>
              )}
            </ul>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={fetchDevices}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Refresh Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
