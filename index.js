const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate");
//////////////////////////////////////////////////////
//////////// SERVER

const cardTemplate = fs.readFileSync("./templates/card.html", "utf-8");
const overviewTemplate = fs.readFileSync("./templates/overview.html", "utf-8");
const productTemplate = fs.readFileSync("./templates/product.html", "utf-8");

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(pathname);
  //   Overview Page
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cards = dataObj.map((obj) => {
      return replaceTemplate(cardTemplate, obj);
    });
    const output = overviewTemplate.replace(/{%CARDS%}/g, cards);
    res.end(output);
  } else if (pathname === "/products") {
    // Product Page
    res.writeHead(200, { "Content-Type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(productTemplate, product);
    res.end(output);
  } else if (pathname === "/api") {
    // API
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);
  } else {
    // Not Found Page
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, "0.0.0.0", () => {
  console.log("Server Started Listenining on Port 8000");
});
