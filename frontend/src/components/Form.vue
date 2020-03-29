<template>
  <form class="form-bar">
    <div class="row">
      <div class="form-group">
        <input type="text" class="form-control" name="firstname" id="firstname" placeholder="Firstname">
      </div> <!-- .form-group -->

      <div class="form-group">
        <input type="text" class="form-control" name="lastname" id="lastname" placeholder="Lastname">
      </div> <!-- .form-group -->

      <div class="form-group">
        <input type="number" class="form-control" name="participation" id="participation" placeholder="Participation">
      </div> <!-- .form-group -->

      <div class="form-group">
        <button type="submit">SEND</button>
      </div> <!-- .form-group -->
    </div>
  </form>
</template>

<script>
export default {}
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
  border: 1px solid #FFF;
  background-color: #02b8e2;
  font-weight: bold;
  font-size: 14px;
  color: #FFF;
  cursor: pointer;
  outline: none;
}
</style>