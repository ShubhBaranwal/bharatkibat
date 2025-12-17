
const { default: mongoose } = require("mongoose");
// Manually defining schema to avoid import issues in standalone script if ts-node/paths not set up perfectly
const ContentSchema = new mongoose.Schema({
    title: String,
    type: String,
    published: Boolean,
});
const Content = mongoose.models.Content || mongoose.model("Content", ContentSchema);

async function checkData() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing");
        }
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "bharatkibat" });
        console.log("Connected to DB");

        // Wait a tick to ensure connection is ready
        await new Promise(resolve => setTimeout(resolve, 1000));


        const allContent = await Content.find({});
        console.log(`Total documents: ${allContent.length}`);

        const publishedNews = await Content.find({ type: "news", published: true });
        console.log(`Published News documents: ${publishedNews.length}`);

        if (allContent.length > 0) {
            console.log("Sample Document:", JSON.stringify(allContent[0], null, 2));
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

checkData();
