const request = require("supertest");
const chai = require("chai");

const app = require("../app");
chai.should();

describe("Pokemon API", () => {
  describe("GET /", () => {
    it('should return 200 OK with "Hello world"', done => {
      request(app)
        .get("/")
        .expect(200)
        .end((err, res) => {
          res.body.should.deep.equal({ message: "Hello World!" });
          done();
        });
    });
  });
  describe("GET /pokemon/:id", () => {
    it("should return 200 OK with Object", done => {
      request(app)
        .get("/pokemons/1")
        .expect(200)
        .end((err, res) => {
          res.body.should.to.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("name");
          res.body.should.have.property("primaryType");
          done();
        });
    });
  });

  describe("POST /pokemons", () => {
    it("should return 201 Created and have new pokemon", done => {
      request(app)
        .post("/pokemons")
        .send({ name: "SEK", primaryType: "LOSO" })
        .set("Accept", "application/json")
        .expect(201)
        .end((err, res) => {
          res.body.should.to.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("name");
          res.body.should.have.property("primaryType");
        });
      done();
    });

    it("should return 400 Bad Request when missed require field", done => {
      request(app)
        .post("/pokemons")
        .expect(400)
        .end((err, res) => {
          res.body.should.deep.equal({
            error:
              "Insufficient parameter: name and type are required parameters"
          });
          done();
        });
    });
  });

  describe("PUT /pokemon/:id", () => {
    it("should return 200 OK and the pokemon has type2", done => {
      request(app)
        .put("/pokemons/1")
        .send({ secondaryType: "OHLulla" })
        .set("Accept", "application/json")
        .expect(200)
        .end((err, res) => {
          res.body.should.have.property("secondaryType");
          done();
        });
    });

    it("should return 400 Bad Request when try to update not existed pokemon", done => {
      request(app)
        .put("/pokemons/1")
        .expect(400)
        .end((err, res) => {
          res.body.should.deep.equal({
            error: "Insufficient body: secondaryType is required body"
          });
          done();
        });
    });
  });
});
