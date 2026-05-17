<template>
  <dashPageView />
  <div class="content">
    <div class="topbar d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Student Management</h5>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
        Add Student
      </button>
    </div>

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
              <th>Email</th>
              <th>Status</th>
              <th width="220">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img src="https://i.pravatar.cc/100?img=1" />
              </td>
              <td>John Doe</td>
              <td>john@example.com</td>
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

            <tr>
              <td>2</td>
              <td>
                <img src="https://i.pravatar.cc/100?img=2" />
              </td>
              <td>Sarah Smith</td>
              <td>sarah@example.com</td>
              <td>
                <span class="badge bg-secondary">Inactive</span>
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
</script>
