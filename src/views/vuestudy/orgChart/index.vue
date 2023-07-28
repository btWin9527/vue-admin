<template>
  <div>
    <h3>vue-organization-chart</h3>
    <!--    <organization-chart pan  zoom :datasource="ds"></organization-chart>-->
    <hr>
    <h3>vue-orgchart</h3>
    <vo-basic exportButton toggleSiblingsResp pan zoom :data="chartData"
              draggable></vo-basic>
    <!--  -->
  </div>
</template>

<script>
//  "vue-organization-chart": "^1.1.6",
// "vue-orgchart": "^1.1.7",
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'

import 'vue-orgchart/dist/style.min.css'
import {VoBasic} from 'vue-orgchart'

export default {
  components: {
    OrganizationChart,
    VoBasic
  },
  data() {
    return {
      chartData: {
        name: 'JavaScript',
        children: [
          {name: 'Angular'},
          {
            name: 'React',
            children: [{name: 'Preact'}]
          },
          {
            name: 'Vue',
            children: [{name: 'Moon'}]
          }
        ]
      },
      ds: {
        'id': '1',
        'name': 'Lao Lao',
        'title': 'general manager',
        'children': [
          {'id': '2', 'name': 'Bo Miao', 'title': 'department manager'},
          {
            'id': '3', 'name': 'Su Miao', 'title': 'department manager',
            'children': [
              {'id': '4', 'name': 'Tie Hua', 'title': 'senior engineer'},
              {
                'id': '5', 'name': 'Hei Hei', 'title': 'senior engineer',
                'children': [
                  {'id': '6', 'name': 'Pang Pang', 'title': 'engineer'},
                  {'id': '7', 'name': 'Xiang Xiang', 'title': 'UE engineer'}
                ]
              }
            ]
          },
          {'id': '8', 'name': 'Hong Miao', 'title': 'department manager'},
          {'id': '9', 'name': 'Chun Miao', 'title': 'department manager'}
        ]
      }
    }
  },
  methods: {
    createNode(val) {
      console.log(val, 'val')
    }
  }
}
</script>
