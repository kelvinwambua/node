const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3000;

class Graph {
  groupedDataByColumn(data, position) {
    const categories = [];
    const colNames = Object.keys(data[0]);

    data.forEach((item) => {
      if (!categories.includes(item[colNames[position]])) {
        categories.push(item[colNames[position]]);
      }
    });

    return categories;
  }

  getVariablesandLabels({ data, colNames, vPosition, lPosition }) {
    const labels = [];
    const variables = [];

    data.forEach((item) => {
      if (!labels.includes(item[colNames[lPosition]])) {
        labels.push(item[colNames[lPosition]]);
      }
      if (vPosition && !variables.includes(item[colNames[vPosition]])) {
        variables.push(item[colNames[vPosition]]);
      }
    });

    return { labels, variables };
  }

  generateDataStructure({
    data,
    labels,
    variables,
    varPosition,
    colNames,
  }) {
    const sets = [];
    const colorArray = this.generateColorArray(variables.length);

    // Find the index of the 'Proportion' column, checking both cases
    let valueIndex = colNames.indexOf('Proportion');
    if (valueIndex === -1) {
      valueIndex = colNames.indexOf('proportion');
    }

    if (variables.length) {
      variables.forEach((variable, index) => {
        const funnel = data.filter(
          (item) => item[colNames[varPosition]] === variable
        );
        sets.push({
          backgroundColor: colorArray[index],
          borderWidth: 3,
          fill: false,
          borderColor: colorArray[index],
          tension: 0.1,
          label: variable,
          data: funnel.map((x) => parseFloat(x[colNames[valueIndex]])), // Using the found index for the 'Proportion' column
        });
      });
    } else {
      sets.push({
        backgroundColor: colorArray,
        borderWidth: 3,
        fill: false,
        borderColor: colorArray,
        tension: 0.1,
        data: data.map((x) => parseFloat(x[colNames[valueIndex]])), // Using the found index for the 'Proportion' column
      });
    }
    return {
      axis: 'y',
      labels,
      datasets: sets,
    };
  }

  generateColorArray(numColors) {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = this.generateRandomColor();
      colors.push(color);
    }
    return colors;
  }

  generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  singleGroup(groupSection, dataGraphs) {
    groupSection.groups.forEach((group) => {
      const valueIndex = groupSection.colNames.includes('Proportion')
        ? groupSection.colNames.indexOf('Proportion')
        : groupSection.colNames.indexOf('proportion');

      let varP = 1;
      if (varP === valueIndex) {
        varP = varP + 1;
        if (groupSection.colNames[varP] === 'hckeys') {
          varP = 0;
        }
      }
      const groupKey = Object.keys(group);
      const labelsVariables = this.getVariablesandLabels({
        data: group[groupKey[0]],
        colNames: groupSection.colNames,
        vPosition: varP,
        lPosition: 0,
      });
      const ruralData = this.generateDataStructure({
        data: group[groupKey[0]],
        ...labelsVariables,
        varPosition: varP,
        colNames: groupSection.colNames,
      });
      dataGraphs.push({
        data: ruralData,
        title: groupKey[0],
      });
    });
    return dataGraphs;
  }

  twoSubGroups(groupSection, dataGraphs, divider) {
    const divideIndex = groupSection.colNames.indexOf(divider);
    groupSection.groups.forEach((group) => {
      const groupKey = Object.keys(group);
      const subGroups = this.groupDataByColumn({
        data: group[groupKey[0]],
        position: divideIndex,
      });
      const collectSubs = [];
      subGroups.groups.forEach((subGroup) => {
        const valueIndex = subGroups.colNames.includes('Proportion')
          ? subGroups.colNames.indexOf('Proportion')
          : subGroups.colNames.indexOf('proportion');

        let varP = 1;
        if (varP === valueIndex) {
          varP = varP + 1;
          if (subGroups.colNames[varP] === 'hckeys') {
            varP = 0;
          }
        }
        const subGroupKey = Object.keys(subGroup);
        const labelsVariables = this.getVariablesandLabels({
          data: subGroup[subGroupKey[0]],
          colNames: subGroups.colNames,
          vPosition: varP,
          lPosition: 0,
        });
        const ruralData = this.generateDataStructure({
          data: subGroup[subGroupKey[0]],
          ...labelsVariables,
          varPosition: varP,
          colNames: subGroups.colNames,
        });
        collectSubs.push({
          data: ruralData,
          title: subGroupKey[0],
        });
      });
      dataGraphs.push({
        data: collectSubs,
        title: groupKey[0],
      });
    });
    return dataGraphs;
  }

  groupDataByColumn({ data, position }) {
    const categories = [];
    const colNames = Object.keys(data[0]);
    const groups = [];

    data.forEach((item) => {
      if (!categories.includes(item[colNames[position]])) {
        categories.push(item[colNames[position]]);
      }
    });

    categories.forEach((groupName) => {
      groups.push({
        [groupName.split('').join('')]: data
          .filter((item) => item[colNames[position]] === groupName)
          .map((mapItem) => {
            const { [colNames[position]]: _, ...minItem } = mapItem;
            return minItem;
          }),
      });
    });

    return { groups, colNames };
  }
}

const graph = new Graph();

app.get('/data', (req, res) => {
  const data = [];
  fs.createReadStream('employment_and_cash_earnings.csv')
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', () => {
      const categories = graph.groupedDataByColumn(data, 0);
      const columnName = Object.keys(data[0]);
      const groups = [];

      data.forEach((item) => {
        if (!categories.includes(item[columnName[0]])) {
          categories.push(item[columnName[0]]);
        }
      });

      categories.forEach((groupName) => {
        groups.push({
          [groupName.split('').join('')]: data
            .filter((item) => item[columnName[0]] === groupName)
            .map((mapItem) => {
              const { [columnName[0]]: _, ...minItem } = mapItem;
              return minItem;
            }),
        });
      });

      const index = columnName.indexOf(columnName[0]);
      columnName.splice(index, 1);

      const responseData = { data, groups, columnName };

      const { labels, variables } = graph.getVariablesandLabels({
        data,
        colNames: columnName,
        vPosition: 1,
        lPosition: 0,
      });

      const dataStructure = graph.generateDataStructure({
        data,
        labels,
        variables,
        varPosition: 1,
        colNames: columnName,
      });

      res.json({ responseData, dataStructure });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
