	
// 3rd task :-

// add book --> 
// 	here while taking quantity you have to check 
//     if that much quantity is available or not --> 
//     if available directly add to cart ---> 
//     else show one message for available quantity --> & take new quantity

const readline = require("readline-sync");
const bookStore = [
    { name: "Book1", price: 10, status: "available", quantity: 5 },
    { name: "Book2", price: 15, status: "available", quantity: 8 },
    { name: "Book3", price: 20, status: "available", quantity: 3 }
];

const cart = [];


function showAvailableBooks() {
    let bookIndex=1;
    console.log(`Available Books:
+-----+-----------+--------+------------+---------+
| ID  |   Name    |  Price |    Status  | Quantity |
+-----+-----------+--------+------------+---------+`);
    bookStore.forEach(book => {
        if(book.quantity==0){
            book.status="unavailable"
        }
        console.log(`|  ${bookIndex}   |  ${book.name}   |  $${book.price}   |  ${book.status} |     ${book.quantity}   |`);
        bookIndex++;
    });
    console.log(`+-----+-----------+----------+----------+----------+`);
}

function addBookToCart(bookIndex, quantity) {
    const selectedBook = bookStore[bookIndex];

    if (selectedBook && selectedBook.status === "available" && selectedBook.quantity >= quantity) {
        // Decrease the quantity in available books
        selectedBook.quantity -= quantity;

        // Add the book to the cart
        cart.push({
            name: selectedBook.name,
            price: selectedBook.price,
            quantity: quantity,
            totalPrice: selectedBook.price * quantity
        });

        console.log(`\n"${selectedBook.name}" added to the cart.`);
    }else {
        console.log(`\nUnable to add "${selectedBook.name}" to the cart. Please check availability and quantity.`);
        let newquantity = readline.questionInt("Please,Enter new quantity of book: ");
        
        addBookToCart(bookIndex, newquantity)

    }
}

function showCart() {
    console.log("\nShopping Cart:");
    cart.forEach(item => {
        console.log(`${item.name} - Price: $${item.price} - Quantity: ${item.quantity} - Total Price: $${item.totalPrice}`);
    });

    // Calculate and display the total cart value
    const totalCartValue = cart.reduce((total, item) => total + item.totalPrice, 0);
    console.log(`\nTotal Cart Value: $${totalCartValue}`);
}

let choice = 0;
while (choice != 4) {

    choice = readline.questionInt("\nEnter a Number:\n1.Display Books\n2.Add Books to Cart\n3.Show Cart\n4.Exit\n")
    switch (choice) {
        case 1:
            showAvailableBooks()
            break;
        case 2:
            let bookIndex = readline.questionInt("Add Book in cart by entering book Id: ")
            let quantity = readline.questionInt("Add the quantity of book: ")

            addBookToCart(bookIndex-1, quantity)
            showAvailableBooks()
            break;
        case 3:
            showCart()
            showAvailableBooks()
            break;
        case 4:
            console.log("Thank you for shopping!!\n");
            choice = 4
            break;
        default:
            console.log("Oops,Invalid input,Enter a valid input\n");
            break;
    }
}