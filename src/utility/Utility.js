const fs = require('fs');
const JsonToXlsx = require("xlsx");
const CustomerDetails = require("./CustomerDetails");
const Orders = require("./Orders");
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
        customer.checkInDate = new Date();
        this.writeDataToJson(customer);
        console.log(customer.name + " you have registered successfully:")
    }

    // customer key generation-
    generateUniqueKey(name, mobileNo) {
        return name.substring(0, 4) + mobileNo.substring(0, 4);
    }


    writeDataToJson(customer) {
        try {
            const docObj = JSON.parse(fs.readFileSync("./json/customer.json"));
            docObj.push(customer);
            fs.writeFileSync("./json/customer.json", JSON.stringify(docObj));
        } catch {
            let docArray = new Array();
            docArray.push(customer);
            fs.writeFileSync("./json/customer.json", JSON.stringify(docArray));
        }


    }
    // login 
    login() {
        let flag = true;
        while (flag) {
            console.log("\n|--- Select login option ---|" + "\nPress 1: Admin Login-" + "\nPress 2: Customer Login-" + "\npress 3: Exit-");
            let option = parseInt(prompt("Enter menu option:"));
            switch (option) {
                case 1:
                    console.log("\n");
                    this.adminLogin();
                    break;
                case 2:
                    console.log("\n");
                    this.customerLogin();
                    break;
                case 3:
                    flag = false;
                    break;
                default:
                    console.log("\nYou Entered Wrong...");
                    break;
            }
        }

    }

    // Admin login-
    adminLogin() {
        const key = "Admin";
        let adminKey = prompt("Enter Admin key:")
        if (key === adminKey) {
            this.generateReport();
        } else {
            console.log("\nYou Entered Wrong...");
        }
    }

    // Generate Report-
    generateReport() {       
        console.log("Print Report:");                                                                                                            
        this.jsonToXlsx("./json/customer.json", "./reports/report.xlsx", "customerReport");                                       
        this.jsonToXlsx("./json/orders.json", "./reports/order.xlsx", "orderReport");                                               
    }
    // customer login login- 
    customerLogin() {

        let name = prompt("Enter customer name: ");
        let password = prompt("Enter your password: ")

        const doc = fs.readFileSync("./json/customer.json");
        const docObj = JSON.parse(doc);

        for (let user in docObj) {
            if ((docObj[user].name === name && docObj[user].uniqueKey === password)) {
                this.customer = docObj[user];
                console.log("\n|--- Welcome", this.customer.name + "! ---|");
                this.customerMenu();
            }
        }
        console.log("Incorrect matched");
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
        while (flag) {
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
                default:
                    console.log("choose right one...");
            }

        }
    }

    // customers order other services-
    otherServices() {
        let flag = true;
        while (flag) {
            console.log("\nPress 1 - Order Bedsheet(250rs)");
            console.log("Press 2 - Order Blancket(350rs)");
            console.log("Press 3 - Exit\n");
            let option = parseInt(prompt("Enter choice"));

            switch (option) {
                case 1:
                    this.writeOrdersInJson(new Orders(this.customer.uniqueKey, "Bedsheet", 1, 250));
                    console.log("\nOrder placed successfully");
                    break;
                case 2:
                    this.writeOrdersInJson(new Orders(this.customer.uniqueKey, "Blancket", 1, 350));
                    console.log("\nOrder placed successfully");
                    break;
                case 3:
                    console.log("Exit");
                    flag = false;
                    break;
                default:
                    console.log("choose right one...");
            }

        }
    }

    // customer checkout services-
    checkoutMenu() {
        console.log("Generate bill");
        let checkInDate = new Date(this.customer.checkInDate);
        this.customer.checkOutDate = new Date();
        const totalBill = this.generateBill(this.customer.uniqueKey, checkInDate, this.customer.checkOutDate);
        console.log(totalBill);

    }
    generateBill(uniqueKey, checkInDate, checkOutDate) {
        const docObj = JSON.parse((fs.readFileSync("./json/orders.json")));
        const docObj2 = JSON.parse((fs.readFileSync("./json/customer.json")));
        let sum = 0; let stay = 0;
        let diff = checkOutDate.getHours() - checkInDate.getHours();
        docObj.forEach(element => {
            if (element.uniqueKey === uniqueKey) {
                sum += element.price;
            }
        });
        docObj2.forEach(element => {
            if (element.uniqueKey === uniqueKey) {
                stay = element.stayOfDays;
            }
        });
        if (diff < 12) {
            return sum += 500;
        } else {
            return sum += stay * 1000;
        }
    }

    //  customer orders read-write data in json
    writeOrdersInJson(order) {
        try {
            const docObj = JSON.parse(fs.readFileSync("./json/orders.json"));
            docObj.push(order);
            fs.writeFileSync("./json/orders.json", JSON.stringify(docObj));
        } catch {
            let docArray = new Array();
            docArray.push(order);
            fs.writeFileSync("./json/orders.json", JSON.stringify(docArray));
        }
    }


    getJsonObj = (inputFile) => {
        let stringJson = fs.readFileSync(inputFile);
        let jsonObj = JSON.parse(stringJson);
        return jsonObj;
    };
    jsonToXlsx = (jsonFile, xlsxFile, sheetName) => {
        let jsonObj = this.getJsonObj(jsonFile);
        let workBook = JsonToXlsx.utils.book_new();
        let workSheet = JsonToXlsx.utils.json_to_sheet(jsonObj);
        JsonToXlsx.utils.book_append_sheet(workBook, workSheet, sheetName);
        JsonToXlsx.writeFile(workBook, xlsxFile);
    };
}

module.exports = Utility;