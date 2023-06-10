const request = require('supertest')
const app = require('../../index')

describe('Get', () => {
    it('should return all projects', async () => {
        const res = await request(app).get('/api/v1/project')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    });

})

describe('Get by id', () => {
    it('should return a project', async () => {
        const res = await request(app).get('/api/v1/project/3')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('data')
    });


    it('should handle error when project is not found', async () => {
        const res = await request(app).get('/api/v1/project/9999');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Data proyek dengan id=9999 tidak ditemukan.');
    });
});

describe('Delete', () => {
    it('should delete a project', async () => {
        const res = await request(app).delete('/api/v1/project/3')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
    });


    it('should handle error when project is not found', async () => {
        const res = await request(app).delete('/api/v1/project/9999');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe('Data proyek dengan id=9999 tidak ditemukan. Tidak ada yang dihapus.');
    });
});

