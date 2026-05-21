<template>
  <div class="d-flex bgc">
    <AccountMenuView />

    <div class="flex-grow-1 p-4">
      <!-- Topbar -->
      <div class="topbar d-flex justify-content-between align-items-center mb-4">
        <h4 class="mb-0">Student Management</h4>
      </div>

      <!-- Table -->
      <div class="table-responsive">
        <table class="table table-bordered align-middle bg-white">
          <thead class="table-dark dard">
            <tr>
              <th>#</th>
              <th>Student Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Due Months</th>
              <th>Status</th>
              <th width="220">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(s, index) in students" :key="s.id">
              <td>{{ index + 1 }}</td>
              <td>{{ s.student_id }}</td>
              <td>{{ s.full_name }}</td>
              <td>{{ s.email }}</td>

              <td>
                <span v-if="s.due_months?.length">
                  {{ s.due_months.join(', ') }}
                </span>
                <span v-else class="badge bg-success">Paid</span>
              </td>

              <td>
                <span class="badge bg-success">{{ s.status }}</span>
              </td>

              <td>
                <button
                  class="btn btn-sm btn-info"
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

      <!-- MODAL -->
      <div class="modal fade" id="paymentModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Payment</h5>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
              <!-- Student -->
              <div class="mb-3">
                <label class="form-label">Student</label>
                <div class="form-control bg-light">
                  {{ selectedStudent.student_id }} - {{ selectedStudent.full_name }}
                </div>
              </div>

              <!-- Amount -->
              <div class="mb-3">
                <label>Amount</label>
                <input v-model="form.amount" type="number" class="form-control" />
              </div>

              <!-- Paid -->
              <div class="mb-3">
                <label>Paid Amount</label>
                <input v-model="form.paid_amount" type="number" class="form-control" />
              </div>

              <!-- Month -->
              <div class="mb-3">
                <label>Month</label>
                <select v-model="form.month" class="form-select">
                  <option disabled value="">Select Month</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </select>
              </div>

              <!-- Method -->
              <div class="mb-3">
                <label>Payment Method</label>
                <input v-model="form.payment_method" class="form-control" />
              </div>

              <!-- Date -->
              <div class="mb-3">
                <label>Payment Date</label>
                <input v-model="form.payment_date" type="date" class="form-control" />
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

              <button class="btn btn-success" @click="savePayment">Save Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import AccountMenuView from './AccountMenuView.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const students = ref([])

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

/* OPEN MODAL */
const openPaymentModal = (student) => {
  selectedStudent.student_id = student.student_id
  selectedStudent.full_name = student.full_name

  form.student_id = student.id

  form.amount = ''
  form.paid_amount = ''
  form.payment_method = ''
  form.payment_date = ''
  form.month = ''
}

/* SAVE PAYMENT (MAIN FIX) */
const savePayment = async () => {
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/payments', form)

    const paymentId = res.data.payment.id

    // close modal manually
    const modal = document.getElementById('paymentModal')
    const modalInstance = bootstrap.Modal.getInstance(modal)
    modalInstance.hide()

    // redirect to correct payment page
    router.push(`/singlePayment/${paymentId}`)
  } catch (err) {
    console.log(err.response?.data || err)
    alert('Payment save failed')
  }
}

/* GET STUDENTS */
const getStudents = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/students')
    students.value = res.data.students || []
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getStudents()
})
</script>

<style>
.bgc {
  background-color: #e9e9e9;
  min-height: 100vh;
}
.dard th {
  background-color: #212529 !important;
}
</style>
