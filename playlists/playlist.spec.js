const request = require("supertest");
const server = require("../server.js");
const bcrypt = require("bcryptjs");
const db = require("../data/dbConfig.js");

var auth = {};
beforeAll(async () => {
    testUser = {
      firstName: "pltest",
      lastName: "pltest",
      email: "pltest.test@email.com",
      username: "pltest",
      password: "pltest"
    };
    const hash = bcrypt.hashSync(testUser.password, 10); // 2 ^ n
    testUser.password = hash;
    await db("users").insert(testUser);
});

beforeEach(loginUser(auth));

function loginUser(auth) {
    return function(done) {
        request(server)
          .post("/api/auth/login")
          .send({
            username: "pltest",
            password: "pltest"
          })
          .expect(200)
          .end(onResponse);
        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}

describe('Playlist Model', () => {
    
    it("Fail to get playlists without login and token", async () => {
      await request(server)
        .get("/api/playlists")
        .then(res => {
            expect(res.body.you).toBe("Not allowed"); 
        });
    });

    it("Succeeds with token", async () => {
      await request(server)
        .get("/api/playlists")
        .set("Authorization", `Bearer ${auth.token}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
          expect(res.type).toBe("application/json");
        });
    });

    afterAll(async () => {
        await db("users").truncate();
    });
});