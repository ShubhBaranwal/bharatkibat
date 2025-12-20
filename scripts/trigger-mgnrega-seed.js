const http = require('http');



// Wait for a few seconds to ensure Next.js has picked up the new route
setTimeout(() => {
    http.get('http://localhost:3000/api/seed-mgnrega-story', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {

            // Pretty print JSON if possible
            try {

            } catch (e) {

            }
        });

    }).on("error", (err) => {

    });
}, 2000);
