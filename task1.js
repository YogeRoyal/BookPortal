// Task1
//show available books to users --> 
// 	here you have to show all list items
	
// add book --> 
// 	here you have to take i/p from user to add book in cart --> that i/p can be index no of book from that list --> for this you have to maintain one list as cart & you have to add this book in that list --> while adding that book in list you have to pass quantity as 1 
// 	-- once you add that book cart you have to update the quantity in book list -- like you have to decrease the quantity by one & update the same in list 
	
// show cart -->
// 	here you just have to show the cart list which you are creating while adding book	
	

const readline = require("readline-sync");

const bookStore = [
    { name: "Book1", price: 20, status: "available", quantity: 5 },
    { name: "Book2", price: 30, status: "available", quantity: 8 },
    { name: "Book3", price: 25, status: "available", quantity: 10 }
];

const cart = [];

function showAvailableBooks() {
    let bookIndex=1;
    console.log(`Available Books:
+-----+-----------+--------+------------+---------+
| ID  |   Name    |  Price |    Status  | Quantity |
+-----+-----------+--------+------------+---------+`);
    bookStore.forEach(book => {
        console.log(`|  ${bookIndex}   |  ${book.name}   |  $${book.price}   |  ${book.status} |     ${book.quantity}   |`);
        bookIndex++;
    });
    console.log(`+-----+-----------+----------+----------+----------+`);
}



function addBookToCart(bookIndex, quantity) {
    const selectedBook = bookStore[bookIndex];

    if (selectedBook.status === "available" && selectedBook.quantity >= quantity) {
        console.log("hi");
        cart.push({
            name: selectedBook.name,
            price: selectedBook.price,
            quantity: quantity,
            totalPrice: selectedBook.price * quantity
        });

        // Update book quantity in the store
        selectedBook.quantity -= quantity;

        console.log("\nBook added to cart successfully!");
    } else {
        console.log("\nBook is not available or insufficient quantity.");
    }
}

function showCart() {
    console.log("\nShopping Cart:");
    cart.forEach(item => {
        console.log(`Name: ${item.name}, Price: $${item.price}, Quantity: ${item.quantity}, Total Price: $${item.totalPrice}`);
    });

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

            addBookToCart(bookIndex, quantity)
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