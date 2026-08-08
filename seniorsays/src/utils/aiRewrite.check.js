// Chalane ka tareeka:  node src/utils/aiRewrite.check.js
// Koi test framework nahi — bas assert. fetch ko fake karte hain, asli API hit nahi hoti.
// Har case wo hai jo pehle chupchaap "Error generating text." ban jaata tha.
import assert from 'node:assert/strict';
import { aiRewrite } from './aiRewrite.js';

const reply = (body, { ok = true, status = 200 } = {}) => {
    globalThis.fetch = async () => ({ ok, status, json: async () => body });
};

const rejectsWith = (match) =>
    assert.rejects(() => aiRewrite("Fix Grammar", "mera text", "key"),
        (e) => e.message.includes(match),
        `error me "${match}" hona chahiye tha`);

// Sab theek — content wapas aata hai
reply({ choices: [{ message: { content: "improved text" } }] });
assert.equal(await aiRewrite("Fix Grammar", "mera text", "key"), "improved text");

// 401: key revoke ho gayi. OpenAI ka apna message aage jaana chahiye.
reply({ error: { message: "Incorrect API key provided" } }, { ok: false, status: 401 });
await rejectsWith("Incorrect API key");

// 429 rate limit, aur body me koi message nahi -> status hi bata do
reply({}, { ok: false, status: 429 });
await rejectsWith("429");

// Error body JSON hi nahi (proxy ka HTML page) -> crash nahi, status pe gir jao
globalThis.fetch = async () => ({
    ok: false, status: 500, json: async () => { throw new Error("not json") },
});
await rejectsWith("500");

// 200 aaya par choices khaali — yehi wo case hai jo optional chaining chupa deti thi
reply({ choices: [] });
await rejectsWith("khaali");

// 200 aaya par content khaali string
reply({ choices: [{ message: { content: "" } }] });
await rejectsWith("khaali");

// Network hi gir gaya -> error caller tak pahunche, string ban ke na lautey
globalThis.fetch = async () => { throw new Error("fetch failed") };
await rejectsWith("fetch failed");

console.log('aiRewrite: saare checks pass ✓');
