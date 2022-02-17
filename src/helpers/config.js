export const mainChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
        text: 'BTC/USD',
      },
    },
    layout: {
        padding: {
            top: 30,
            bottom: 30,
            right: 60,
            left: 30
        } 
    },
    scales: {
        x: {
          grid: {
            borderColor: '#1f1f1f'
          },
          ticks: {
            maxTicksLimit: 8,
          },
          
        },
        y: {
          grid: {
            borderColor: '#1f1f1f'
          }
        },
    },
    elements: {
        point:{
            radius: 0
        }
    }
};