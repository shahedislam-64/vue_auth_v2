<template>
  <div class="d-flex bgc">
    <AccountMenuView />
    <div class="flex-grow-1 p-4">
      <h2>Payment History</h2>

      <table class="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Month</th>
            <th>Amount</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>101</td>
            <td>Rahim</td>
            <td>January</td>
            <td>2000</td>
            <td><button class="btn btn-primary btn-sm">PDF</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import AccountMenuView from './AccountMenuView.vue'
</script>
<style>
.bgc {
  background-color: #e9e9e9 !important;
}
</style>
