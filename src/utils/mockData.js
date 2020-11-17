
export const emptyData = {
    ch0: {
        name: "",
        data: []
    },
    ch1: {
        name: "",
        data: []
    },
    ch2: {
        name: "",
        data: []
    },
    ch3: {
        name: "",
        data: []
    }
};

export const chartOptions = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Electrical Activity"
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time"
          },
          ticks: {
            max: 300,
            min: -300
          }
        }
      ]
    },
    elements: {
        line: {
            borderColor: 'rgba( 128 , 128, 128)',
            fill: false
        },
        point: {
            radius: 0
        }
    },
    animation: {
        duration: 0
    },
    title: {
      display: true,
      text: "Signal"
    },
    responsive: true,
    tooltips: { enabled: false },
    legend: { display: false }
  };

