'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server); // supertest takes in our server so it can be started / ran during testing

// describe -> test suite
describe('**** BASIC-EXPRESS-SERVER ****', () => {
  
  describe('test 500 if no name in the query string', () => {
    it('should send 500 if no name in the query string', async () => {
      mockRequest.get('/person')
        .then(results => {
          console.log(results.status)
          expect(results.status).toEqual(500);
        })
    });
  })


    describe('test 404 on no route found', () => {
      it('should respond with a 404 on not found', () => {
        mockRequest.get('/no-route')
          .then(results => {
            expect(results.status).toEqual(404);
          })
      });
    })


    describe('test 404 on a bad method', () => {
      it('should respond with a 404 on a bad method', () => {
        mockRequest.post('/person')
          .then(results => {
            expect(results.status).toEqual(404);
          })
      });
    })

    describe('test 200 if the name in the quary string', () => {
      it('should send 200 if the name is in the query string', async () => {
        const results = await mockRequest.get('/person?name=xyz')
        expect(results.status).toEqual(200);
      })
    });

    describe('given a name in the quary string , the output object is correct', () => {
      it('given a name in the quary string , the output object is correct', async () => {
        const results = await mockRequest.get('/person?name=xyz');
        expect(results.body.name).toEqual('xyz');
      })
    })


  })


