<script>
import TopNav from '../components/dashboard/TopNav.vue'
import { items } from '~/utils/data'
import GraphClass from '~/utils/graphClass.js'
import GenGraph from '~/utils/genGraph.js'
import { newChart } from '~/utils/utils.js'
export default {
  name: 'KdhsDashboard',
  layout: 'none',
  components: { TopNav },
  data: () => ({
    selected: 'Housing',
    items,
    genGraph: null,
    graphClass: null,
    graphs: []
  }),
  mounted() {
    this.graphClass = new GraphClass()
    this.genGraph = new GenGraph()
    this.changeSelection('Housing', 0)
  },
  methods: {
    makeGraphs(groupSection, dataGraphs) {
      groupSection.groups.forEach((group) => {
        const groupKey = Object.keys(group)
        const subGroups = this.barGraph.groupDataByColumn({
          data: group[groupKey[0]],
          position: 3
        })
        const collectSubs = []
        subGroups.groups.forEach((subGroup) => {
          const subGroupKey = Object.keys(subGroup)
          const labelsVariables = this.barGraph.getVariablesandLabels({
            data: subGroup[subGroupKey[0]],
            colNames: subGroups.colNames,
            vPosition: 1,
            lPosition: 0
          })
          const ruralData = this.barGraph.generateDataStructure({
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
      return dataGraphs
    },
    drawGraphs(dataGraphs) {
      // generate graphs
      const container = document.getElementById('containerCanvas')
      container.innerHTML = ''
      if (this.graphs.length) {
        this.destroyCharts()
      }
      dataGraphs.forEach((group, index) => {
        const categoryTitle = document.createElement('p')
        categoryTitle.textContent = group.title
        categoryTitle.classList.add('text-center')
        categoryTitle.classList.add('font-weight-bold')
        categoryTitle.classList.add('text-h4')
        categoryTitle.classList.add('mt-14')
        container.append(categoryTitle)
        if (group.data.length) {
          group.data.forEach((subGroups, index) => {
            this.createGraphElements(container, subGroups, index)
          })
        } else {
          this.createGraphElements(container, group, index)
        }
      })
    },
    destroyCharts() {
      this.graphs.forEach((graph, index) => {
        graph.destroy()
        this.graphs.splice(index, 1)
      })
    },
    createGraphElements(container, subGroups, index) {
      const div = document.createElement('div')
      div.classList.add('mt-6')
      const title = document.createElement('p')
      title.textContent = subGroups.title
      title.classList.add('text-center')
      title.classList.add('font-weight-bold')
      title.classList.add('text-h6')
      title.classList.add('grey--text')
      const canvas = document.createElement('canvas')
      canvas.setAttribute('height', '100')
      canvas.setAttribute('id', 'chart' + index)
      div.append(title)
      div.append(canvas)
      container.append(div)
      this.graphs.push(
        newChart(subGroups.data, canvas, 'bar', true, true, true)
      )
    },
    async changeSelection(name, index) {
      let dataGraphs = []
      this.selected = name
      if (this.items[3].values[index].values) {
        const files = this.items[3].values[index].values
        let data = await this.$content('csv/' + files[0].value).fetch()
        dataGraphs.push(
          ...this.genDataInfo(data, [], this.items[3].values[index].values[0])
        )
        data = await this.$content('csv/' + files[1].value).fetch()
        dataGraphs.push(
          ...this.genDataInfo(data, [], this.items[3].values[index].values[1])
        )
      } else {
        const data = await this.$content(
          'csv/' + this.items[3].values[index].value
        ).fetch()
        dataGraphs = this.genDataInfo(data, [], this.items[3].values[index])
      }
      this.drawGraphs(dataGraphs)
    },
    genDataInfo(data, dataGraphs, item) {
      const xTics = this.graphClass.groupDataByColumn({
        data: data.body,
        position: 0
      })
      if (item.column) {
        dataGraphs = this.genGraph.twoSubGroups(xTics, dataGraphs, item.column)
      } else {
        dataGraphs = this.genGraph.singleGroup(xTics, dataGraphs)
      }
      return dataGraphs
    }
  }
}
</script>
<template>
  <div>
    <TopNav />
    <div class="__gap__" />
    <v-col cols="8" class="mx-auto">
      <v-row no-gutters justify="space-between">
        <div class="d-flex align-center">
          <div>
            <v-img src="/woman.png" width="120" />
          </div>
          <div>
            <div class="mx-auto" style="width: fit-content;">
              <v-progress-circular
                :value="20"
                color="#25ABE2"
                size="150"
                width="30"
              >
                26%
              </v-progress-circular>
            </div>
            <p
              class="mt-4 mb-0 font-weight-bold body-2 text-center mx-auto"
              style="width: 70%;"
            >
              Of Women Have A Form Of Health Insurance
            </p>
          </div>
        </div>
        <div class="d-flex align-center">
          <div>
            <v-img src="/man.png" width="120" />
          </div>
          <div>
            <div class="mx-auto" style="width: fit-content;">
              <v-progress-circular
                :value="20"
                color="#25ABE2"
                size="150"
                width="30"
              >
                26.5%
              </v-progress-circular>
            </div>
            <p
              class="mt-4 mb-0 font-weight-bold body-2 text-center mx-auto"
              style="width: 70%;"
            >
              Of Men Have A Form Of Health Insurance
            </p>
          </div>
        </div>
      </v-row>
    </v-col>
    <div class="__gap__" />
    <div style="background-color: #f4741f7a;">
      <v-col md="11" class="px-3 py-4 mx-auto">
        <v-row no-gutters>
          <p
            v-for="(data, i) in items[3].values"
            :key="i"
            :class="
              selected === data.key ? '__orange_bg white--text' : 'black--text'
            "
            class="__cursor__ py-2 px-4 mx-3 my-1 font-weight-bold text-center rounded-xl"
            @click="changeSelection(data.key, i)"
          >
            {{ data.key }}
          </p>
        </v-row>
      </v-col>
    </div>
    <div class="__gap__" />
    <p class="mx-auto text-center" style="width: 80%;">
      Health insurance improves access to quality health care by reducing the
      costs associated with illness, treatment and care incurred by persons
      and/or families. The graphics show the percentage of de jure household
      members with insurance and the type of insurance.
    </p>
    <div class="__gap__" />
    <!-- map work comes here -->
    <v-col id="containerCanvas" cols="10" class="mx-auto"></v-col>
    <div class="__gap__" />
    <div class="__gap__" />
  </div>
</template>
<style>
.__gap__ {
  height: 50px;
}
.__orange_bg {
  background-color: #f4751f;
}
.__cursor__ {
  cursor: pointer;
}
</style>
