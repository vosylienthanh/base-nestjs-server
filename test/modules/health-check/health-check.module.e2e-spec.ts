import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { generateTestApp } from '../../utils/app.utils';

describe('HealthCheckController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await generateTestApp();
  });

  it('GET /kmo-service/health', () => {
    return request(app.getHttpServer())
      .get('/kmo-service/health')
      .expect(200)
      .expect('OK');
  });

  it('GET /kmo-service/health/memory', () => {
    return request(app.getHttpServer())
      .get('/kmo-service/health/memory')
      .expect(200);
  });
});
