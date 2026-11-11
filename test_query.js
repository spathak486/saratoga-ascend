const https = require("https");
const data = JSON.stringify({
  query: `{
    cards(pagination: { limit: 100 }) {
      documentId
      referenceTitle
      category
      title
      number
    }
  }`
});
const req = https.request("https://cms.saratogaascend.com/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data),
    "Authorization": "Bearer 905ee4b24a6c8db80c09dddd2d66de7bed41efbf192fa4826dbe8449fb09c7798a5afa5bb98b6c89cf7e5a87cfd8f09095b3c792e660ff3e237e49819c44b2ddf6c4115b68b9441b6551ae4a05b82fae60041559262bc433ebb7b677003df8f1149842fe4aa652a8ebe3d7c72981b3389a03c23037daa8aa3357835c80499543"
  }
}, (res) => {
  let body = "";
  res.on("data", chunk => body += chunk);
  res.on("end", () => {
    const json = JSON.parse(body);
    for (const c of json.data?.cards || []) {
      console.log(`id: ${c.documentId}, ref: ${c.referenceTitle}, cat: ${c.category}, num: ${c.number}, title: ${c.title?.slice(0, 30)}`);
    }
  });
});
req.write(data);
req.end();
