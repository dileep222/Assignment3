// Selecting the price blocks in the card component
const notebookPrice = document.getElementById("notebook-price");
const penPrice = document.getElementById("pen-price");
const bagPrice = document.getElementById("bag-price");

// Selecting the show buttons in the card component
const notebookShow = document.getElementById("notebook-show");
const penShow = document.getElementById("pen-show");
const bagShow = document.getElementById("bag-show");

// Selecting the hide buttons in the card component
const notebookHide = document.getElementById("notebook-hide");
const penHide = document.getElementById("pen-hide");
const bagHide = document.getElementById("bag-hide");


// Selecting form inputs
const notebookInput = document.getElementById("notebookinput");
const penInput = document.getElementById("peninput");
const bagInput = document.getElementById("baginput");
const name = document.getElementById("name");
const customernumber = document.getElementById("customernumber");

// Selecting form error fields
const notebookError = document.getElementById("notebookerror");
const penError = document.getElementById("penerror");
const bagError = document.getElementById("bagerror");
const nameError = document.getElementById("nameerror");
const postcodeError = document.getElementById("customernumbererror");
const inputError = document.getElementById('inputerror');

// Selecting table
const table = document.getElementById("table");
const tbody = document.getElementById("tbody");

// Selecting customer divs
const customer = document.getElementById("customer");
const cnumber = document.getElementById("cnumber")

//Regex for customer number verification
const canadaPostRegex = /^([a-zA-Z0-9_-]){2}-\d{3}-\d{2}/;


// function to show the prices of each card component
const showPrice = event => {
    // Preventing default button actions
    event.preventDefault();
    // Showing color card prices
    if (event.target === notebookShow) {
        notebookPrice.classList.add("d-block");
        notebookShow.classList.add("d-none");
        notebookHide.classList.add("d-block");
    } else if (event.target === penShow) {// Showing grayscale card prices
        penPrice.classList.add("d-block");
        penShow.classList.add("d-none");
        penHide.classList.add("d-block");
    } else { // Showing scan card prices
        bagPrice.classList.add("d-block");
        bagShow.classList.add("d-none");
        bagHide.classList.add("d-block");
    }
}

// function to hide the prices of each card component
const hidePrice = event => {
    event.preventDefault();
    // Hiding color card prices
    if (event.target === notebookHide) {
        notebookPrice.classList.remove("d-block");
        notebookShow.classList.remove("d-none");
        notebookHide.classList.remove("d-block");
    } else if (event.target === penHide) { // Hiding grayscale card prices
        penPrice.classList.remove("d-block");
        penShow.classList.remove("d-none");
        penHide.classList.remove("d-block");
    } else { // Hiding scan card prices
        bagPrice.classList.remove("d-block");
        bagShow.classList.remove("d-none");
        bagHide.classList.remove("d-block");
    }
}

