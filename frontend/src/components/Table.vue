<template>
  <div v-if="showTable">
    <table>
      <thead class="table-head">
        <tr>
          <th></th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>
            <abbr class="tip" title="Limit allowed: 100%">Participation</abbr>
          </th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="user in data" v-bind:key="user._id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.participation }}%</td>
          <td>
            <button class="btn-remove" type="button" @click="remove(user)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Array, required: true },
    confirm: { type: Boolean, required: false }
  },
  computed: {
    showTable() {
      if (this.data.length > 0) return true
      return false
    }
  },
  methods: {
    remove(user) {
      if (this.confirm) {
        if (confirm('Do you want remove the user?')) {
          this.$emit('btnAction', user)
        }
      } else {
        this.$emit('btnAction', user)
      }
    }
  }
}
</script>

<style scoped>
table {
  border-spacing: 0;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
}
table td, table th {
  text-align: center;
  padding-left: 10px;
  font-size: 14px;
}
.table-head tr{
  height: 50px;
  background: #36304a;
  color: #fff;
  line-height: 1.2;
  font-weight: unset;
}
.table-body tr {
  height: 50px;
}
.table-body tr:nth-child(even) {
  background-color: #f5f5f5;
}
.table-body tr:hover {
  color: #555555;
  background-color: #f5f5f5;
  cursor: pointer;
}
.btn-remove {
  padding: 5px;
  background-color: #C82233;
  border: 1px solid #C82233;
  border-radius: 10%;
  color: #FFF;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}
abbr {
  border-bottom: 2px dotted #ffdc75;
  text-decoration: none
}
</style>