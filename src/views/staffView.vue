<template>
  <dashPageView />

  <div class="content">
    <div class="card-box">
      <!-- SEARCH -->
      <div class="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
        <input type="text" class="form-control staff-search" placeholder="Search staff..." />
      </div>

      <!-- TABLE -->
      <div class="table-responsive">
        <table class="table table-bordered align-middle">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>User Name</th>
              <th>Skill</th>
              <th>Email</th>
              <th>Role</th>
              <th width="220">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in staff" :key="item.id">
              <td>{{ index + 1 }}</td>

              <td>
                <img src="https://i.pravatar.cc/100?img=1" width="45" class="rounded-circle" />
              </td>

              <td>{{ item.name }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.skill }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.role }}</td>

              <td class="action-buttons">
                <button class="btn btn-sm btn-info">View</button>

                <button
                  class="btn btn-sm btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  v-if="
                    currentRole === 'Manager' ||
                    currentRole === 'Accountant' ||
                    (currentRole === 'Admin' && item.role !== 'Manager')
                  "
                >
                  Edit
                </button>

                <button
                  class="btn btn-sm btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  v-if="
                    currentRole === 'Manager' ||
                    currentRole === 'Accountant' ||
                    (currentRole === 'Admin' && item.role !== 'Manager')
                  "
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- EMPTY -->
        <div v-if="staff.length === 0" class="text-center py-3 text-muted">No staff found</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dashPageView from './dashPageView.vue'

import { ref, onMounted } from 'vue'
import axios from 'axios'
import api from '@/services/api'
const staff = ref([])
const currentRole = localStorage.getItem('role')
const token = localStorage.getItem('token')

const getStaff = async () => {
  try {
    const res = await api.get('/staff', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(res.data)

    staff.value = res.data.staff
  } catch (error) {
    console.log(error.response?.data)
  }
}
onMounted(() => {
  getStaff()
})
</script>
<style scoped>
.content {
  margin-left: 250px;
  padding: 20px;
}

.staff-search {
  width: 25%;
}

.table-responsive {
  overflow-x: auto;
}

.action-buttons .btn {
  margin: 2px;
}

@media (max-width: 768px) {
  .content {
    margin-left: 0;
    padding: 15px;
  }

  .staff-search {
    width: 100%;
  }

  table {
    min-width: 850px;
  }

  .action-buttons {
    white-space: nowrap;
  }

  .btn-sm {
    margin-bottom: 5px;
  }
}
</style>