// Function to handle the form submission
const submitForm = event => {
    event.preventDefault();
    let error = false;
    let emptyInput = 0;
    let notebookSucess = false;
    let penSuccess = false;
    let bagSuccess = false;

    // Name Validation
    if (name.value == null || name.value == "") {
        nameError.innerHTML = "Please enter your name";
        error = true;
        emptyInput++;
    } else {
        nameError.innerHTML = "";
    }

    // Pin-Code validation
    if (customernumber.value == null || customernumber.value == "") {
        postcodeError.innerHTML = "Please enter your customernumber";
        error = true;
        emptyInput++;
    } else if (!canadaPostRegex.test(customernumber.value)) {
        postcodeError.innerHTML = "Please enter a valid canadian customernumber";
        error = true;
    } else {
        postcodeError.innerHTML = "";
    }

    // Color input validation
    if (notebookInput.value != null && notebookInput.value != "") {
        if (isNaN(notebookInput.value)) {
            notebookError.innerHTML = "Please enter a number";
            error = true;
            emptyInput++;
        } else {
            notebookError.innerHTML = "";
        }
        notebookSucess = true;
    }

    // Grayscale input validation
    if (penInput.value != null && penInput.value != "") {
        if (isNaN(penInput.value)) {
            penError.innerHTML = "Please enter a number";
            error = true;
        } else {
            penError.innerHTML = "";
        }
        penSuccess = true;
    }

    //Scan input validation
    if (bagInput.value != null && bagInput.value != "") {
        if (isNaN(bagInput.value)) {
            bagError.innerHTML = "Please enter a number";
            error = true;
        } else {
            bagError.innerHTML = "";
        }
        bagSuccess = true;
    }

    if (error) {
        return;
    }

    if (emptyInput === 3) {
        inputError.innerHTML = "Please order atleast one item";
        return;
    }

    let total = 0;
    while (tbody.childNodes.length > 1) {
        tbody.removeChild(tbody.lastChild);
    }

    // Calculating and rendering the color input in the table
    if (notebookSucess) {
        const tr = document.createElement('tr');
        let count = 0;
        // Filling the all four columns
        while (count < 4) {
            const td = document.createElement('td');
            td.classList.add("cell");
            if (count == 0) {
                td.innerHTML = "Notebook"
            } else if (count == 1) {
                td.innerHTML = `${notebookInput.value}`
            } else if (count == 2) {
                td.innerHTML = "$12.00"
            } else {
                td.innerHTML = `$${notebookInput.value * 12.00}`
                total += notebookInput.value * 12.00;
            }
            count++;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }


    // Calculating and rendering the grayscale input in the table
    if (penSuccess) {
        const tr = document.createElement('tr');
        let count = 0;
        while (count < 4) {
            const td = document.createElement('td');
            td.classList.add("cell");
            if (count == 0) {
                td.innerHTML = "Pen"
            } else if (count == 1) {
                td.innerHTML = `${penInput.value}`
            } else if (count == 2) {
                td.innerHTML = "$2.50"
            } else {
                td.innerHTML = `$${penInput.value * 2.50}`
                total += penInput.value * 2.50;
            }
            count++;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // Calculating and rendering the scan input in the table
    if (bagSuccess) {
        const tr = document.createElement('tr');
        let count = 0;
        while (count < 4) {
            const td = document.createElement('td');
            td.classList.add("cell");
            if (count == 0) {
                td.innerHTML = "Bag"
            } else if (count == 1) {
                td.innerHTML = `${bagInput.value}`
            } else if (count == 2) {
                td.innerHTML = "$32.50"
            } else {
                td.innerHTML = `$${bagInput.value * 32.50}`
                total += bagInput.value * 32.50;
            }
            count++;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }


    // BLock to add the subtotal
    {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.classList.add("cell");
        td.setAttribute("colspan", "3");
        td.innerHTML = "Subtotal";
        tr.appendChild(td)
        const td1 = document.createElement('td');
        td1.classList.add("cell");
        td1.innerHTML = `$${(total).toFixed(2)}`
        tr.appendChild(td1)
        tbody.appendChild(tr);
    }

    // BLock to add the taxes
    {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.classList.add("cell");
        td.setAttribute("colspan", "3");
        td.innerHTML = "Tax@13%";
        tr.appendChild(td)
        const td1 = document.createElement('td');
        td1.classList.add("cell");
        td1.innerHTML = `$${(total * 0.13).toFixed(2)}`
        tr.appendChild(td1)
        total += total * 0.13;
        tbody.appendChild(tr);
    }

    // BLock to add the total
    {
        const tr = document.createElement('tr');
        const td = document.createElement('td'); 
        td.classList.add("cell");
        td.setAttribute("colspan", "3");
        td.innerHTML = "Total";
        tr.appendChild(td);
        const td1 = document.createElement('td');
        td1.classList.add("cell");
        td1.innerHTML = `$${total.toFixed(2)}`
        tr.appendChild(td1)
        tbody.appendChild(tr);
    }

    // Rendering the customer name
    customer.innerHTML = `Customer Name: ${name.value}`;
    cnumber.innerHTML = `Customer Number: ${customernumber.value}`;
}