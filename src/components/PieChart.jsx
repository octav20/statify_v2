// PieChart.jsx
import { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels, data }) => {
  console.log('Labels:', labels);
  console.log('Data:', data);

  // Validación básica
  if (!labels || !data || labels.length === 0 || data.length === 0) {
    return <p>No hay datos disponibles</p>;
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Distribución (%)',
        data,
  backgroundColor: [
  '#1DB954', // Spotify Green (vibrante)
  '#FF4C4C', // Rojo fuerte
  '#3A86FF', // Azul vivo
  '#FF9F1C', // Naranja fuerte
  '#8338EC', // Violeta eléctrico
  '#FF006E', // Rosa brillante
  '#00F5D4', // Aqua neón
  '#FB5607', // Naranja intenso
  '#9B5DE5', // Morado Spotify alternativo
  '#00BBF9'  // Azul neón
]
,

        hoverOffset: 10
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.label}: ${ctx.raw.toFixed(2)}%`
        }
      }
    }
  };

  // Forzamos re-render después de montar
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100); // Pequeño delay para asegurar renderizado

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className=" w-sm h-full">
      <Pie data={chartData} options={options}  />
    </div>
  );
};

export default PieChart;