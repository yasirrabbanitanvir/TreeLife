import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';

function MonitorSection({ devices }) {
  const [controls, setControls] = useState({});

  const toggleControl = (id, controlType) => {
    setControls((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [controlType]: !prev[id]?.[controlType],
      },
    }));
  };

  const getChartConfig = (value, chartType) => ({
    series: [value],
    chart: {
      type: chartType,
      width: '100%',
      height: '100%',
      toolbar: {
        show: false,
      },
    },
    title: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: chartType === 'pie' ? ['#FF5733'] : ['#3498DB'],
    legend: {
      show: false,
    },
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Monitor Panel</h2>

      {devices.length > 0 ? (
        <div>
          {devices.map((device, index) => (
            <div key={index} className="p-4 mb-4 bg-gray-100 rounded shadow-md">
              <h3 className="text-lg font-bold text-gray-800">{device.treeName}</h3>
              <p className="text-sm text-gray-600">NodeMCU: {device.nodeMCUName}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="flex flex-col items-center">
                  <ApexCharts
                    options={getChartConfig((20 + Math.random() * 10).toFixed(1), 'pie')}
                    series={[20 + Math.random() * 10]}
                    type="pie"
                    width={100}
                    height={100}
                  />
                  <p className="text-center text-sm mt-2">Temperature</p>
                </div>
                <div className="flex flex-col items-center">
                  <ApexCharts
                    options={getChartConfig(Math.random() * 100, 'pie')}
                    series={[Math.random() * 100]}
                    type="pie"
                    width={100}
                    height={100}
                  />
                  <p className="text-center text-sm mt-2">Moisture</p>
                </div>
                <div className="flex flex-col items-center">
                  <ApexCharts
                    options={getChartConfig(900 + Math.random() * 100, 'pie')}
                    series={[900 + Math.random() * 100]}
                    type="pie"
                    width={100}
                    height={100}
                  />
                  <p className="text-center text-sm mt-2">Pressure</p>
                </div>
                <div className="flex flex-col items-center">
                  <ApexCharts
                    options={getChartConfig(Math.random() * 100, 'pie')}
                    series={[Math.random() * 100]}
                    type="pie"
                    width={100}
                    height={100}
                  />
                  <p className="text-center text-sm mt-2">Humidity</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between mt-4">
                <button
                  onClick={() => toggleControl(device.nodeMCUId, 'water')}
                  className={`px-4 py-2 mr-4 mb-2 rounded w-full sm:w-auto ${
                    controls[device.nodeMCUId]?.water
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  {controls[device.nodeMCUId]?.water ? 'Stop Water' : 'Start Water'}
                </button>
                <button
                  onClick={() => toggleControl(device.nodeMCUId, 'light')}
                  className={`px-4 py-2 rounded w-full sm:w-auto ${
                    controls[device.nodeMCUId]?.light
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  {controls[device.nodeMCUId]?.light ? 'Turn Off Light' : 'Turn On Light'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No devices connected. Add devices in the Control Panel to monitor them.</p>
      )}
    </div>
  );
}

export default MonitorSection;