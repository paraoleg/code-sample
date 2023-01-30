import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckModule } from '@modules/health-check/health-check.module';

describe('HealthCheck Controller (e2e)', () => {
  let app: INestApplication;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configService = app.get(ConfigService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health-check (GET) Should return success', () => {
    const fakeSecret = 'fakeSecret';
    jest.spyOn(configService, 'get').mockImplementation(() => fakeSecret);

    return request(app.getHttpServer())
      .get('/health-check')
      .set('Application-health-secret', fakeSecret)
      .expect(200)
      .expect({ everythingIsFine: true });
  });

  it('/health-check (GET) Should return error wrong secret', async () => {
    const fakeSecret = 'fakeSecret';
    const wrongFakeSecret = 'wrongFakeSecret';
    jest.spyOn(configService, 'get').mockImplementation(() => fakeSecret);

    const response = await request(app.getHttpServer())
      .get('/health-check')
      .set('Application-health-secret', wrongFakeSecret)
      .expect(400);

    expect(response.body).toMatchObject({
      message: 'Incoming secret is not valid',
      error: 'Bad Request',
    });
  });
});
