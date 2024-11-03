const http = require("http");
const fs = require("fs");
const path =  require("path");

// User data for authentication
const users = [
    { username: "admin", password: "admin" }, 
    { username: "user1", password: "password1" }
];

// CSV data path
const dataPath = path.join(__dirname, 'data', 'OccupancyAndDailyRates.csv'); 

//routing function
function routing(req, res) {
    //CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        console.log('preflight check is successful')
        res.writeHead(204); // No content, indicating preflight check is successful
        res.end();
        return; // Exit the function early to avoid further processing
    }

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
            let body = '';

            // Collect the data from the request
            req.on('data', chunk => {
                body += chunk.toString(); // Convert Buffer to string
                console.log('Received chunk:', chunk.toString());
            });

            req.on('end', () => {
                console.log('Complete request body:', body);
                try {
                    const { username, password } = JSON.parse(body);
                    console.log('Parsed username:', username, 'Parsed password:', password);

                    const user = users.find(user => user.username === username && user.password === password);
                    
                    if (user) {
                        console.log('User found:', user.username);
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ message: "Login successful!" }));
                    } else {
                        console.log('Invalid credentials for username:', username);
                        res.writeHead(401, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ message: "Invalid credentials." }));
                    }
                } catch (err) {
                    console.log('Error parsing request body:', err.message); // Log JSON parsing errors
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Bad request." }));
                }
                });
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