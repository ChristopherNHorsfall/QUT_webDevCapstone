const http = require("http");
const fs = require("fs");
const path =  require("path");

const users = [
    { username: "admin", password: "admin" }, 
    { username: "user1", password: "password1" }
];


//routing function
function routing(req, res) {
    const url = req.url;
    const method = req.method;

    if (url.startsWith("/data")) {
        if (method === "GET") {
            // Read the CSV file and send its contents
            fs.createReadStream(dataPath)
                .pipe(res) // Pipe the read stream directly to the response
                .on('error', (err) => {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.write(JSON.stringify({ error: err.message }));
                    res.end();
                });
        }
    } else if (url.startsWith("/login")) {
        if (method === "POST") {
            // Handle login logic
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Login successful" }));
            res.end();
        }
    } else {
        // No page match url
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("No matching page");
        res.end();
    }
};
    
http.createServer(routing).listen(3000, function () {
    console.log("Server started at port 3000");
});