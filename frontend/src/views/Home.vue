<template>
  <div class="container">
    <h1>DATA</h1>
    <p>{{ message }}</p>
    <div class="row">
      <div class="control-group">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Participation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" v-bind:key="user._id">
              <td>1</td>
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.participation }}</td>
            </tr>
          </tbody>
          
        </table>
      </div> <!-- .control-group -->

      <div class="control-group">
        GRÁFICO
      </div> <!-- .control-group -->
    </div>
  </div>
  <!-- .container -->
</template>

<script>
import UserService from '../models/user/UserService'

export default {
  data() {
    return {
      users: [],
      message: ''
    }
  },
  async created() {
    try {
      this.users = await UserService(this.$http).findAll()
    } catch (err) {
      this.message = err.message
    }
  },
  methods: {
    async remove(user) {
      try {
        await UserService(this.$http).remove(user)
        this.users = this.users.filter(item => item != user)
        this.message = 'User removed!'
      } catch (err) {
        this.message = err.message
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 60%;
}
.control-group {
  width: 500px;
  margin: 50px;
}
table {
  width: 100%;
}
table td, table th {
  border: 1px solid #cccccc;
  padding: 10px;
}
</style>
