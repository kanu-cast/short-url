import request from 'supertest';
import app from '../server';

describe('URL Shortener API', () => {
  const validShortCode = '8a33100bded1'; 
  const invalidShortCode = 'nonexistent1234'; 
  const originalUrl = 'https://github.com/kanu-cast/short-url'; 

  describe('POST /shorten', () => {
    it('should return 201 create successful', async () => {
      const res = await request(app)
      .post('/api/shorten')
      .send({ originalUrl });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('URL shortened successfully.');
    });
  });

  describe('GET /:shortCode', () => {
    it('should return 404 if the URL is not found', async () => {
      const res = await request(app).get(`/${invalidShortCode}`);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('URL not found');
    });
  });

  describe('GET /api/stats/:code', () => {
    it('should return 404 if the URL is not found', async () => {
      const res = await request(app).get(`/api/stats/${invalidShortCode}`);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('URL not found');
    });

    it('should return 200 and the click count if the URL is found', async () => {
      const res = await request(app).get(`/api/stats/${validShortCode}`);
      expect(res.status).toBe(200); 
      expect(res.body.message).toBe(' Number of clicks.'); 
      expect(res.body.data.clickCount).toBeDefined(); 
    });
  });
});

