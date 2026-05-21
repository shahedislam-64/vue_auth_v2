<template>
  <dashPageView />
  <div class="content">
    <div class="topbar d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Student Management</h5>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
        Add Student
      </button>
    </div>

    <div class="card-box sps">
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
              <th>Email</th>
              <th>Status</th>
              <th width="220">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in students" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>
                <img src="https://i.pravatar.cc/100?img=1" />
              </td>
              <td>{{ item.full_name }}</td>
              <td>{{ item.email }}</td>
              <td>
                <span class="badge bg-success">Active</span>
              </td>
              <td>
                <button class="btn btn-sm btn-info">View</button>

                <button
                  class="btn btn-sm btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                >
                  Edit
                </button>

                <button class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <form @submit.prevent="student_create">
    <div class="modal fade" id="addModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Add Student</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label>Full Name</label>
              <input v-model="form.full_name" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label>Student Id</label>
              <input v-model="form.student_id" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label>Phone</label>
              <input v-model="form.phone" type="text" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Email</label>
              <input v-model="form.email" type="email" class="form-control" />
            </div>
            <div class="mb-3">
              <label>Course</label>
              <input v-model="form.course_name" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label>Batch</label>
              <input v-model="form.batch_name" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label>Admission Date</label>
              <input v-model="form.admission_date" type="date" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Status</label>
              <select v-model="form.status" class="form-select">
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
  </form>
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

import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()

const form = reactive({
  full_name: '',
  student_id: '',
  phone: '',
  email: '',
  course_name: '',
  batch_name: '',
  admission_date: '',
  status: '',
})

const student_create = async () => {
  try {
    const res = await api.post('/student_create', form)

    alert(res.data.message || 'student create successfully')

    router.push('/student')
  } catch (error) {
    // 🔥 SAFE ERROR HANDLING
    if (error.response) {
      console.log('ERROR DATA:', error.response.data)

      const msg =
        error.response.data.message ||
        Object.values(error.response.data.errors || {})
          .flat()
          .join('\n')

      alert(msg)
    } else {
      console.log('NETWORK ERROR:', error)
      alert('Network / Server error')
    }
  }
}

const students = ref([])

const getstudent = async () => {
  try {
    const res = await api.get('/students')

    students.value = res.data.students

    console.log(students.value)
  } catch (error) {
    console.log(error.response?.data || error)
  }
}
onMounted(() => {
  getstudent()
})
</script>
<style>
.sps {
  margin-left: 0px;
}
.sps table tr {
  background-color: red !important;
}
</style>
