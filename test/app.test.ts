import request from "supertest";

import app from "../src/app";

describe("Back-End Home API", () => {
	test("GET /", async () => {
		const res = await request(app).get("/");
		expect(res.status).toEqual(200);
		expect(res.body).toBeInstanceOf(Object);
		expect(res.body).toHaveProperty("message");
		expect(res.body.message).toEqual("Hello, World! 👋");
	});

	test("Invalid GET endpoint should throw error", async () => {
		const res = await request(app).get("/invaild");
		expect(res.status).toEqual(404);
		expect(res.body).toBeInstanceOf(Object);
		expect(res.body).toHaveProperty("message");
		expect(res.body.message).toEqual("Not found");
	});

	test("Invalid POST endpoint should throw error", async () => {
		const res = await request(app).get("/invaild");
		expect(res.status).toEqual(404);
		expect(res.body).toBeInstanceOf(Object);
		expect(res.body).toHaveProperty("message");
		expect(res.body.message).toEqual("Not found");
	});
});
