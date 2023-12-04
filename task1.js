//Program to Store and maintain Books in an Object

const readline = require("readline-sync");

let book = [
    {
        name:"Book1",
        price:25,
        status:"available",
        quantity:12
    },
    {
        name:"Book2",
        price:20,
        status:"available",
        quantity:7
    },
    {
        name:"Book3",
        price:50,
        status:"available",
        quantity:8
    }]

function displayBooks() {
    let id = 1
    console.log(`Available Books:
+----+--------------------+-------+----------+
| ID |        Name        | Price | Quantity |
+----+--------------------+-------+----------+`);
    book.forEach(ele => {
        console.log(`| ${id}  |        ${ele.name}       |  $${ele.price}  |     ${ele.quantity}    |`);
        id++
    });
    console.log(`+----+--------------------+-------+----------+`);
}

let cart = []
let total = 0

function addBook(id) 
{
    let name = book[id-1].name
    let price = book[id-1].price
    book[id-1].quantity-=1
    total += price
    cart.push({name:name,price:price,quantity:1,total:total})
}

function showCart() {
    if (total==0) 
    {
        console.log("Your Cart is Empty");
    } else 
    {
        console.log(cart);
    }
}

let choice = 0

while (choice!=4) 
{
    choice = readline.questionInt("\nEnter a Number:\n1.Display Books\n2.Add Books to Cart\n3.Show Cart\n4.Exit\n")
    switch (choice) 
    {
        case 1:
            displayBooks()
            break;
        case 2:
            let id = readline.questionInt("Add Book in cart by entering book Id: ")
            addBook(id)
            break;
        case 3:
            showCart()
            break;
        case 4:
            console.log("Thank you for shopping!!\n");
            choice=4
            break;
        default:
            console.log("Oops,Invalid input,Enter a valid input\n");
            break;
    }
}