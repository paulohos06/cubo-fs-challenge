<template>
  <div class="container">
    <h2>Cubo Network Challenge</h2>
    <div class="row">
      <div class="control-group">
        <Table v-bind:data="users" @btnAction="remove" :confirm="true" />
      </div> <!-- .control-group -->

      <div class="control-group">
        <Chart class="user-chart" :data="data" :labels="labels" v-if="loaded" 
          aria-label="Users percentage info of participation" role="doughnut chart" />
      </div> <!-- .control-group -->
    </div>
  </div>
  <!-- .container -->
</template>

<script>
import UserService from '../models/user/UserService'
import Table from '../components/Table'
import Chart from '../components/Chart'

export default {
  components: { Table, Chart },
  data() {
    return {
      users: [],
      labels: [],
      data: [],
      loaded: false
    }
  },
  async created() {
    try {
      this.users = await UserService(this.$http).findAll()
    } catch (err) {
      this.notification(err.message)
    }
  },
  mounted() {
    this.fillData()
  },
  methods: {
    async remove(user) {
      try {
        await UserService(this.$http).remove(user)
        this.users = this.users.filter(item => item != user)
        this.fillData()
        this.notification('User removed')
      } catch (err) {
        this.notification(err.message)
      }
    },
    async fillData() {
      this.loaded = false
      try {
        const users = await UserService(this.$http).findAll()
        this.labels = users.map(item => item.firstname)
        this.data = users.map(item => item.participation)
        this.loaded = true
      } catch (err) {
        console.log(err)
      }
    },
    notification(message) {
      this.$toast(message, {
        className: 'et-alert',
        horizontalPosition: 'center',
        verticalPosition: 'center',
        duration: 1000 
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 100%;
}
.control-group {
  width: 500px;
  margin: 50px 100px;
}
.user-chart {
  width: 350px;
  margin-top: -50px;
}
</style>
