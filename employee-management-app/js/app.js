// Function to handle the toggle of the navigation menu for mobile screens
function toggleNav() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.toggle("show");
}

// Function to add an employee to the localStorage
function addEmployee(event) {
    event.preventDefault();

    // Get form input values
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const about = document.getElementById("about").value;
    const joiningDate = document.getElementById("joining-date").value;

    if (name && position && about && joiningDate) {
        // Create an employee object
        const employee = {
            name,
            position,
            about,
            joiningDate
        };

        // Get existing employees from localStorage or create an empty array
        let employees = JSON.parse(localStorage.getItem("employees")) || [];

        // Add new employee to the array
        employees.push(employee);

        // Save the updated employees list to localStorage
        localStorage.setItem("employees", JSON.stringify(employees));

        // Redirect to the employee listing page
        window.location.href = "listing.html";
    } else {
        alert("Please fill in all fields.");
    }
}

// Function to display the employee list in the table
function displayEmployees() {
    // Get employee data from localStorage
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    
    // Get the table body element
    const tbody = document.querySelector("#employee-table tbody");

    // Clear previous table rows
    tbody.innerHTML = "";

    // Loop through employees and display each one in the table
    employees.forEach((employee, index) => {
        const row = document.createElement("tr");
        
        // Create cells for each employee field
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.about}</td>
            <td>${employee.joiningDate}</td>
            <td><button onclick="removeEmployee(${index})">Remove</button></td>
        `;
        
        // Append the row to the table
        tbody.appendChild(row);
    });

    // Call function for pagination
    paginateEmployees();
}

// Function to remove an employee from localStorage
function removeEmployee(index) {
    // Get employee data from localStorage
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    
    // Remove the employee from the array
    employees.splice(index, 1);

    // Save the updated employee list to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    // Refresh the employee list after deletion
    displayEmployees();
}

// Function to search employees by name
function searchEmployee() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    
    // Get employee data from localStorage
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    
    // Filter employees based on search term
    const filteredEmployees = employees.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm)
    );

    // Display filtered employees in the table
    const tbody = document.querySelector("#employee-table tbody");
    tbody.innerHTML = "";
    filteredEmployees.forEach((employee, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.about}</td>
            <td>${employee.joiningDate}</td>
            <td><button onclick="removeEmployee(${index})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Pagination functionality
let currentPage = 1;
const itemsPerPage = 5;

function paginateEmployees() {
    // Get employee data from localStorage
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    // Calculate the total number of pages
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    // Get the current page of employees to display
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const employeesToDisplay = employees.slice(startIndex, endIndex);

    // Get the table body element
    const tbody = document.querySelector("#employee-table tbody");
    
    // Clear the table body and display the paginated employees
    tbody.innerHTML = "";
    employeesToDisplay.forEach((employee, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.about}</td>
            <td>${employee.joiningDate}</td>
            <td><button onclick="removeEmployee(${startIndex + index})">Remove</button></td>
        `;
        tbody.appendChild(row);
    });

    // Update pagination buttons
    updatePaginationButtons(totalPages);
}

// Update the pagination buttons
function updatePaginationButtons(totalPages) {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    // Create 'Previous' button
    const prevButton = document.createElement("button");
    prevButton.textContent = "Prev";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = prevPage;
    paginationDiv.appendChild(prevButton);

    // Create 'Next' button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = nextPage;
    paginationDiv.appendChild(nextButton);
}

// Function to go to the previous page in the pagination
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        paginateEmployees();
    }
}

// Function to go to the next page in the pagination
function nextPage() {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const totalPages = Math.ceil(employees.length / itemsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        paginateEmployees();
    }
}

// Call displayEmployees() on the employee listing page load
if (document.getElementById("employee-table")) {
    displayEmployees();
}

// Call searchEmployee() on search input
if (document.getElementById("search")) {
    document.getElementById("search").addEventListener("input", searchEmployee);
}

// Handle form submission for employee registration
if (document.getElementById("employee-form")) {
    document.getElementById("employee-form").addEventListener("submit", addEmployee);
}
