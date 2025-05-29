const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const weekGrid = document.getElementById('weekGrid');
const addTaskForm = document.getElementById('addTaskForm');
const showFormBtn = document.getElementById('showFormBtn');
const closeFormBtn = document.getElementById('closeFormBtn');
const taskDay = document.getElementById('taskDay');
const taskName = document.getElementById('taskName');
const taskTime = document.getElementById('taskTime');

// Store tasks as an array of arrays
const tasks = [[], [], [], [], [], [], []];

function renderWeek() {
  weekGrid.innerHTML = '';
  weekDays.forEach((day, i) => {
    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `<div class="day-title">${day}</div>`;
    if (tasks[i].length === 0) {
      card.innerHTML += `<div class="empty-msg">No tasks yet 🙃</div>`;
    } else {
      tasks[i].forEach((task, idx) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
          <span>${task.name} | <b>Time:</b> ${task.time}</span>
          <span style="color:#b71c1c;cursor:pointer;font-weight:bold;" title="Delete" data-day="${i}" data-idx="${idx}">&times;</span>
        `;
        card.appendChild(taskDiv);
      });
    }
    weekGrid.appendChild(card);
  });
//To download the assignment
   document.querySelectorAll('.task').forEach(task => {
    task.addEventListener('click', () => {
      const filePath = task.dataset.file;
      if (filePath) {
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('The Solution PDF will be uploaded soon!');
      }
    });
  });


  // Add delete event listeners
  document.querySelectorAll('.task span[title="Delete"]').forEach(span => {
    span.onclick = function() {
      const dayIdx = Number(span.getAttribute('data-day'));
      const taskIdx = Number(span.getAttribute('data-idx'));
      tasks[dayIdx].splice(taskIdx, 1);
      renderWeek();
    };
  });
}

// Show add task form
showFormBtn.onclick = () => {
  addTaskForm.style.display = 'flex';
};

// Hide add task form
closeFormBtn.onclick = () => {
  addTaskForm.style.display = 'none';
  addTaskForm.reset();
};

// Add new task
addTaskForm.onsubmit = function(e) {
  e.preventDefault();
  const dayIdx = Number(taskDay.value);
  tasks[dayIdx].push({
    name: taskName.value,
    time: taskTime.value
  });
  renderWeek();
  addTaskForm.style.display = 'none';
  addTaskForm.reset();
};

// Initial render
renderWeek();
