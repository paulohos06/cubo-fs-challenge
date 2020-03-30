<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    labels: { type: Array, required: true },
    data: { type: Array, required: true }
  },
  mounted () {
    const chartData = {
      labels: this.labels,
      datasets: [{ 
        label: 'Users',
        data: this.data,
        backgroundColor: this.randomColors(this.data.length)
      }]
    }
    const options = {
      responsive: true,
      legend: { position: 'right' }
    }

    this.renderChart(chartData, options)
  },
  methods: {
    randomColors(length) {
      const arrColors = []

      for (let j = 0; j < length; j++) {
        let color = ['','',''].map(() => Math.floor(Math.random() * 250))
        arrColors.push(`rgb(${color.join(',')})`)
      }
      return arrColors
    }
  }
}
</script>