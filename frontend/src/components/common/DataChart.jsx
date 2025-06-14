import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DataChart = ({ data, type = 'bar', options = {}, height = 400 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  
  useEffect(() => {
    if (!chartRef.current || !data) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    
    // Default options with dark theme
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleColor: 'rgba(255, 255, 255, 0.9)',
          bodyColor: 'rgba(255, 255, 255, 0.7)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      }
    };
    
    // Merge default options with provided options
    const mergedOptions = {
      ...defaultOptions,
      ...options,
    };
    
    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options: mergedOptions
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, type, options]);

  if (!data) {
    return (
      <div className="flex items-center justify-center p-6 bg-slate-800 rounded-lg" style={{ height }}>
        <p className="text-gray-400">No data available for visualization</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg" style={{ height }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DataChart;