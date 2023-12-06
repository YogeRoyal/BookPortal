//Program to Store and maintain Books in an Object

const readline = require("readline-sync");

let books = [
    { Id: 25, name: "Book1", price: 23, status: "available", quantity: 6 },
    { Id: 26, name: "Book2", price: 35, status: "available", quantity: 8 },
    { Id: 27, name: "Book3", price: 26, status: "available", quantity: 12 }
]

let unavailableBooks = []

function showBooks() {
    if (unavailableBooks.length) {
        console.log(`\nUnavailable Books:
+-----+--------------------+-------+----------+
| ID  |        Name        | Price | Quantity |
+-----+--------------------+-------+----------+`);
        unavailableBooks.forEach(element => {
            console.log(`| ${element.Id} |        ${element.name}       |  $${element.price}  |     ${element.quantity}    |`);
        });
        console.log(`+-----+--------------------+-------+----------+`);
    }
    console.log(`\nAvailable Books:
+-----+--------------------+-------+----------+
| ID  |        Name        | Price | Quantity |
+-----+--------------------+-------+----------+`);
    books.forEach(element => {
        if (element.status == "available") {
            console.log(`| ${element.Id} |        ${element.name}       |  $${element.price}  |     ${element.quantity}    |`);
        }
    });
    console.log(`+-----+--------------------+-------+----------+`);
}

let cart = []
let total = 0

function addBookToCart(Id, userQuantity) {
    let flag = true;
    let { name, price, quantity } = books[Id];

    if (userQuantity <= quantity && userQuantity != 0) {
        books[Id].quantity -= userQuantity

        let ntotal = price * userQuantity

        total += ntotal
        cart.forEach(element => {
            if (element.name == name) {
                element.quantity += userQuantity
                element.total += ntotal
                flag = false
                console.log("\nBook Updated in Cart!");
            }
        })
        if (flag) {
            cart.push({ name: name, price: price, quantity: userQuantity, total: ntotal, Id: books[Id].Id })
            console.log("\nBook Added to Cart!");
        }
    } else {
        if (userQuantity == 0) {
            console.log("Enter Quantity > 0!");
            userQuantity = readline.question("Enter new Quantity available quantity is " + quantity + " : ")
            addBookToCart(Id, userQuantity)
        }
        else if (books[Id].quantity == 0) {
            console.log("\nBook Out of Stock!");
        }
        else {
            quantity = readline.question("Enter new Quantity available quantity is " + books[Id].quantity + " : ")
            addBookToCart(Id, userQuantity)
        }
    }
    if (books[Id].quantity == 0) {
        books[Id].status = "Unavailable"
        unavailableBooks.push({ name: name, price: price, quantity: 0, Id: books[Id].Id })
    }
}

function removeBook() {
    inputId = readline.questionInt("Enter Id of the book to remove from your cart: ")
    checkCartId = cart.find((element) => element.Id == inputId)
    checkBookId = books.find((element) => element.Id == inputId)
    total -= checkCartId.total
    checkBookId.quantity += checkCartId.quantity
    cart = cart.filter((element) => element.Id != inputId)
    if (checkBookId.quantity > 0) { checkBookId.status = "available" }
}
function updateCart() {
    inputId = readline.questionInt("Enter Book ID: ")
    enterQuantity = readline.questionInt("Enter Quantity of the book to Update: ")
    checkCartId = cart.find((element) => element.Id == inputId)
    checkBookId = books.find((element) => element.Id == inputId)
    if (checkCartId.quantity < enterQuantity) {
        checkBookId.quantity += (checkCartId.quantity - enterQuantity)
    } else {
        checkBookId.quantity += (checkCartId.quantity - enterQuantity)
    }
    if (checkBookId.quantity > 0) { checkBookId.status = "available" }
    checkCartId.quantity = enterQuantity
    console.log("\nHurray!!!! cart updated succesfully...");

}
function showCart() {
    if (total == 0) {
        console.log("\nYour Cart is Empty");
    } else {
        console.log("\nCart:");
        console.log(`+----+-----------+-----------+-----------+-------+`);
        console.log(`| ID |    Name   |   Price   |  Quantity | Total |`);
        console.log(`+----+-----------+-----------+-----------+-------+`);
        cart.forEach(element => {
            console.log(`| ${element.Id}|    ${element.name}  |    $${element.price}    |     ${element.quantity}     |  $${element.total}  |`);
        });
        console.log(`+----+-----------+-----------+-----------+-------+`);
        console.log("Total Cart Price = $" + total);
        let chooseOperation = readline.questionInt("\nEnter\n1:Remove Book from Cart\n2:Update Book Quantity\n3:continue\n");
        switch (chooseOperation) {
            case 1:
                removeBook();
                break;
            case 2:
                updateCart();
                break;
            default:
                break;
        }
    }
}

let choice = 0
while (choice != 4) {
    choice = readline.questionInt("\nEnter Any Number:\n1.Display Books\n2.Add Books to Cart\n3.Show Cart\n4.Exit\n")
    switch (choice) {
        case 1:
            showBooks()
            break;
        case 2:
            showBooks()
            let Id = readline.questionInt("Enter ID of book to add into cart: ")
            Id = Id - 25
            if (Id > books.length) {
                Id = readline.questionInt("Your book Id is invalid,enter a valid book Id: ")
                Id = Id - 25
            }
            let userQuantity = readline.questionInt("Enter Quantity of Book: ")
            addBookToCart(Id, userQuantity)
            break;
        case 3:
            showCart()
            break;
        case 4:
            console.log("Thanks for shopping!!\n");
            choice = 4
            break;
        default:
            console.log("Invaild Input! Enter Vaild Input\n");
            break;
    }
}