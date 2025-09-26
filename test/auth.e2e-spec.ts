import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/website_test'),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/register (POST)', () => {
    const registerData = {
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser'
    };

    return request(app.getHttpServer())
      .post('/auth/register')
      .send(registerData)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toBe(registerData.email);
        expect(res.body.user.username).toBe(registerData.username);
        expect(res.body.user.id).toBeDefined();
      });
  });

  it('/auth/login (POST)', async () => {
    // First register a user
    const registerData = {
      email: 'login@example.com',
      password: 'password123',
      username: 'loginuser'
    };

    await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerData);

    // Then try to login
    const loginData = {
      email: 'login@example.com',
      password: 'password123'
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toBe(loginData.email);
        expect(res.body.user.id).toBeDefined();
      });
  });

  it('/auth/register should fail with duplicate email', async () => {
    const registerData = {
      email: 'duplicate@example.com',
      password: 'password123',
      username: 'user1'
    };

    // Register first user
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerData);

    // Try to register with same email
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(registerData)
      .expect(400);
  });

  it('/auth/login should fail with wrong credentials', () => {
    const loginData = {
      email: 'nonexistent@example.com',
      password: 'wrongpassword'
    };

    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(401);
  });
});
