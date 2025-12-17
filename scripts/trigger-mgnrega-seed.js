const http = require('http');

console.log("Triggering MGNREGA seeding...");

// Wait for a few seconds to ensure Next.js has picked up the new route
setTimeout(() => {
    http.get('http://localhost:3000/api/seed-mgnrega-story', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log("Response:");
            // Pretty print JSON if possible
            try {
                console.log(JSON.stringify(JSON.parse(data), null, 2));
            } catch (e) {
                console.log(data);
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}, 2000);
