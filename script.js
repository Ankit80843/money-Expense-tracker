let expenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];

function addExpense(name, amount, date) {
    const expense = { name, amount, date };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("Expense added successfully.");
    alert("Expense added successfully.");
    updateExpenseList();
}

function updateExpenseList() {
    const expenseList = document.getElementById("content");
    expenseList.innerHTML = "";

    let totalExpense = 0;

    expenses.forEach((expense, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div class="show_data">
                <span>${expense.name}</span>
                <span>Amount: ₹${expense.amount}</span>
                <span>Date: ${expense.date}</span>
                <button class="edit" onclick="editExpense(${index})">Edit</button>
                <button class="delete" onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;
        expenseList.appendChild(listItem);

        totalExpense += parseFloat(expense.amount);
    });

    const totalExpenseDiv = document.createElement("div");
    totalExpenseDiv.innerHTML = `<p class="Total_amount">Total Expense: ₹${totalExpense}</p>`;
    expenseList.appendChild(totalExpenseDiv);
}

function showAddExpenseForm() {
    const content = document.getElementById("content");
    content.innerHTML = `
        <div class="display">
            <form id="add-expense-form">
                <h2 class="ADD">Add Expense</h2>
                <label for="expense-name" class="input">Expense Name:</label>
                <input type="text" id="expense-name" required placeholder="Enter Expense Name">
                <label for="expense-amount" class="input">Amount:</label>
                <input type="number" id="expense-amount" required placeholder="Enter Amount">
                <br>
                <label for="expense-Date" class="input">Date:</label>
                <input type="date" id="expense-Date" required placeholder="Date">
                <button type="button" onclick="submitExpense()" class="add_button">Add Expense</button>
            </form>
        </div>
    `;
}

function submitExpense() {
    const expenseName = document.getElementById("expense-name").value;
    const expenseAmount = parseFloat(document.getElementById("expense-amount").value);
    const expenseDate = document.getElementById("expense-Date").value;

    if (expenseName && !isNaN(expenseAmount)) {
        addExpense(expenseName, expenseAmount, expenseDate);
        document.getElementById("add-expense-form").reset();
    } else {
        alert("Invalid input. Please enter valid name and amount.");
    }
}

function editExpense(index) {
    const listItem = document.createElement("li");
    const expense = expenses[index];

    listItem.innerHTML = `
        <div class="Edit_box">
            <input type="text" id="edit-name" placeholder="Enter New Name" required>
            <input type="number" id="edit-amount" placeholder="New Amount" required>
            <button onclick="saveEditedExpense(${index})">Save</button>
            <button onclick="cancelEdit()">Cancel</button>
        </div>
    `;

    const content = document.getElementById("content");
    content.replaceChild(listItem, content.childNodes[index]);
}

function saveEditedExpense(index) {
    const newName = document.getElementById("edit-name").value;
    const newAmount = parseFloat(document.getElementById("edit-amount").value);

    if (newName && !isNaN(newAmount)) {
        expenses[index].name = newName;
        expenses[index].amount = newAmount;
        localStorage.setItem("expenses", JSON.stringify(expenses));
        console.log("Expense edited successfully.");
        alert("Edit done");
        updateExpenseList();
    } else {
        alert("Invalid input. Please enter valid name and amount.");
    }
}

function cancelEdit() {
    updateExpenseList();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("Expense deleted successfully.");
    alert("Expense deleted successfully.");
    updateExpenseList();
}

window.onload = function() {
    updateExpenseList();
};
