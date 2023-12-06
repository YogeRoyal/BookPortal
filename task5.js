//task5 ,  maintain and store,retrieve Books in an Object

const readline = require("readline-sync");

let books = [
    {Id:25,name:"Book1",price:23,status:"available",quantity:6},
    {Id:26,name:"Book2",price:35,status:"available",quantity:8},
    {Id:27,name:"Book3",price:26,status:"available",quantity:12}]

function showBooks() {
    console.log(`\nAvailable Books:
+-----+--------------------+-------+----------+
| ID  |        Name        | Price | Quantity |
+-----+--------------------+-------+----------+`);
    books.forEach(element => {
        if (element.quantity==0) {
            element.status="Unavailable"
        }
        if (element.status=="available"){
        console.log(`| ${element.Id} |        ${element.name}       |  $${element.price}  |     ${element.quantity}    |`);
        }
    });
    console.log(`+-----+--------------------+-------+----------+`);
}

let cart = []
let total = 0

function  addBookToCart(Id,userQuantity) {
    let flag = true;
    let {name,price,quantity} = books[Id];
     
    if (userQuantity<=quantity && userQuantity!=0) {
        books[Id].quantity -= userQuantity
        
        let totalPrice = price*userQuantity

        total += totalPrice
        cart.forEach(element => {
            if (element.name==name){
                element.quantity += userQuantity
                element.total += totalPrice
                flag = false
                console.log("\nBook Updated in Cart!");
            }
        })
        if (flag) {
            cart.push({name:name,price:price,quantity:userQuantity,total:totalPrice,Id:books[Id].Id})
            console.log("\nAdded to Cart succesfully!");
        }
    } else {
        if (userQuantity==0){
            console.log("Enter Quantity > 0!");
            userQuantity=readline.question("Enter new quantity "+quantity+" : ")
            addBookToCart(Id,userQuantity)
        }
        else if(books[Id].quantity==0) {
            console.log("\nOops!,out of stock");
        }
        else{
            quantity=readline.question("Enter available quantity: "+books[Id].quantity+" : ")
            addBookToCart(Id,userQuantity)
        }
    }
}

function showCart() {
    if (total==0) {
        console.log("Cart !!! is empty");
    } else {
        console.log("\nCart:");
        console.log(`+----+-----------+-----------+-----------+-------+`);
        console.log(`| ID |    Name   |   Price   |  Quantity | Total |`);
        console.log(`+----+-----------+-----------+-----------+-------+`);
        cart.forEach(element => {
            console.log(`| ${element.Id}|    ${element.name}  |    $${element.price}    |     ${element.quantity}     |  $${element.total}  |`); 
        });
        console.log(`+----+-----------+-----------+-----------+-------+`);
        console.log("Total Cart Price = $"+total);
        let ch = readline.questionInt("\nEnter\n1:Remove Book from Cart\n2:Update Book Quantity\n3:continue\n");
        switch (ch) {
            case 1:
                inputId=readline.questionInt("Enter Id of the book to remove from your cart: ")
                checkCartId = cart.find((element)=>element.Id==inputId)
                checkBookId = books.find((element)=>element.Id==inputId)
                total-=checkCartId.total
                checkBookId.quantity += checkCartId.quantity
                cart=cart.filter((element)=>element.Id!=inputId)
                
                break;
            case 2:
                inputId=readline.questionInt("Enter Book ID: ")
                enterQuantity = readline.questionInt("Enter Quantity of the book to Update: ")
                checkCartId = cart.find((element)=>element.Id==inputId)
                checkBookId = books.find((element)=>element.Id==inputId)
                if (checkCartId.quantity<enterQuantity) {
                    checkBookId.quantity+=(checkCartId.quantity-enterQuantity)
                    books.price=books.price*enterQuantity
                } else {
                    checkBookId.quantity+=(checkCartId.quantity-enterQuantity)
                }
                if (checkBookId.quantity>0){checkBookId.status="available"}
                checkCartId.quantity=enterQuantity
                checkCartId.total=enterQuantity*checkCartId.price
                console.log("\nHurray!!!! cart updated succesfully...");
                break;
            default:
                break;
        }
    }
}

let choice = 0
while (choice!=4) {
    choice = readline.questionInt("\nEnter Any Number:\n1.Display Books\n2.Add Books to Cart\n3.Show Cart\n4.Exit\n")
    switch (choice) {
        case 1:
            showBooks()
            break;
        case 2:
            showBooks()
            let Id = readline.questionInt("Enter ID of book to add into cart: ")
            Id=Id-25
            if (Id>books.length) {
                Id = readline.questionInt("Your book Id is invalid,enter a valid book Id: ")
                Id=Id-25
            }
            let userQuantity = readline.questionInt("Enter Quantity of Book: ")
            addBookToCart(Id,userQuantity)
            break;
        case 3:
            showCart()
            break;
        case 4:
            console.log("Thanks for shopping!!\n");
            choice=4
            break;
        default:
            console.log("Invaild Input! Enter Vaild Input\n");
            break;
    }
}
