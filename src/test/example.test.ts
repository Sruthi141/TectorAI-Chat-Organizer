import { describe, it, expect } from "vitest";

describe("API Connection", () => {
  it("should connect to backend", async () => {
    const res = await fetch("http://localhost:5000/api/test");
    const data = await res.json();

    expect(data.status).toBe("Backend working");
  });
});