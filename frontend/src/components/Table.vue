<template>
  <div v-if="showTable">
    <table>
      <thead class="table-head">
        <tr>
          <th></th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>
            <abbr class="tip" v-tooltip.top="limit">Participation</abbr>
          </th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="(user, index) in data" v-bind:key="user._id">
          <td>{{ userIndex(index) }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.participation }}%</td>
          <td>
            <button class="btn-remove" type="button" @click="remove(user)">Remove</button>
          </td>
        </tr>
      </tbody>
      <tfoot class="table-foot">
        <tr>
          <th colspan="3" style="text-align: left; padding: 0 20px;">Total:</th>
          <th colspan="2" style="text-align: right; padding: 0 20px;">{{ total }}%</th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Array, required: true },
    total: { type: Number, required: true, default: 0 },
    confirm: { type: Boolean, required: false },
  },
  data() {
    return {
      limit: 'Limit allowed: 100%'
    }
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
    },
    userIndex(index) {
      return index += 1
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
.table-foot tr{
  height: 30px;
  background: #36304a;
  color: #fff;
  line-height: 1.2;
  font-weight: unset;
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