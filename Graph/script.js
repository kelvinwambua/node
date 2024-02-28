document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("myChart").getContext("2d");

  // Define parameters
  const fileUrl = "Source_of_mosquito_nets.csv";
  const groupBy="Value"; // Column to group by
  const xAxisLabel = "Value"; // Label for x-axis
  const yAxisLabel = "Proportion"; // Label for y-axis
  const filterBy = "Background characteristics"; // Column to filter by
  const filterValues="Wealth quintile,Endemicity zone,Residence"; // Filter value

  fetch(
    `/data?fileUrl=${fileUrl}&groupBy=${groupBy}&xAxisLabel=${xAxisLabel}&yAxisLabel=${yAxisLabel}&filterBy=${filterBy}&filterValues=${filterValues}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((groupedData) => {
      const values = Object.keys(groupedData); // Get values
      const categories = [
        ...new Set(
          Object.values(groupedData).flatMap((obj) => Object.keys(obj))
        ),
      ]; // Get unique categories

      const getRandomColor = () => {
        return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
      };

      const datasets = categories.map((category, index) => {
        return {
          label: category,
          data: values.map(
            (value) => parseFloat(groupedData[value][category]) || 0
          ), // Map proportion values for each value
          backgroundColor: getRandomColor(), // Generate random color
          borderColor: getRandomColor().replace("0.5", "1"), // Generate random border color
          borderWidth: 1,
        };
      });

      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: values, // Values on x-axis
          datasets: datasets,
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: fileUrl,
              font: {
                size: 18,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: yAxisLabel,
                font: {
                  size: 14,
                },
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
            x: {
              title: {
                display: true,
                text: groupBy,
                font: {
                  size: 14,
                },
              },
              ticks: {
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
