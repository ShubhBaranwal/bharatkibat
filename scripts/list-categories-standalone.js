const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        const envPath = path.resolve(__dirname, '../.env');
        let mongoUri = '';
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const match = envContent.match(/MONGODB_URI=(.*)/);
            if (match && match[1]) {
                mongoUri = match[1].trim();
                if (mongoUri.startsWith('"') && mongoUri.endsWith('"')) {
                    mongoUri = mongoUri.slice(1, -1);
                }
            }
        }

        if (!mongoUri) {
            console.error("MONGODB_URI not found in .env");
            process.exit(1);
        }

        console.log("Connecting to DB...");
        await mongoose.connect(mongoUri, { dbName: "bharatkibat" });
        console.log("Connected.");

        const CategorySchema = new mongoose.Schema({
            name: String,
            slug: String,
            uiLabel: String
        }, { timestamps: true });

        const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

        const categories = await Category.find({});
        console.log("Categories found:", categories.length);
        const output = categories.map(c => ({
            id: c._id.toString(),
            name: c.name,
            slug: c.slug,
            uiLabel: c.uiLabel
        }));
        fs.writeFileSync('category.json', JSON.stringify(output, null, 2), 'utf8');
        console.log("Wrote to category.json");

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
