class GraphClass {
    groupDataByColumn({ data, position }) {
      const groups = []
      const categories = []
      const colNames = Object.keys(data[0])
      // collect unique values
      data.forEach((item) => {
        if (!categories.includes(item[colNames[position]])) {
          categories.push(item[colNames[position]])
        }
      })
      categories.forEach((name) => {
        // collect items based on the categories
        groups.push({
          [name.replace(' ', '')]: data
            .filter((item) => item[colNames[position]] === name)
            .map((mapItem) => {
              const { [colNames[position]]: _, ...minItem } = mapItem
              return minItem
            })
        })
      })
      const index = colNames.indexOf(colNames[position])
      colNames.splice(index, 1)
      return { data, groups, colNames }
    }
   
    getVariablesandLabels({ data, colNames, vPosition, lPosition }) {
      const labels = []
      const variables = []
   
      data.forEach((item) => {
        if (!labels.includes(item[colNames[lPosition]])) {
          labels.push(item[colNames[lPosition]])
        }
        if (vPosition && !variables.includes(item[colNames[vPosition]])) {
          variables.push(item[colNames[vPosition]])
        }
      })
   
      return { labels, variables }
    }
   
    generateDataStructure({
      data,
      labels,
      variables,
      varPosition,
      valPosition,
      colNames
    }) {
      const sets = []
      variables.forEach((variable, index) => {
        const funnel = data.filter(
          (item) => item[colNames[varPosition]] === variable
        )
        sets.push({
          backgroundColor: colorArray[index],
          borderWidth: 3,
          fill: false,
          borderColor: colorArray[index],
          tension: 0.1,
          label: variable,
          data: funnel.flatMap((x) =>
            String([x[colNames[valPosition]]]).replace(',', '')
          )
        })
      })
      return {
        axis: 'y',
        labels,
        datasets: sets
      }
    }
   }