console.log(localStorage.getItem("projects"));
const projects = JSON.parse(
  localStorage.getItem("projects") ?? '{"default": []}'
);

function addTask(project, task) {
  projects[project].push(task);
}
const projectSelect = document.getElementById("project");
const visibleSelect = document.getElementById("visible");

const generateProjects = () => {
  projectSelect.innerHTML = "";
  visibleSelect.innerHTML = "";
  const option = document.createElement("option");
  option.value = "All";
  option.textContent = "All";
  visibleSelect.appendChild(option);
  Object.keys(projects).forEach((project) => {
    const option = document.createElement("option");
    option.value = project;
    option.textContent = project;
    projectSelect.appendChild(option);
    const visible = document.createElement("option");
    visible.value = project;
    visible.textContent = project;
    visibleSelect.appendChild(visible);
  });
};
generateProjects();
visibleSelect.addEventListener("change", generateTable);
const addProjectButton = document.getElementById("addProject");
addProjectButton.addEventListener("click", () => {
  const name = prompt("Project Name?");
  if (!name || name === "") {
    return;
  }
  projects[name] = [];
  generateProjects();
});
const removeVisibleButton = document.getElementById("removeVisible");
removeVisibleButton.addEventListener("click", () => {
  if (visibleSelect.value !== "All") {
    delete projects[visibleSelect.value];
    generateProjects();
  }
});
class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    // this.priority = priority
  }
}

const submitButton = document.querySelector("#submitButton");

const box = document.querySelector("#box");

const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const dueDateInput = document.getElementById("dueDate");
const indexInput = document.getElementById("index");
const previousProjectInput = document.getElementById("previousProject");

generateTable();

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (titleInput.value === "") {
    return;
  }
  const title = titleInput.value;
  const desc = descInput.value;
  const dueDate = dueDateInput.value;
  const project = projectSelect.value;
  titleInput.value = "";
  descInput.value = "";
  dueDateInput.value = "";
  let x = new Task(title, desc, dueDate);
  if (submitButton.textContent === "Add") {
    console.log(project);

    addTask(project, x);
  } else {
    const previousProject = previousProjectInput.value;
    const i = indexInput.value;
    if (project === previousProject) {
      projects[project][i] = x;
    } else {
      addTask(project, x);
      projects[previousProject].splice(i, 1);
    }
    submitButton.textContent = "Add";
  }
  localStorage.setItem("projects", JSON.stringify(projects));
  generateTable();
});

function generateTable() {
  let table = document.createElement("table");
  const titleHeader = document.createElement("th");
  const descHeader = document.createElement("th");
  const dateHeader = document.createElement("th");
  const projectHeader = document.createElement("th");
  projectHeader.textContent = "Project";
  titleHeader.textContent = "Title";
  descHeader.textContent = "Description";
  dateHeader.textContent = "Due Date";
  const headerRow = document.createElement("tr");
  headerRow.appendChild(titleHeader);
  headerRow.appendChild(descHeader);
  headerRow.appendChild(dateHeader);
  headerRow.appendChild(projectHeader);
  table.appendChild(headerRow);

  table.style.border = "1px solid #000";
  let selectedProjects = projects;
  if (visibleSelect.value !== "All") {
    selectedProjects = { [visibleSelect.value]: projects[visibleSelect.value] };
    console.log(selectedProjects);
  }
  Object.entries(selectedProjects).forEach(([project, tasks]) => {
    tasks.forEach(({ title, description, dueDate }, i) => {
      const row = document.createElement("tr");
      const deleteButton = document.createElement("button");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        projects[project].splice(i, 1);
        generateTable();
      });

      editButton.addEventListener("click", () => {
        titleInput.value = title;
        descInput.value = description;
        dueDateInput.value = dueDate;
        projectSelect.value = project;
        previousProjectInput.value = project;
        submitButton.textContent = "Update";
        indexInput.value = i;
      });
      [title, description, dueDate, project].forEach((prop) => {
        const cell = document.createElement("td");
        cell.textContent = prop;
        row.appendChild(cell);
      });
      row.appendChild(deleteButton);
      row.appendChild(editButton);
      table.appendChild(row);
    });
  });
  box.innerHTML = "";
  box.appendChild(table);
}
