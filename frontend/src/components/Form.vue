<template>
  <form class="form-bar" @submit.prevent="submit">
    <div class="row">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          name="firstname"
          placeholder="Firstname"
          v-model="user.firstname"
        />
      </div>
      <!-- .form-group -->

      <div class="form-group">
        <input
          type="text"
          class="form-control"
          name="lastname"
          placeholder="Lastname"
          v-model="user.lastname"
        />
      </div>
      <!-- .form-group -->

      <div class="form-group">
        <input
          type="number"
          class="form-control"
          name="participation"
          placeholder="Participation"
          v-model="user.participation"
        />
      </div>
      <!-- .form-group -->

      <div class="form-group">
        <button type="submit">SEND</button>
      </div>
      <!-- .form-group -->
    </div>
  </form>
</template>

<script>
import User from "../models/user/User"
import UserService from '../models/user/UserService'

export default {
  data() {
    return {
      user: User()
    }
  },
  methods: {
    async submit() {
      try {
        await UserService(this.$http).add(this.user)
        this.$emit('formSubmit', { type: 'success', message: 'User added!' })
        this.user = User()
      } catch (err) {
        this.$emit('formSubmit', { type: 'error', message: err.message })
        console.log("Error:", err.message)
      }
    }
  }
};
</script>

<style scoped>
.form-bar {
  background-color: #02b8e2;
  width: 100%;
  height: 90px;
  margin-bottom: 50px;
}
input {
  padding: 10px;
  width: 250px;
  margin: 20px;
  font-size: 13px;
  outline: none;
}
button {
  padding: 10px;
  width: 150px;
  margin: 20px;
  border: 1px solid #fff;
  background-color: #02b8e2;
  font-weight: bold;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  outline: none;
}
@media screen and (max-width: 1148px) {
  .form-bar {
    height: 170px;
  }
  .form-group {
    flex: 1 0 120px;
  }
}
@media screen and (max-width: 645px) {
  .form-bar {
    height: 320px;
  }
  button {
    display: inline-block;
  }
}
</style>