<template>
  <div class="container">
    <h2>Cubo Network Challenge</h2>
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
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" v-bind:key="user._id">
              <td>1</td>
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.participation }}</td>
              <td>
                <button class="remove" type="button" @click="remove(user)">Remove</button>
              </td>
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
}
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
  border-spacing: 0;
  border-collapse: collapse;
}
table td, table th {
  border: 1px solid #cccccc;
  padding: 5px 10px;
}
.remove {
  padding: 5px;
  background-color: #C82233;
  border: 1px solid #C82233;
  border-radius: 10%;
  color: #FFF;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
</style>
