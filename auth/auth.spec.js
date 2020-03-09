const Users = require("../users/users-model.js");
const db = require("../data/dbConfig.js");
const request = require("supertest");
const server = require("../server.js");
const bcrypt = require("bcryptjs");

// beforeAll(async () => {
//     await db.seed();
// });

beforeAll(async () => {
    testUser = {
      firstName: "test",
      lastName: "user",
      email: "test.test@email.com",
      username: "test",
      password: "test"
    };
    const hash = bcrypt.hashSync(testUser.password, 10); // 2 ^ n
    testUser.password = hash;
    await db("users").insert(testUser);
});

describe("auth_router_model", () => {
  it("should be test environment", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });

  it("should register a user", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ firstName: "tester", lastName: "tester", email: "tester@email.com", username: "third", password: "third" })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });

  it("should fail to register without all credentials", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "justuser" })
      .then(res => {
        expect(res.status).toBe(400);
      });
  });

  it("should log a user in successfully", async () => {
    await request(server)
      .post("/api/auth/login")
      .send({ username: "test", password: "test" })
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  it("should give a token back after login", async () => {
    await request(server)
      .post("/api/auth/login")
      .send({ username: "test", password: "test" })
      .then(res => {
        expect(res.body.token).toBeDefined();
      });
  });

  afterAll(async () => {
    await db("users").truncate();
  });
});
