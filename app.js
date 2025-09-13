// Grab elements
const input       = document.getElementById('taskInput');
const addBtn      = document.getElementById('addTaskButton');
const taskList    = document.getElementById('taskList');
const taskCount   = document.getElementById('taskCount');
const completedEl = document.getElementById('completedCount');
const remainingEl = document.getElementById('remainingCount');

// Add on click
addBtn.addEventListener('click', addTask);

// (optional) Add on Enter key too
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');

  // checkbox to mark complete
  const cb = document.createElement('input');
  cb.type = 'checkbox';

  const label = document.createElement('span');
  label.textContent = text;

  li.append(cb, label);
  taskList.appendChild(li);

  input.value = '';
  updateCounts();
}

// Recalculate counts when a checkbox changes
taskList.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') updateCounts();
});

function updateCounts() {
  const total = taskList.children.length;
  const completed = taskList.querySelectorAll('input[type="checkbox"]:checked').length;
  const remaining = total - completed;

  taskCount.textContent   = `Total: ${total}`;
  completedEl.textContent = `Completed: ${completed}`;
  remainingEl.textContent = `Remaining: ${remaining}`;
}

clearCompletedButton.addEventListener('click', () => {
    const completedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked');
    completedTasks.forEach(cb => cb.parentElement.remove());
    updateCounts();
});

deleteAllButton.addEventListener('click', () => {
    taskList.innerHTML = '';
    updateCounts();
});