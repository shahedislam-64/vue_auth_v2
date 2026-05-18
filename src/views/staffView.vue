<template>
  <dashPageView />
  <div class="content">
    <div class="card-box">
      <div class="d-flex justify-content-between mb-3">
        <input type="text" class="form-control w-25" placeholder="Search student..." />
      </div>

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
                <img src="https://i.pravatar.cc/100?img=1" />
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.skill }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.role }}</td>

              <td>
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
      </div>
    </div>
  </div>

  <div class="modal fade" id="addModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Add Student</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label>Name</label>
            <input type="text" class="form-control" />
          </div>

          <div class="mb-3">
            <label>Email</label>
            <input type="email" class="form-control" />
          </div>

          <div class="mb-3">
            <label>Status</label>
            <select class="form-select">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="editModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Edit Student</h5>
          <button class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label>Name</label>
            <input type="text" class="form-control" value="John Doe" />
          </div>

          <div class="mb-3">
            <label>Email</label>
            <input type="email" class="form-control" value="john@example.com" />
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button class="btn btn-warning">Update</button>
        </div>
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

    staff.value = res.data.staff
  } catch (error) {
    console.log(error.response?.data)
  }
}

onMounted(() => {
  getStaff()
})
</script>
