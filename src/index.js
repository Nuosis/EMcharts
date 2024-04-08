import Chart from 'chart.js/auto';
import data from './data.json';

const colors = [
  // Base tones
  '#6495ED', // Cornflower Blue
  '#90EE90', // Light Green
  '#FFD700', // Gold (Yellow tone)
  '#FFA500', // Orange
  '#FF4500', // OrangeRed (Red tone)
  '#DA70D6', // Orchid (Purple tone)
  // Lighter variants
  '#87CEFA', // Light Sky Blue
  '#98FB98', // Pale Green
  '#FFFACD', // Lemon Chiffon (Light Yellow)
  '#FFDAB9', // Peach Puff (Light Orange)
  '#FFB6C1', // Light Pink (as light red)
  '#DDA0DD', // Plum (Light Purple)
  // Darker variants
  '#4169E1', // Royal Blue
  '#3CB371', // Medium Sea Green
  '#FFD700', // Gold, darker can be tricky without going brown or olive, kept the same for balance
  '#FF8C00', // Dark Orange
  '#DC143C', // Crimson (Dark Red)
  '#800080'  // Purple
];

const borderColors = [
  // Complementary for base tones
  '#4169E1', // Royal Blue
  '#3CB371', // Medium Sea Green
  '#FFD700', // Gold, used as its own border for continuity
  '#FF8C00', // Dark Orange
  '#DC143C', // Crimson
  '#800080', // Purple
  // Complementary for lighter variants
  '#4682B4', // Steel Blue
  '#6B8E23', // Olive Drab
  '#DAA520', // Golden Rod
  '#E9967A', // Dark Salmon
  '#DB7093', // Pale Violet Red
  '#9932CC', // Dark Orchid
  // Complementary for darker variants
  '#B0C4DE', // Light Steel Blue
  '#98FB98', // Pale Green
  '#FFFACD', // Lemon Chiffon
  '#FFDAB9', // Peach Puff
  '#FFB6C1', // Light Pink
  '#DDA0DD', // Plum
];


window.renderChart = (json) => {
  obj = JSON.parse(json)
  const chartData = obj.data;
  const chartType = obj.type.toLowerCase();
  const chartValueField = obj.valueField
  const chartValueLable = obj.valueLable
  const chartTitle = obj.title
  const labels = Object.keys(chartData);
  const values = labels.map(type => chartData[type][chartValueField]);

  const ctx = document.getElementById('myChart')?.getContext('2d');
  if (!ctx) {
    console.error('Chart element not found!');
    return;
  }

  new Chart(ctx, {
    type: chartType.toLowerCase(),
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: labels.map((_, index) => colors[index % colors.length]),
        borderColor: labels.map((_, index) => borderColors[index % borderColors.length]),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              // Simply return the value with 'hours' appended
              return context.raw + " " + chartValueLable;
            }
          }
        },
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: chartTitle
        }
      }
    },
  });
} 

const type = "pie"
const valueField = "totalBurdenV2"
const valueLable = "CAD"
const title = "Total Hours by Burden"
const chartObj= {data,type,valueField,valueLable,title}
renderChart(JSON.stringify(chartObj))