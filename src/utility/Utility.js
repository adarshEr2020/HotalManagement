const fs = require('fs');
const CustomerDetails = require("./CustomerDetails");
const Orders = require("./Orders");
const Services = require("./Services");
const prompt = require("prompt-sync")();

class Utility {
    mainMenu() {
        console.log("\nPress 1: Register-" + "\nPress 2: Login- " + "\nPress 3: Exit-");
        return parseInt(prompt("Enter menu option: "));
    }

    register() {
        let customer = new CustomerDetails();
        console.log("\n")
        customer.name = prompt("Enter your name: ");
        customer.mobileNo = prompt("Enter your mobile no: ");
        customer.gender = prompt("Enter your gender: ");
        customer.email = prompt("Enter your email: ");
        customer.stayOfDays = prompt("Enter days you want to stay: ")
        customer.uniqueKey = this.generateUniqueKey(customer.name, customer.mobileNo);
        this.writeDataToJson(customer);
        console.log(customer.name + " you have registered successfully:")
    }

    // customer key generation-
    generateUniqueKey(name, mobileNo) {
        return name.substring(0, 4) + mobileNo.substring(0, 4);
    }


    writeDataToJson(customer) {
        const doc = fs.readFileSync("./json/customer.json");
        const docObj = JSON.parse(doc);
        docObj.push(customer);
        const str = JSON.stringify(docObj);
        fs.writeFileSync("./json/customer.json", str);

    }

    // login login- 
    login() {

        let name = prompt("Enter user name: ");
        let password = prompt("Enter your password: ")

        const doc = fs.readFileSync("./json/customer.json");
        const docObj = JSON.parse(doc);

        for (let user in docObj) {
            if ((docObj[user].name === name && docObj[user].uniqueKey === password)) {
                this.customer = docObj[user];
                console.log("\n|--- Welcome", this.customer.name + "! ---|");
                this.customerMenu();
            } else console.log("Incorrect matched");
        }
        console.log("");
    }

    // customer login services-
    customerMenu() {
        let flag = true;
        while (flag) {
            console.log("\nPress 1: Oder food-" + "\nPress 2: Other services-" + "\nPress 3: Checkout" + "\npress 4: Exit");
            let option = parseInt(prompt("Enter option:"));
            switch (option) {
                case 1:
                    console.log("\n|--- You can place the order for food: ---|");
                    this.orderFoodMenu();
                    break;
                case 2:
                    console.log("|--- You can place other services: ---|");
                    this.otherServices();
                    break;
                case 3:
                    console.log("|--- You can do checkout: ---|");
                    this.checkoutMenu();
                    break;
                case 4:
                    console.log(("\nYou are in Exit" + "\n|--- Hope you have enjoyed services: ---|"));
                    flag = false;
                    break;
                default:
                    console.log("\nYou Entered Wrong...");
                    break;
            }
        }
    }

    // customers order food serviecs-
    orderFoodMenu() {
        let flag = true;
        while(flag){
            console.log("\nPress 1 - Order Tea (50rs)");
            console.log("Press 2 - Order Breakfast (100rs)");
            console.log("Press 3 - Order Lunch (250rs)");
            console.log("Press 4 - Order Dinner (350rs)");
            console.log("Press 5 - Back\n");
           let option = parseInt(prompt("Enter choice"));

            switch (option) {
                case 1:
                    this.writeOrdersInJson(new Orders(this.customer.uniqueKey, "Tea", 1, 50));
                    console.log("\nOrder placed successfully");
                    break;
                case 2:
                    this.writeOrdersInJson(new Orders(this.customer.uniqueKey, "Breakfast", 1, 100));
                    console.log("\nOrder placed successfully");
                    break;
                case 3:

                    this.writeOrdersInJson(new Orders(this.customer.uniqueKey, "Lunch", 1, 250));
                    console.log("\nOrder placed successfully");
                    break;
                case 4:
                    this.writeOrdersInJson(new Orders(this.customer.uniqueKey, "Dinner", 1, 350));
                    console.log("\nOrder placed successfully");
                    break;
                case 5:
                    flag = false;
                    break;
            }

        }
    }

    // customers order other services-
    otherServices() {
        let flag = true;
        while(flag){
            console.log("\nPress 1 - Order Bedsheet(250rs)");
            console.log("Press 2 - Order Blancket(350rs)");
            console.log("Press 3 - Back\n");
            let option = parseInt(prompt("Enter choice"));

            switch (option) {
                case 1:
                    this.writeOtherServicesTnJson(new Services(this.customer.uniqueKey, "Bedsheet", 1, 250));
                    console.log("\nOrder placed successfully");
                    break;
                case 2:
                    this.writeOtherServicesTnJson(new Services(this.customer.uniqueKey, "Blancket", 1, 350));
                    console.log("\nOrder placed successfully");
                    break;
                case 3:
                    flag = false;
                    break;
            }

        }
    }

    // customer checkout services-
    checkoutMenu() {
        console.log("checout hotel:");
    }

    //  customer orders read-write data in json
    writeOrdersInJson(customer) {
        const doc = fs.readFileSync("./json/order.json");
        const docObj = JSON.parse(doc);
        docObj.push(customer);
        const str = JSON.stringify(docObj);
        fs.writeFileSync("./json/order.json", str);

    }

    //  customers other order read-write data in json
    writeOtherServicesTnJson(customer) {
        const doc = fs.readFileSync("./json/services.json");
        const docObj = JSON.parse(doc);
        docObj.push(customer);
        const str = JSON.stringify(docObj);
        fs.writeFileSync("./json/services.json", str);
    }
}

module.exports = Utility;