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
      <!-- FILTER SECTION -->
      <div class="d-flex justify-content-between mb-3 gap-2">
        <!-- Class Filter -->
        <select v-model="selectedClass" class="form-control w-25">
          <option value="">---Select Class---</option>
          <option v-for="cls in uniqueClasses" :key="cls" :value="cls">
            {{ cls }}
          </option>
        </select>

        <!-- Search -->
        <input
          v-model="search"
          type="text"
          class="form-control w-25"
          placeholder="Search student..."
        />
      </div>

      <!-- TABLE -->
      <div class="table-responsive">
        <table class="table table-bordered align-middle">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Class</th>
              <th>Email</th>
              <th>Status</th>
              <th width="220">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in paginatedStudents" :key="item.id">
              <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>

              <td>
                <img src="https://i.pravatar.cc/100?img=1" width="40" />
              </td>

              <td>{{ item.full_name }}</td>
              <td>{{ item.batch_name }}</td>
              <td>{{ item.email }}</td>

              <td>
                <span class="badge bg-success">Active</span>
              </td>

              <td>
                <button class="btn btn-sm btn-info">View</button>
                <button class="btn btn-sm btn-warning">Edit</button>
                <button class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- EMPTY -->
      <div v-if="filteredStudents.length === 0" class="text-center py-3 text-muted">
        No students found 😢
      </div>

      <!-- PAGINATION -->
      <div
        v-if="filteredStudents.length > 0"
        class="d-flex justify-content-between align-items-center mt-3"
      >
        <div>
          Showing
          <b>{{ (currentPage - 1) * perPage + 1 }}</b>
          to
          <b>{{ Math.min(currentPage * perPage, filteredStudents.length) }}</b>
          of
          <b>{{ filteredStudents.length }}</b>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-secondary" @click="prevPage" :disabled="currentPage === 1">
            Prev
          </button>

          <button class="btn btn-sm btn-light">{{ currentPage }} / {{ totalPages }}</button>

          <button
            class="btn btn-sm btn-primary"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ADD MODAL -->
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
              <input v-model="form.full_name" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Student Id</label>
              <input v-model="form.student_id" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Phone</label>
              <input v-model="form.phone" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Email</label>
              <input v-model="form.email" type="email" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Course</label>
              <input v-model="form.course_name" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Class</label>
              <select v-model="form.batch_name" class="form-control">
                <option value="">---Select---</option>
                <option v-for="n in 12" :key="n" :value="'class-' + n">class-{{ n }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label>Admission Date</label>
              <input v-model="form.admission_date" type="date" class="form-control" />
            </div>

            <div class="mb-3">
              <label>Status</label>
              <select v-model="form.status" class="form-select">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import dashPageView from './dashPageView.vue'
import { ref, reactive, onMounted, computed, watch } from 'vue'
import api from '@/services/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const search = ref('')
const selectedClass = ref('')
const students = ref([])

/* PAGINATION */
const currentPage = ref(1)
const perPage = ref(10)

/* FORM */
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

/* RESET FORM */
const resetForm = () => {
  Object.keys(form).forEach((key) => (form[key] = ''))
}

/* GET STUDENTS */
const getstudent = async () => {
  try {
    const res = await api.get('/students')
    students.value = res.data.students || []
  } catch (error) {
    console.log(error)
  }
}

/* CREATE STUDENT */
const student_create = async () => {
  if (!form.full_name || !form.email) {
    alert('Field must not be empty')
    return
  }

  try {
    await api.post('/student_create', form)

    alert('Created successfully')

    const modalEl = document.getElementById('addModal')
    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl)
    modal.hide()

    resetForm()
    getstudent()
  } catch (error) {
    alert('Something went wrong')
  }
}

/* UNIQUE CLASS */
const uniqueClasses = computed(() => {
  const classes = students.value.map((s) => s.batch_name).filter(Boolean)
  return [...new Set(classes)]
})

/* FILTER */
const filteredStudents = computed(() => {
  return students.value.filter((s) => {
    const keyword = search.value.toLowerCase()

    const matchSearch =
      s.full_name?.toLowerCase().includes(keyword) ||
      s.email?.toLowerCase().includes(keyword) ||
      s.student_id?.toLowerCase().includes(keyword)

    const matchClass =
      !selectedClass.value || s.batch_name?.toLowerCase() === selectedClass.value.toLowerCase()

    return matchSearch && matchClass
  })
})

/* PAGINATION */
const totalPages = computed(() => {
  return Math.ceil(filteredStudents.value.length / perPage.value)
})

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return filteredStudents.value.slice(start, start + perPage.value)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

/* RESET PAGE ON FILTER CHANGE */
watch([search, selectedClass], () => {
  currentPage.value = 1
})

onMounted(() => {
  getstudent()
})
</script>

<style>
.sps table tr {
  background-color: red !important;
}
</style>
