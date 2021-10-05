// customer details feilds
class CustomerDetails {
    name;
    mobileNo;
    gender;
    email;
    timeOfStay;
    uniqueKey;
    checkInDate;
    checkOutDate;


    constructor(...params) {
        this.name = params[0];
        this.mobileNo = params[1];
        this.gender = params[2];
        this.email = params[3];
        this.timeOfStay = params[4];
        this.uniqueKey = params[5];
        this.checkInDate = params[6];
        this.checkOutDate = params[7];
    }

    set name(name) {
        let nameRegex = RegExp(/^[A-Z{1}][a-z]{3,}$/);
        if (nameRegex.test(name)) {
            this.name = name;
        } else {
            console.error("Not matched");
        }

    }

    get name() {
        return this.name;
    }

    set mobileNo(mobileNo) {
        let mobileNoRegex = RegExp(/^(0|91|99|62|88)?[\\s][\d]{10}$/);
        if (mobileNoRegex.test(mobileNo)) {
            this.mobileNo = mobileNo;
        } else {
            console.error("Not matched");
        }

    }

    get mobileNo() {
        return this.mobileNo;
    }


    set gender(gender) {
        let genderRegex = RegExp(/^male$|^female$/)
        if (genderRegex.test(gender)) {
            this.gender = gender;
        } else {
            console.error("Not matched");
        }

    }

    get gender() {
        return this.gender;
    }

    set email(email) {
        let emailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
        if (emailRegex.test(email)) {
            this.email = email;
        } else {
            console.error("Not matched");
        }

    }

    get email() {
        return this.email;
    }

    set timeOfStay(timeOfStay) {
        let timeRegexAsANo = RegExp(/^[1-9]*$/);
        if (timeRegexAsANo.test(timeOfStay)) {
            this.timeOfStay = timeOfStay;
        }

    }

    get timeOfStay() {
        return this.timeOfStay;
    }

    set uniqueKey(uniqueKey) {
        this.uniqueKey = uniqueKey;
    }

    get uniqueKey() {
        return this.uniqueKey;
    }

    set checkInDate(checkInDate){
        this.checkInDate = checkInDate;
    }

    get checkInDate(){
        return this.checkInDate;
    }

    set checkOutDate(checkOutDate){
        this.checkOutDate = checkOutDate;
    }

    get checkOutDate(){
        return this.checkOutDate;
    }

    toString() {
        return ["name:" + this.name + "mobileNo: " + this.mobileNo + "gender:" +
            this.gender + "email:" + this.email + "timeOfStay:" + this.timeOfStay];
    }
}


module.exports = CustomerDetails;