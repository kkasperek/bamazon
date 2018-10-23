//npm install mysql and inquirer 
var mysql = require("mysql");
var inquirer = require("inquirer");

//connect to bamazon_db database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    showProducts();     // first show the products
    getUserInput();     // then call use the inquirer prompt 
});

// function to show available products
function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let record in res) {
            let product = res[record]
            console.log("PRODUCT AVAILABLE: " +
                "\n Item ID: " + product.item_id +
                "\n Product Name: " + product.product_name +
                "\n Department: " + product.department_name +
                "\n Price: " + product.price +
                "\n Stock Quantity: " + product.stock_quantity +
                "\n----------------------------"
            );
        }
    });
}

// function to prompt user the product id and then the quantity
function getUserInput() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the id of the product you would like to order?",
            name: 'item_id'
        },
        {
            type: 'input',
            message: "How many would you like?",
            name: "userQuantity"
        }
    ]).then(function (answers) {
        console.log(answers);
        checkStock(answers);    // pass the answers given into the check stock function
    });
}
// function to check the stock of the product against the users input 
function checkStock(answers) {
    connection.query("SELECT stock_quantity, item_id, price FROM products WHERE item_id ='" + answers.item_id + "'", function (err, res) {
        if (err) throw err;
        // if there is enough in stock ...
        if (answers.userQuantity <= res[0].stock_quantity) {
            var newQuantity = res[0].stock_quantity - answers.userQuantity;
            var cost = answers.userQuantity * res[0].price;
            console.log("Price " + res[0].price)
            console.log("New quantity: " + newQuantity);

            //  Update products in query 
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [{ stock_quantity: newQuantity },
                { item_id: answers.item_id }],
                function (err, res) {
                    if (err) throw err;
                    console.log("The cost of your order is $" + cost);
                    connection.end();
                })
        } // else log not enough in stock
        else {
            console.log("Insufficient quantity");

            connection.end();       // end connection to the server 
        }
    });
}