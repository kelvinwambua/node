const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const app = express();
const PORT = 4000;

app.use(express.static(".")); // Serve static files from the root directory

app.get("/data", (req, res) => {
  const { fileUrl, groupBy, xAxisLabel, yAxisLabel, filterBy, filterValues } =
    req.query;

  if (
    !fileUrl ||
    !groupBy ||
    !xAxisLabel ||
    !yAxisLabel ||
    !filterBy ||
    !filterValues
  ) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const results = [];
  fs.createReadStream(fileUrl)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      let filteredData = results;
      if (filterBy && filterValues) {
        const valuesArray = filterValues
          .split(",")
          .map((value) => value.trim()); // Split filter values by commas
        filteredData = results.filter((item) =>
          valuesArray.includes(item[filterBy])
        ); // Filter data based on filter values
      }
      const groupedData = groupData(
        filteredData,
        groupBy,
        xAxisLabel,
        yAxisLabel
      );
      res.json(groupedData);
    });
});

function groupData(data, groupBy, xAxisLabel, yAxisLabel) {
  const groupedData = {};
  data.forEach((item) => {
    const group = item[groupBy];
    if (!groupedData[group]) {
      groupedData[group] = {};
    }
    groupedData[group][item[xAxisLabel]] = item[yAxisLabel];
  });
  return groupedData;
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
