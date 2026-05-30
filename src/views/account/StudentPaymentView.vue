<template>
  <div class="layout bgc">
    <!-- Sidebar -->
    <AccountMenuView />

    <!-- Content -->
    <div class="content">
      <div class="card-box">
        <!-- Header -->
        <div class="topbar">
          <h3>Student Management</h3>

          <div class="filters">
            <select v-model="selectedClass" class="form-control">
              <option value="">---Select a Class---</option>
              <option v-for="cls in uniqueClasses" :key="cls" :value="cls">
                {{ cls }}
              </option>
            </select>

            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Search student ID, name, email..."
            />
          </div>
        </div>

        <hr />

        <!-- TABLE -->
        <div class="table-responsive">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Student ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Email</th>
                <th>Due Months</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(s, index) in paginatedStudents" :key="s.id">
                <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
                <td>{{ s.student_id }}</td>
                <td>{{ s.full_name }}</td>
                <td>{{ s.batch_name }}</td>
                <td>{{ s.email }}</td>

                <td>
                  <span v-if="s.due_months?.length">
                    {{ s.due_months.join(', ') }}
                  </span>
                  <span v-else class="badge bg-success">Paid</span>
                </td>

                <td>
                  <span class="badge bg-success">
                    {{ s.status }}
                  </span>
                </td>

                <td>
                  <button
                    class="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#paymentModal"
                    @click="openPaymentModal(s)"
                  >
                    Payment
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- EMPTY -->
        <div v-if="filteredStudents.length === 0" class="empty">No student found 😢</div>

        <!-- PAGINATION -->
        <div v-if="filteredStudents.length > 0" class="pagination-wrapper">
          <div class="info">
            Showing <b>{{ (currentPage - 1) * perPage + 1 }}</b> -
            <b>{{ Math.min(currentPage * perPage, filteredStudents.length) }}</b>
            of <b>{{ filteredStudents.length }}</b>
          </div>

          <div class="controls">
            <button class="btn" @click="prevPage" :disabled="currentPage === 1">← Prev</button>

            <span class="badge">{{ currentPage }} / {{ totalPages }}</span>

            <button class="btn" @click="nextPage" :disabled="currentPage === totalPages">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import AccountMenuView from './AccountMenuView.vue'
import api from '@/services/api'

const students = ref([])
const search = ref('')
const selectedClass = ref('')

const currentPage = ref(1)
const perPage = 10

const selectedStudent = reactive({
  student_id: '',
  full_name: '',
})

const form = reactive({
  student_id: '',
  amount: '',
  paid_amount: '',
  payment_method: '',
  payment_date: '',
  month: '',
})

onMounted(async () => {
  const res = await api.get('/students')
  students.value = res.data.students || []
})

const filteredStudents = computed(() => {
  return students.value.filter((s) => {
    const k = search.value.toLowerCase()

    const matchSearch =
      s.student_id?.toLowerCase().includes(k) ||
      s.full_name?.toLowerCase().includes(k) ||
      s.email?.toLowerCase().includes(k)

    const matchClass = !selectedClass.value || s.batch_name === selectedClass.value

    return matchSearch && matchClass
  })
})

const totalPages = computed(() => Math.ceil(filteredStudents.value.length / perPage))

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredStudents.value.slice(start, start + perPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

watch(search, () => {
  currentPage.value = 1
})

const uniqueClasses = computed(() => {
  return [...new Set(students.value.map((s) => s.batch_name).filter(Boolean))]
})

const openPaymentModal = (student) => {
  selectedStudent.student_id = student.student_id
  selectedStudent.full_name = student.full_name
  form.student_id = student.id
}
</script>

<style>
.layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.content {
  margin-left: 250px;
  padding: 20px;
  width: calc(100% - 250px);
}

.card-box {
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.filters {
  display: flex;
  gap: 10px;
  width: 500px;
}

.filters select,
.filters input {
  flex: 1;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.empty {
  text-align: center;
  padding: 20px;
  color: gray;
}

.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge {
  background: #f1f1f1;
  padding: 6px 12px;
  border-radius: 8px;
}

/* MOBILE */
@media (max-width: 768px) {
  .content {
    margin-left: 0 !important;
    width: 100% !important;
    padding: 12px;
  }

  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .filters {
    width: 100%;
    flex-direction: column;
  }

  .pagination-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
