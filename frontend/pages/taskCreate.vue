<template>
  <div class="task-create-container">
    <h2>Create Task</h2>
    <form @submit.prevent="createTask">
      <div class="form-group">
        <label for="name">Name Task</label>
        <input type="text" id="name" v-model.trim="task.name" required>
      </div>
      <div class="form-group">
        <label for="detail">Detail Task</label>
        <textarea id="detail" v-model.trim="task.detail" required></textarea>
      </div>
      <div class="form-group">
        <label for="status">Tell status</label>
        <select id="status" v-model.trim="task.status" required>
          <option value="Working">Working</option>
          <option value="Pass">Pass</option>
          <option value="Edit">Edit</option>
        </select>
      </div>
      <div class="form-group">
        <label for="start-date">Date Start</label>
        <input type="date" id="start-date" v-model.trim="task.startDate" required>
      </div>
      <div class="form-group">
        <label for="end-date">Date End</label>
        <input type="date" id="end-date" v-model.trim="task.endDate" required>
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <input type="text" id="role" v-model.trim="task.role" required>
      </div>
      <button type="submit">Create Task</button>
      <button type="submit">Cancle</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task: {
        name: '',
        detail: '',
        status: '',
        startDate: '',
        endDate: '',
        role: ''
      }
    }
  },
  methods: {
    createTask() {
      // Implement the logic to create a new task here
      console.log(this.task)
    }
  }
}
</script>

<style scoped>


.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 2px 1px #41b883;
}

button {
  background-color: #41b883;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #35a377;
}
</style>