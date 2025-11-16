const statuses = ["backlog", "in-progress", "review", "done"];

const team = [
  { name: "Nora Ahmed", role: "Manager" },
  { name: "Luis Santos", role: "Manager" },
  { name: "Ivy Chen", role: "Front Desk" },
  { name: "Omar Patel", role: "Front Desk" },
  { name: "Julia Kim", role: "Front Desk" },
  { name: "Samir Ali", role: "Front Desk" },
  { name: "Aiko Tan", role: "Front Desk" },
  { name: "Marco Rossi", role: "Front Desk" },
  { name: "Leah Stein", role: "Front Desk" },
  { name: "Bea Carter", role: "Front Desk" },
  { name: "Victor Lee", role: "Chef" },
  { name: "Angela Park", role: "Sous Chef" },
  { name: "Peter Zhao", role: "Line Cook" },
  { name: "Hana Nguyen", role: "Line Cook" },
  { name: "Eric Gomez", role: "Pastry" },
  { name: "Tara Singh", role: "Pastry" },
  { name: "Sofia Rossi", role: "Waitress" },
  { name: "Mila Novak", role: "Waitress" },
  { name: "Rhea Brooks", role: "Waitress" },
  { name: "Yuri Sato", role: "Waitress" },
  { name: "Henry Clark", role: "Waiter" },
  { name: "David Young", role: "Waiter" },
  { name: "Kofi Mensah", role: "Waiter" },
  { name: "Callum Reid", role: "Waiter" },
  { name: "Lena Fox", role: "Bartender" },
  { name: "Tess Howard", role: "Bartender" },
  { name: "Myles Grant", role: "Bartender" },
  { name: "Nia Gordon", role: "Bartender" },
  { name: "Paulina Silva", role: "Housekeeping" },
  { name: "Amina Diallo", role: "Housekeeping" },
  { name: "Sara Flores", role: "Housekeeping" },
  { name: "Mary Okafor", role: "Housekeeping" },
  { name: "João Costa", role: "Housekeeping" },
  { name: "Helena Cruz", role: "Housekeeping" },
  { name: "Lukas Meyer", role: "Housekeeping" },
  { name: "Gloria Kwan", role: "Housekeeping" },
  { name: "Camila Reyes", role: "Housekeeping" },
  { name: "Sonia Patel", role: "Housekeeping" },
  { name: "Aaron Blake", role: "Maintenance" },
  { name: "Khalid Idris", role: "Maintenance" },
  { name: "Ulfur Bjorn", role: "Maintenance" },
  { name: "Lola Murray", role: "Maintenance" },
  { name: "Zoe Sun", role: "Maintenance" },
  { name: "Theo Laurent", role: "Maintenance" },
  { name: "Dante Marino", role: "Maintenance" },
  { name: "Mira Adler", role: "Maintenance" },
  { name: "Chloe Smith", role: "Maintenance" },
  { name: "Ray Quinn", role: "Maintenance" },
  { name: "Ari Levy", role: "Security" },
  { name: "Dana Fields", role: "Security" }
];

const seedTasks = [
  {
    id: 1,
    title: "Replace AC filter - Room 412",
    description: "Swap the AC filter and check for noise.",
    role: "Maintenance",
    assignee: "Aaron Blake",
    status: "backlog",
    priority: "high",
    dueDate: new Date().toISOString().slice(0, 10)
  },
  {
    id: 2,
    title: "VIP check-in support",
    description: "Coordinate with concierge for 5pm arrival.",
    role: "Manager",
    assignee: "Nora Ahmed",
    status: "in-progress",
    priority: "critical",
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  },
  {
    id: 3,
    title: "Deep clean conference rooms",
    description: "Rooms A and B after corporate retreat.",
    role: "Housekeeping",
    assignee: "Paulina Silva",
    status: "backlog",
    priority: "medium",
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10)
  },
  {
    id: 4,
    title: "Update dessert menu",
    description: "Add seasonal fruit tart and allergy notes.",
    role: "Pastry",
    assignee: "Eric Gomez",
    status: "review",
    priority: "high",
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10)
  },
  {
    id: 5,
    title: "Bar inventory count",
    description: "Reconcile top-shelf spirits before weekend.",
    role: "Bartender",
    assignee: "Lena Fox",
    status: "in-progress",
    priority: "medium",
    dueDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10)
  },
  {
    id: 6,
    title: "Night shift coverage",
    description: "Assign two staff to cover late arrivals.",
    role: "Manager",
    assignee: "Luis Santos",
    status: "backlog",
    priority: "high",
    dueDate: new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10)
  },
  {
    id: 7,
    title: "Pool heater inspection",
    description: "Test temperature sensors and recalibrate.",
    role: "Maintenance",
    assignee: "Zoe Sun",
    status: "backlog",
    priority: "medium",
    dueDate: new Date(Date.now() + 6 * 86400000).toISOString().slice(0, 10)
  }
];

const taskTemplate = document.getElementById("taskTemplate");
const form = document.getElementById("taskForm");
const roleFilter = document.getElementById("roleFilter");
const roleSelect = form.elements.role;
const assigneeSelect = form.elements.assignee;
const searchInput = document.getElementById("searchInput");
const resetButton = document.getElementById("resetBoard");
const exportButton = document.getElementById("exportJson");

