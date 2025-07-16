
let students = JSON.parse(localStorage.getItem("students")) || [];
let editingIndex = null;

function addStudent() {
  const name = document.getElementById("name").value.trim();
  const sex = document.getElementById("sex").value;
  const age = document.getElementById("age").value.trim();
  const email = document.getElementById("email").value.trim();
  const province = document.getElementById("province").value.trim();

  if (!name || !sex || !age || !email || !province) {
    alert("❌ Please fill in all fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }

  if (isNaN(age) || age <= 0) {
    alert("❌ Please enter a valid positive number for age.");
    return;
  }

  const student = { name, sex, age, email, province };

  if (editingIndex === null) {
    students.push(student);
  } else {
    students[editingIndex] = student;
    editingIndex = null;
  }

  saveToLocalStorage();
  clearForm();
  renderTable();
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("sex").value = student.sex;
  document.getElementById("age").value = student.age;
  document.getElementById("email").value = student.email;
  document.getElementById("province").value = student.province;
  editingIndex = index;
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    saveToLocalStorage();
    renderTable();
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("sex").value = "";
  document.getElementById("age").value = "";
  document.getElementById("email").value = "";
  document.getElementById("province").value = "";
}

function renderTable() {
  const tbody = document.getElementById("studentTable");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.sex}</td>
      <td>${student.age}</td>
      <td>${student.email}</td>
      <td>${student.province}</td>
      <td>
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

renderTable();
