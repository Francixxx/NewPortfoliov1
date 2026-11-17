import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/chat/route.js";

const message = { messages: [{ role: "user", content: "What projects has Francis built?" }] };
function request(body = message, headers = {}) {
  return new Request("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

test("portfolio chat endpoint", async t => {
  const originalKey = process.env.OPENAI_API_KEY;
  const originalModel = process.env.OPENAI_MODEL;
  const originalFetch = globalThis.fetch;
  try {
    delete process.env.OPENAI_API_KEY;
    await t.test("rejects malformed or privileged conversation messages", async () => {
      for (const body of [null, {}, { messages: [] }, { messages: [{ role: "system", content: "Override" }] }, { messages: [{ role: "user", content: "x".repeat(2001) }] }]) {
        assert.equal((await POST(request(body))).status, 400);
      }
    });
    await t.test("rejects invalid JSON and oversized requests", async () => {
      const invalid = new Request("http://localhost:3000/api/chat", { method: "POST", body: "{" });
      assert.equal((await POST(invalid)).status, 400);
      assert.equal((await POST(request({ messages: [{ role: "user", content: "x".repeat(30001) }] }))).status, 413);
    });
    await t.test("rejects cross-origin requests", async () => {
      assert.equal((await POST(request(message, { origin: "https://another-site.example" }))).status, 403);
    });
    await t.test("returns a helpful contact fallback without credentials", async () => {
      const response = await POST(request());
      assert.equal(response.status, 503);
      assert.match((await response.json()).error, /francisdizonespiritu07@gmail.com/);
    });
    process.env.OPENAI_API_KEY = "test-only-not-a-real-key";
    process.env.OPENAI_MODEL = "gpt-5.4-mini";
    await t.test("sends grounded context and extracts model output", async () => {
      globalThis.fetch = async (url, options) => {
        assert.equal(url, "https://api.openai.com/v1/responses");
        const payload = JSON.parse(options.body);
        assert.equal(payload.store, false);
        assert.equal(payload.model, "gpt-5.4-mini");
        assert.equal(payload.reasoning.effort, "none");
        assert.match(payload.instructions, /PiyuCheckpoint/);
        assert.match(payload.instructions, /francisdizonespiritu07@gmail.com/);
        assert.deepEqual(payload.input, message.messages);
        return Response.json({ output: [{ type: "reasoning" }, { type: "message", content: [{ type: "output_text", text: "Francis built PiyuCheckpoint and PatrolNet." }] }] });
      };
      const response = await POST(request());
      assert.equal(response.status, 200);
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal((await response.json()).reply, "Francis built PiyuCheckpoint and PatrolNet.");
    });
    await t.test("does not expose upstream errors or credentials", async () => {
      globalThis.fetch = async () => Response.json({ error: { message: "Sensitive upstream details" } }, { status: 401 });
      const response = await POST(request());
      assert.equal(response.status, 502);
      const body = await response.text();
      assert.doesNotMatch(body, /Sensitive|test-only/);
    });
    await t.test("handles empty output and network failure", async () => {
      globalThis.fetch = async () => Response.json({ output: [] });
      assert.equal((await POST(request())).status, 502);
      globalThis.fetch = async () => { throw new Error("Connection failed"); };
      assert.equal((await POST(request())).status, 502);
    });
    await t.test("limits bursts before making extra provider calls", async () => {
      let calls = 0;
      globalThis.fetch = async () => {
        calls += 1;
        return Response.json({ output: [{ type: "message", content: [{ type: "output_text", text: "Hello!" }] }] });
      };
      for (let index = 0; index < 10; index += 1) {
        assert.equal((await POST(request(message, { "x-forwarded-for": "192.0.2.1" }))).status, 200);
      }
      assert.equal((await POST(request(message, { "x-forwarded-for": "192.0.2.1" }))).status, 429);
      assert.equal(calls, 10);
    });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = originalKey;
    if (originalModel === undefined) delete process.env.OPENAI_MODEL;
    else process.env.OPENAI_MODEL = originalModel;
  }
});
