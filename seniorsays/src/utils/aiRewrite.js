// OpenAI se text ka improved version laata hai.
//
// Ye function fail hone pe THROW karta hai — "Error connecting to AI." jaisi string
// kabhi return nahi karta. Wajah: pehle failure pe string return hoti thi aur caller
// usko seedha editor.insertContent() me daal deta tha. insertContent selection ko
// REPLACE karta hai, toh ek network blip user ka chuna hua text mita ke uski jagah
// error message likh deta tha. Throw karne se caller ke paas "kuch insert mat karo"
// ka option aa jaata hai.
export async function aiRewrite(action, text, apiKey) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Act as a professional editor. Return only the improved version of the text." },
                { role: "user", content: `Task: ${action}\nOriginal Text: "${text}"` },
            ],
            temperature: 0.7,
        }),
    });

    //  fetch sirf network girne pe throw karta hai. 401/429/500 uske liye bilkul
    //  "successful response" hain — isliye status khud dekhna padta hai. Ye check na ho
    //  toh neeche data.choices undefined milega, optional chaining chupchaap undefined
    //  de degi, aur asli wajah (key revoke? rate limit?) kabhi pata hi nahi chalegi.
    if (!response.ok) {
        //  OpenAI apne error body me kaam ka message bhejta hai — wahi dikhao.
        //  Body JSON na ho (proxy ka HTML error page) toh sirf status pe gir jao.
        const body = await response.json().catch(() => null);
        throw new Error(body?.error?.message || `OpenAI ne ${response.status} bheja`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    //  200 aane ke baad bhi content khaali aa sakta hai (content filter, empty completion).
    //  Yahan optional chaining ka kaam undefined ko CHUPANA nahi, error me badalna hai.
    if (!content) throw new Error("AI ne khaali jawab bheja");

    return content;
}