const state = {
  tasks: loadTasks(),
  filters: {
    role: "all",
    search: ""
  }
};

function loadTasks() {
  const stored = localStorage.getItem("hotel-kanban");
  if (stored) return JSON.parse(stored);
  return seedTasks;
}

function persist() {
  localStorage.setItem("hotel-kanban", JSON.stringify(state.tasks));
}

function uniqueRoles() {
  return Array.from(new Set(team.map((member) => member.role))).sort();
}

function populateFilters() {
  roleFilter.innerHTML = `<option value="all">All roles</option>` +
    uniqueRoles().map((role) => `<option value="${role}">${role}</option>`).join("");
  roleSelect.innerHTML = uniqueRoles().map((role) => `<option value="${role}">${role}</option>`).join("");
  assigneeSelect.innerHTML = team
    .map((member) => `<option value="${member.name}">${member.name} — ${member.role}</option>`)
    .join("");
}

function nextId() {
  return state.tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function applyFilters(task) {
  const roleMatch = state.filters.role === "all" || task.role === state.filters.role;
  const search = state.filters.search.trim().toLowerCase();
  const searchMatch =
    !search ||
    task.title.toLowerCase().includes(search) ||
    (task.description || "").toLowerCase().includes(search) ||
    task.assignee.toLowerCase().includes(search);
  return roleMatch && searchMatch;
}

function render() {
  const columns = statuses.reduce((acc, status) => {
    acc[status] = document.getElementById(status);
    acc[status].innerHTML = "";
    return acc;
  }, {});

  const counts = Object.fromEntries(statuses.map((status) => [status, 0]));

  state.tasks
    .filter(applyFilters)
    .sort((a, b) => statuses.indexOf(a.status) - statuses.indexOf(b.status))
    .forEach((task) => {
      counts[task.status] += 1;
      const card = taskTemplate.content.firstElementChild.cloneNode(true);
      card.dataset.id = task.id;
      card.querySelector('[data-field="id"]').textContent = task.id;
      card.querySelector('[data-field="role"]').textContent = task.role;
      card.querySelector('[data-field="title"]').textContent = task.title;
      card.querySelector('[data-field="description"]').textContent = task.description || "No details provided.";
      card.querySelector('[data-field="assignee"]').textContent = task.assignee;
      card.querySelector('[data-field="dueDate"]').textContent = formatDate(task.dueDate);
      const pill = card.querySelector('[data-field="priority"]');
      pill.textContent = task.priority;
      pill.dataset.priority = task.priority;

      card.addEventListener("dragstart", handleDragStart);
      card.addEventListener("dragend", handleDragEnd);

      card.querySelectorAll("[data-action]").forEach((button) => {
        button.addEventListener("click", () => handleAction(task.id, button.dataset.action));
      });

      columns[task.status].appendChild(card);
    });

  statuses.forEach((status) => {
    document.querySelector(`[data-count="${status}"]`).textContent = counts[status];
  });
}

function handleAction(id, action) {
  const idx = state.tasks.findIndex((task) => task.id === id);
  if (idx === -1) return;
  const task = state.tasks[idx];
  if (action === "remove") {
    state.tasks.splice(idx, 1);
  } else {
    const step = action === "next" ? 1 : -1;
    const newIndex = statuses.indexOf(task.status) + step;
    if (statuses[newIndex]) {
      task.status = statuses[newIndex];
    }
  }
  persist();
  render();
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const newTask = Object.fromEntries(formData.entries());
  state.tasks.push({
    id: nextId(),
    title: newTask.title,
    description: newTask.description,
    role: newTask.role,
    assignee: newTask.assignee,
    status: "backlog",
    priority: newTask.priority,
    dueDate: newTask.dueDate || null
  });
  persist();
  form.reset();
  render();
}

function handleDragStart(event) {
  const id = event.currentTarget.dataset.id;
  event.dataTransfer.setData("text/plain", id);
  event.currentTarget.classList.add("dragging");
}

function handleDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
}

function handleDrop(event) {
  const status = event.currentTarget.dataset.status;
  const id = Number(event.dataTransfer.getData("text/plain"));
  const task = state.tasks.find((t) => t.id === id);
  if (task && statuses.includes(status)) {
    task.status = status;
    persist();
    render();
  }
}

function enableDragAndDrop() {
  document.querySelectorAll(".column").forEach((col) => {
    col.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    col.addEventListener("drop", handleDrop);
  });
}

function exportTasks() {
  const blob = new Blob([JSON.stringify(state.tasks, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hotel-kanban-export.json";
  a.click();
  URL.revokeObjectURL(url);
}

function resetBoard() {
  state.tasks = seedTasks.map((task) => ({ ...task }));
  persist();
  render();
}

function init() {
  populateFilters();
  render();
  enableDragAndDrop();
  form.addEventListener("submit", handleSubmit);
  roleFilter.addEventListener("change", (event) => {
    state.filters.role = event.target.value;
    render();
  });
  searchInput.addEventListener("input", (event) => {
    state.filters.search = event.target.value;
    render();
  });
  exportButton.addEventListener("click", exportTasks);
  resetButton.addEventListener("click", resetBoard);
}

document.addEventListener("DOMContentLoaded", init);
