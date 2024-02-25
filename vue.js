const dataGraphs = []
    const barGraph = new GraphClass()
    const data = await this.$content('csv/' + 'Sample_Survey_Data').fetch()
    const genderGroup = barGraph.groupDataByColumn({
      data: data.body,
      position: 4
    })
    const groupSection = barGraph.groupDataByColumn({
      data: genderGroup.groups[0].All,
      position: 4
    })
    groupSection.groups.forEach((group) => {
      const groupKey = Object.keys(group)
      const subGroups = barGraph.groupDataByColumn({
        data: group[groupKey[0]],
        position: 2
      })
      const collectSubs = []
      subGroups.groups.forEach((subGroup) => {
        const subGroupKey = Object.keys(subGroup)
        const labelsVariables = barGraph.getVariablesandLabels({
          data: subGroup[subGroupKey[0]],
          colNames: subGroups.colNames,
          vPosition: 1,
          lPosition: 0
        })
        const ruralData = barGraph.generateDataStructure({
          data: subGroup[subGroupKey[0]],
          ...labelsVariables,
          varPosition: 1,
          valPosition: 2,
          colNames: subGroups.colNames
        })
        collectSubs.push({
          data: ruralData,
          title: subGroupKey[0]
        })
      })
      dataGraphs.push({
        data: collectSubs,
        title: groupKey[0]
      })
    })
