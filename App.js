const Utility = require("./src/utility/Utility.js");
let utility = new Utility();

// main
console.log("\n|----- welcome to hotel -----|");
let flag = true;
while(flag){
    let option = utility.mainMenu();
    switch(option) {
        case 1:
            console.log("|----- Registeration process -----|\n");
            utility.register();   
            break;
        case 2:
            console.log("\n|----- Login process -----|\n");
            utility.login();
            break;
        case 3:
            console.log("\n|----- thank you for visiting here:- -----|");
            flag = false;
            break;
        default:
            console.log("\n|----- please choose right menu: -----| ");
    }
    
}
