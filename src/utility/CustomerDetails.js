// customer details feilds
class CustomerDetails {
    name;
    mobileNo;
    gender;
    email;
    timeOfStay;
    uniqueKey;
    

    constructor(...params) {
        this.name = params[0];
        this.mobileNo = params[1];
        this.gender = params[2];
        this.email = params[3];
        this.timeOfStay = params[4];
        this.uniqueKey = params[5];
    }

    set name(name) {
        let nameRegex = RegExp('^[A-Z{1}][a-z]{3,}$');
        if (nameRegex.test(name)) {
            this.name = name;
        } else {
            throw "First name incorrect";
        }

    }

    get name() {
        return this.name;
    }

    set mobileNo(mobileNo) {
        let mobileNoRegex = RegExp('^(0|91|99|62|88)?[\\s][0-9]{10}$');
        if (mobileNoRegex.test(mobileNo)) {
            this.mobileNo = mobileNo;
        } else {
            throw "Mobile number incorrect";
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
            throw "gender incorrect";
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
            throw "Email incorrect";
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

    set uniqueKey(uniqueKey){
        this.uniqueKey = uniqueKey;
    }

    get uniqueKey(){
        return this.uniqueKey;
    }
    toString() {
        return ["name:" + this.name + "mobileNo: " + this.mobileNo + "gender:" +
            this.gender + "email:" + this.email + "timeOfStay:" + this.timeOfStay];
    }
}


module.exports = CustomerDetails;