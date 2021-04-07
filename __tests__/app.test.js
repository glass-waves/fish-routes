const pool = require('../lib/utils/pool');
const setup = require('../setup');
const request = require('supertest');
const app = require('../lib/app');
const { response } = require('express');

describe('test endpoints', () => {
    beforeEach(() => {
        return setup(pool);
    });

    it('should insert a fish into the database', async () => {
        const response = await request(app)
            .post('/api/v1/fishes')
            .send({fishName: 'Steelhead', size: 'Large', freshwater: true, region: 'North America'});
        const expectation = {
            id: '1',
            fishName: 'Steelhead', 
            size: 'Large', 
            freshwater: true, 
            region: 'North America'
        }
        expect(response.body).toEqual(expectation);
    });

    it('should return all fishes in database', async () => {
        await request(app)
            .post('/api/v1/fishes')
            .send({fishName: 'Steelhead', size: 'Large', freshwater: true, region: 'North America'});
        await request(app)
            .post('/api/v1/fishes')
            .send({fishName: 'Salmon', size: 'Medium', freshwater: true, region: 'North America'});
        const response = await request(app)
            .get('/api/v1/fishes');
        const expectation = [
            {
                id: '1',
                fishName: 'Steelhead', 
                size: 'Large', 
                freshwater: true, 
                region: 'North America'
            },
            {
                id: '2',
                fishName: 'Salmon', 
                size: 'Medium', 
                freshwater: true, 
                region: 'North America'
            }
        ]
        expect(response.body).toEqual(expectation);
    });
    it('should get one fish by id', async () => {
        await request(app)
            .post('/api/v1/fishes')
            .send({fishName: 'Steelhead', size: 'Large', freshwater: true, region: 'North America'});
        await request(app)
            .post('/api/v1/fishes')
            .send({fishName: 'Salmon', size: 'Medium', freshwater: true, region: 'North America'});
        const response = await request(app)
            .get('/api/v1/fishes/single/2');
        const expectation = {
            id: '2',
            fishName: 'Salmon', 
            size: 'Medium', 
            freshwater: true, 
            region: 'North America'
        };
    
    expect(response.body).toEqual(expectation);
    });

    it('should change specified key value in row', async () => {
        await request(app)
            .post('/api/v1/fishes')
            .send({fishName: 'Steelhead', size: 'Large', freshwater: true, region: 'North America'});
        const response = await request(app)
            .put('/api/v1/fishes/single/1')
            .send({ column: 'size', value: 'Small'})
        const expectation = {
            id: '1',
            fishName: 'Steelhead', 
            size: 'Small', 
            freshwater: true, 
            region: 'North America'
        }
        expect(response.body).toEqual(expectation);
    })
});
