<template>
  <div class="container">
    <Form @formSubmit="handleForm" />

    <h2>Cubo Network Challenge</h2>
    <flash-message class="message"></flash-message>

    <div class="row">
      <div class="control-group">
        <Table v-bind:data="users" @btnAction="remove" :confirm="true" />
      </div> <!-- .control-group -->

      <div class="control-group">
        <Chart class="user-chart" :data="chartData" :labels="labels" v-if="loaded" 
          aria-label="Users percentage info of participation" role="doughnut chart" />
      </div> <!-- .control-group -->
    </div>
  </div>
  <!-- .container -->
</template>

<script>
import UserService from '../models/user/UserService'
import Form from '../components/Form'
import Table from '../components/Table'
import Chart from '../components/Chart'

export default {
  components: { Form, Table, Chart },
  data() {
    return {
      users: [],
      labels: [],
      chartData: [],
      loaded: false
    }
  },
  async created() {
    try {
      this.users = await UserService(this.$http).findAll()
    } catch (err) {
      this.message(err.message, 'error')
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
        this.message('User removed!', 'success')
      } catch (err) {
        console(err.message)
      }
    },
    fillData() {
      this.loaded = false
      setTimeout(async () => {
        this.users = await UserService(this.$http).findAll()
        this.labels = this.users.map(item => item.firstname)
        this.chartData = this.users.map(item => item.participation)
        this.loaded = true
      }, 100)
    },
    handleForm(obj) {
      if (obj.type === 'success') this.message(obj.message, 'success')
      else this.message(obj.message, 'error')
      this.fillData()
    },
    message(message, type) {
      this.flash(message, type, { timeout: 2000 })
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
  width: 400px;
  margin: 50px 100px;
}
.message {
  width: 400px;
  margin: 10px auto;
}
.user-chart {
  width: 350px;
  margin: -40px auto;
  vertical-align: middle;
  text-align: center;
}
</style>
