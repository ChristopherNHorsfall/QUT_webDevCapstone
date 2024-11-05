const http = require("http");
const fs = require("fs");
const path =  require("path");

// User data for authentication
const users = [
    { username: "admin", password: "admin", location: "Cairns" }, 
    { username: "user1", password: "password1", location: "Noosa" }
];

// CSV data paths
const dataPath1 = path.join(__dirname, 'data', 'OccupancyAndDailyRates.csv'); 
const dataPath2 = path.join(__dirname, 'data', 'LengthOfStayAndReservationWindow.csv'); 

// Function to serve a CSV file
function serveCSVFile(filePath, res) {
    fs.createReadStream(filePath)
        .pipe(res)
        .on('error', (err) => {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ error: err.message }));
            res.end();
        });
}

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

    if (method === "GET") {
        console.log('GET request made...')
        // Check the requested URL and serve the appropriate file
        if (url === "/data/occupancy") {
            console.log('occupancy data requested')
            serveCSVFile(dataPath1, res);
        } else if (url === "/data/lengthofstay") {
            console.log('lengthofstay data requested')
            serveCSVFile(dataPath2, res);
        } else {
            console.log('GET request error!')
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ error: "Endpoint not found" }));
            res.end();
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
                        res.end(JSON.stringify({ message: "Login successful!" ,username: user.username }));
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