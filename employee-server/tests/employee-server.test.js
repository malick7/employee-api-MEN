const expect = require('expect');
const request = require('supertest');


const {app} = require('../employee-server');
const {Employee} = require('../models/employee');

beforeEach((done) => {
    Employee.deleteMany({}).then(() => done()); //removes everything before each test
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
                Employee.find()
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
                        expect(employees.length).toBe(0);
                        done();
                    })
                    .catch((e) => done(e));
          });
      });
});