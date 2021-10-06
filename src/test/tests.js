let chai = require('chai');
let assert = chai.assert;
const Utility = require('../utility/Utility');
const utility = new Utility();

describe('hotelManagementApp', function () {
    describe('generateUniqueKey', function () {
        it('generateUniqueKey should return valid key', function () {
            let result = utility.generateUniqueKey('adarsh', '827328308');
            assert.equal(result, 'adar8273');
        });

        it('generateUniqueKey should return a string', function () {
            let result = utility.generateUniqueKey('adarsh', '827328308');
            assert.typeOf(result, 'string');
        });
    });
    
    describe('generateBill()', function () {
        it('before 12 hours checkout, customer should be billed 500 with order', function () {
            let checkInDate = new Date('05/10/2021 06:00:00');
            let checkOutDate = new Date('05/10/2021 12:00:00');
            let uniqueKey = 'adar8273'
            let result = utility.generateBill(uniqueKey, checkInDate, checkOutDate);
            assert.equal(result, '750');
        })
    })
})