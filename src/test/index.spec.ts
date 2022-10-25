// import { it } from "node:test";
import { app } from "../app";
import request from "supertest";
import MOCK from "./MOCK.json";

// SIGNUP
describe("Teste de erros - signup", () => {
  MOCK.signupErrors.data.forEach((test) => {
    it(test.name, async () => {
      const res = await request(app).post("/api/signup").send(test.data);
      expect(res.statusCode).toBe(test.status);
      expect(res).toHaveProperty("body");
      expect(res.body.message).toBe(test.message);
    });
  });
});

describe("Teste de sucesso - signup", () => {
  it("Name, password, confirmPassword and email must be valid! :)", async () => {
    const res = await request(app).post("/api/signup").send({
      name: "Gabriel",
      email: "gabrielson@rethink.dev",
      password: "aS1d@134",
      confirmPassword: "aS1d@134",
    });
    expect(res.statusCode).toBe(200);
    expect(res).toHaveProperty("body");
    expect(res.body.message).toBe("User registered successfully!!! :D");
  });
});
//////////////////////////////////////////////////////////////////////////////////

// SIGNIN
describe("Teste de erros - signin", () => {
  MOCK.signinErrors.data.forEach((test) => {
    it(test.name, async () => {
      const res = await request(app).post("/api/signin").send(test.data);
      expect(res.statusCode).toBe(test.status);
      expect(res).toHaveProperty("body");
      expect(res.body.message).toBe(test.message);
    });
  });
});

describe("Teste de sucesso - signin", () => {
  it("Password and email must be valid! :)", async () => {
    const res = await request(app).post("/api/signin").send({
      email: "ana.cc.ramos@rethink.dev",
      password: "as1d@G34",
    });
    expect(res.statusCode).toBe(200);
    expect(res).toHaveProperty("body");
    expect(res.body.message).toBe("Login success ;D");
  });
});
//////////////////////////////////////////////////////////////////////////////////

// GET PROFILE
describe("Teste de erros - profile", () => {
  MOCK.getProfileErrors.data.forEach((test) => {
    it(test.name, async () => {
      const res = await request(app)
        .get("/api/profile")
        .set({
          Authorization: `bearer ${test.data}`,
        });
      expect(res.statusCode).toBe(MOCK.getProfileErrors.status);
      expect(res).toHaveProperty("body");
      expect(res.body.message).toBe(test.message);
    });
  });
});
it("should be able to create a new profile", async () => {
  const res = await request(app).get("/api/profile").set({
    Authorization:
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFuYS5jYy5yYW1vc0ByZXRoaW5rLmRldiIsImlhdCI6MTY2NjY1NTAwNSwiZXhwIjoxNjY2NjU4NjA1fQ.rVfgZY7Zd83h3PZ2RAaka2Ttl9SHFwO5oFrcBpaYpc4",
  });
  expect(res.statusCode).toBe(200);
  expect(res).toHaveProperty("body");
});
