import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { generateTestApp } from '../../utils/app.utils.js';

describe('HealthCheckController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await generateTestApp();
  });

  it('GET /api/health', () => {
    return request(app.getHttpServer())
      .get('/api/health')
      .expect(200)
      .expect('OK');
  });

  it('GET /api/health/memory', () => {
    return request(app.getHttpServer()).get('/api/health/memory').expect(200);
  });
});
