const chartOptions = {
  typography: {
    fontFamily: " Montserrat",
  },
  colors: ["#f4a347", "#f4a347", "#a3c388", "#1a99aa", "#103c46", "#88ba01"],
  colorsV2: ["#0D4C92", "#59C1BD", "#7EC384", "#6AA5A9"],
};

const LineChartOptions = {
  chart: {
    type: "spline",
    style: {
      ...chartOptions.typography,
      maxWidth: "100%",
      maxHeight: "500px",
      borderRadius: "20px",
      border: "1px solid #EAEAEA",
      backgroundColor: "#FFFFFF",
    },
  },
  // Other options...

  // Responsive design for different screen sizes
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: "auto", // Define the maximum width for small screens (adjust as needed)
        },
        chartOptions: {
          chart: {
            style: {
              fontSize: "14px", // Adjust font size for small screens
            },
          },
          legend: {
            itemStyle: {
              fontSize: "16px", // Adjust legend item font size for small screens
            },
          },
          // Add more options as needed for small screens
        },
      },
    ],
  },
};

export default LineChartOptions;
