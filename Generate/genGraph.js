import GraphClass from './graphClass'
export default class GenGraph extends GraphClass {
  singleGroup(groupSection, dataGraphs) {
    groupSection.groups.forEach((group) => {
      // get column position index
      const valueIndex = groupSection.colNames.includes('Proportion')
        ? groupSection.colNames.indexOf('Proportion')
        : groupSection.colNames.indexOf('proportion')
      // get the index of Proportion
      let varP = 1 // varP mean variable given the second column
      if (varP === valueIndex) {
        varP = varP + 1
        if (groupSection.colNames[varP] === 'hckeys') {
          varP = 0
        }
      }
      const groupKey = Object.keys(group)
      const labelsVariables = this.getVariablesandLabels({
        data: group[groupKey[0]],
        colNames: groupSection.colNames,
        vPosition: varP,
        lPosition: 0
      })
      const ruralData = this.generateDataStructure({
        data: group[groupKey[0]],
        ...labelsVariables,
        varPosition: varP,
        valPosition: valueIndex,
        colNames: groupSection.colNames
      })
      dataGraphs.push({
        data: ruralData,
        title: groupKey[0]
      })
    })
    return dataGraphs
  }

  twoSubGroups(groupSection, dataGraphs, divider) {
    const divideIndex = groupSection.colNames.indexOf(divider)
    groupSection.groups.forEach((group) => {
      const groupKey = Object.keys(group)
      const subGroups = this.groupDataByColumn({
        data: group[groupKey[0]],
        position: divideIndex
      })
      const collectSubs = []
      subGroups.groups.forEach((subGroup) => {
        // get column position index
        const valueIndex = subGroups.colNames.includes('Proportion')
          ? subGroups.colNames.indexOf('Proportion')
          : subGroups.colNames.indexOf('proportion')
        // get the index of Proportion
        let varP = 1
        if (varP === valueIndex) {
          varP = varP + 1
          if (subGroups.colNames[varP] === 'hckeys') {
            varP = 0
          }
        }
        const subGroupKey = Object.keys(subGroup)
        const labelsVariables = this.getVariablesandLabels({
          data: subGroup[subGroupKey[0]],
          colNames: subGroups.colNames,
          vPosition: varP,
          lPosition: 0
        })
        const ruralData = this.generateDataStructure({
          data: subGroup[subGroupKey[0]],
          ...labelsVariables,
          varPosition: varP,
          valPosition: valueIndex,
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
    return dataGraphs
  }
}
