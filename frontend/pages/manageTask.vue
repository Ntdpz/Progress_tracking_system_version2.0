<template>
  <div class="manage-task">
    <div class="task-header">
      <div class="task-name">
        <span>Screen test name</span>
        <span class="task-id">SC-12341</span>
      </div>
      <div class="task-status">
        <button class="status-button in-progress">In Progress</button>
        <button class="status-button not-started">Yet start</button>
        <button class="status-button finished">Finish</button>
        <button class="status-button cancelled">Cancel</button>
      </div>
    </div>
    <div class="task-details">
      <div class="task-topic">Task Topic</div>
      <div class="task-assignee">
        Person in charge:
        <span class="assignee-name">(Dev) Programmer Coder</span>
      </div>
      <div class="task-description">
        detaildetaildetaildetalldetaildetaildetalldetaldetailde
        talldetaiidetalldetallidetaildetaildetaildetalldetaildetal
        Idetaildetaildetalldetaildetaildetaildetalldetaildetail
      </div>
      <div class="task-start-date">Start working: 12-01-2023</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ManageTask',
};
</script>

<style scoped>
.manage-task {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-name {
  font-weight: bold;
}

.task-id {
  font-size: 12px;
  color: #aaa;
  margin-left: 8px;
}

.task-status {
  display: flex;
  gap: 8px;
}

.status-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.status-button.in-progress {
  background-color: #f0f8ff;
}

.status-button.not-started {
  background-color: #fff;
}

.status-button.finished {
  background-color: #d4f5b4;
}

.status-button.cancelled {
  background-color: #fcf3f3;
}

.task-details {
  margin-top: 16px;
}

.task-topic {
  font-weight: bold;
  margin-bottom: 8px;
}

.task-assignee {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.assignee-name {
  font-weight: bold;
  margin-left: 8px;
}

.task-description {
  white-space: pre-wrap;
  margin-bottom: 8px;
}

.task-start-date {
  font-size: 12px;
  color: #aaa;
}
</style>