const expect = require('expect');
const request = require('supertest');


const {app} = require('../employee-server');
const {Employee} = require('../models/employee');

const employees =[
    {
        "department" : 0,
        "hireDate" : "11/8/2018",
        "isPermanent" : true,
        "fullname" : "Caren",
        "email" : "caren@test.com",
        "mobile" : "124-534-2343",
        "city" : "Bangalore",
        "gender" : "2"
    },
    {
        "department" : 1,
        "hireDate" : "11/8/2018",
        "isPermanent" : true,
        "fullname" : "Mark",
        "email" : "mark@test.com",
        "mobile" : "123-534-2343",
        "city" : "Bangalore",
        "gender" : "1"
    },
    {
        "department" : 2,
        "hireDate" : "11/8/2018",
        "isPermanent" : true,
        "fullname" : "Simon",
        "email" : "simon@test.com",
        "mobile" : "125-534-2343",
        "city" : "Bangalore",
        "gender" : "1",
    }   
];

//before - run once initially when tests are executed
//run before each it - block!
beforeEach((done) => {
    //removes everything before each test
    Employee.deleteMany({}).then(() => {
        return Employee.insertMany(employees)
            .then(() => {
                done();
            });
    }); 
});

describe('POST /employees', () => {
    it('should create a employee', (done) => {
        var fullname = 'fullname';
        var employee = {
            fullname: fullname,
            email: 'email@email',
            mobile: '234-234-9233',
            city: 'Bangalore',
            gender: '1',
            department: 0,
            hireDate: "11/8/2018",
            isPermanent: true
        };
        
        request(app)
            .post('/employees')
            .send(employee)
            .accept('json')
            .expect(200).expect((res) => {
                expect(res.body.fullname).toBe(fullname);
            })
            .end((err, res) => {
                if(err) return done(err);
                Employee.find({fullname})
                    .then((employees) => {
                        expect(employees.length).toBe(1);
                        expect(employees[0].fullname).toBe(fullname);
                        done();
                    })
                    .catch((e) => {
                        done(e);
                    })
            });
    });

    it('should not create employee with invalid body data', (done) => {
        request(app)
          .post('/employees')
          .send({})
          .expect(400)
          .end((err, res) => {
                if (err) return done(err);
                        
                Employee.find()
                    .then((employees) => {
                        expect(employees.length).toBe(3);
                        done();
                    })
                    .catch((e) => done(e));
          });
      });
});

describe('GET /employees', () => {
    it('should get all employees', (done) => {
        request(app)
            .get('/employees')
            .expect(200)
            .expect((res) => {
                expect(res.body.employees.length).toBe(3);
            })
            .end(done);
    });
});