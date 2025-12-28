import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Content from "@/models/Content";
import Category from "@/models/Category";

export async function GET() {
    try {
        await connectToDatabase();

        // 1. Find the "Awadh Ki Baat" Category
        const categoryName = "Awadh Ki Baat";
        const category = await Category.findOne({
            $or: [{ name: categoryName }, { uiLabel: categoryName }],
        });

        if (!category) {
            return NextResponse.json(
                { error: `Category '${categoryName}' not found` },
                { status: 404 }
            );
        }

        // 2. Define the article data
        const articleData = {
            title: "सांसद रवि किशन बोले – झूठे मुकदमों से आम आदमी प्रभावित",
            slug: "ravi-kishan-fake-cases-impact",
            type: "news",
            categoryId: category._id,
            author: "Admin",
            coverImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766859567/ravi_kishan_gorakhpur_joeca9.jpg",
            tags: [
                "Ravi Kishan",
                "Gorakhpur News",
                "Politics",
                "Awadh Ki Baat",
                "फर्जी मुकदमा",
                "सांसद रवि किशन",
            ],
            contentBlocks: [
                {
                    blockId: "h1",
                    type: "heading",
                    data: {
                        text: "सांसद रवि किशन बोले – झूठे मुकदमों से आम आदमी प्रभावित",
                        level: 2,
                    },
                },
                {
                    blockId: "p1",
                    type: "paragraph",
                    data: {
                        text: "गोरखपुर: सांसद और भोजपुरी स्टार रवि किशन ने संसद में फर्जी मुकदमों के बढ़ते मामलों पर चिंता जताई। उनका कहना है कि झूठा केस सिर्फ व्यक्ति को ही नहीं, बल्कि पूरा परिवार और समाज को प्रभावित करता है。",
                    },
                },
                {
                    blockId: "quote1",
                    type: "quote",
                    data: {
                        text: "एक झूठा मुकदमा पूरे परिवार की जिंदगी प्रभावित करता है। समाज में इज्जत घटती है और कोर्ट-कचहरी पर बोझ बढ़ता है।",
                        caption: "रवि किशन, सांसद",
                    },
                },
                {
                    blockId: "p2",
                    type: "paragraph",
                    data: {
                        text: "सांसद ने कहा कि जो लोग बिना वजह फर्जी मुकदमे दायर करते हैं, उन पर कड़ी कार्रवाई होनी चाहिए। इसका मकसद आम आदमी की जिंदगी और भरोसा दोनों सुरक्षित करना है。",
                    },
                },
                {
                    blockId: "p3",
                    type: "paragraph",
                    data: {
                        text: "जांच एजेंसियों की जिम्मेदारी पर रवि किशन ने कहा कि अगर एजेंसी गलती से फर्जी केस सही साबित कर देती है, तो उसके लिए भी नियम और जवाबदेही तय होनी चाहिए。",
                    },
                },
                {
                    blockId: "fact1",
                    type: "factBox",
                    data: {
                        title: "फर्जी मुकदमों पर मुख्य बिंदु",
                        facts: [
                            {
                                label: "मुख्य चिंता",
                                value: "झूठे मुकदमे आम आदमी और परिवार पर असर डालते हैं",
                            },
                            {
                                label: "सुझाव",
                                value:
                                    "फर्जी मुकदमों पर कड़ी कार्रवाई और जांच एजेंसियों की जवाबदेही तय हो",
                            },
                            {
                                label: "जनता पर असर",
                                value:
                                    "परिवार टूटना, समाज में इज्जत घटना, अदालतों पर बोझ बढ़ना",
                            },
                            {
                                label: "लक्ष्य",
                                value: "कानून का सही इस्तेमाल और न्याय का भरोसा सुनिश्चित करना",
                            },
                        ],
                    },
                },
                {
                    blockId: "shayari1",
                    type: "shayari",
                    data: {
                        text: "झूठे मुकदमों का असर,\nसिर्फ व्यक्ति पर नहीं,\nपूरा परिवार, समाज भी प्रभावित होता है।\n\nसच की जीत जरूरी,\nन्याय का भरोसा सुरक्षित होना चाहिए।",
                        caption: "रवि किशन, सांसद",
                    },
                },
                {
                    blockId: "p4",
                    type: "paragraph",
                    data: {
                        text: "रवि किशन ने स्पष्ट किया कि कानून का गलत इस्तेमाल अब आसान नहीं रहेगा। निर्दोष लोगों को न्याय मिले और कानून का दुरुपयोग रोका जाना चाहिए。",
                    },
                },
                {
                    blockId: "p5",
                    type: "paragraph",
                    data: {
                        text: "गोरखपुर से सांसद रवि किशन ने सीधे संदेश दिया कि झूठे मुकदमे आम आदमी की जिंदगी और समाज दोनों के लिए खतरा हैं। संसद से गली तक की बात — साफ, सीधे और जनता की जुबानी。",
                    },
                },
            ],
            meta: {
                title: "रवि किशन ने कहा – झूठे मुकदमों से आम आदमी और परिवार प्रभावित",
                description:
                    "गोरखपुर सांसद रवि किशन ने संसद में फर्जी मुकदमों के बढ़ते मामलों पर चिंता जताई। उन्होंने कानून का सही इस्तेमाल और न्याय की जवाबदेही सुनिश्चित करने की बात कही।",
                keywords: [
                    "Ravi Kishan",
                    "Gorakhpur News",
                    "Fake Cases",
                    "Politics",
                    "Awadh Ki Baat",
                    "फर्जी मुकदमा",
                    "सांसद रवि किशन",
                ],
                ogImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766859567/ravi_kishan_gorakhpur_joeca9.jpg",
            },
            published: true,
            views: 0,
        };

        // 3. Upsert the article
        const updatedArticle = await Content.findOneAndUpdate(
            { slug: articleData.slug },
            articleData,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({
            message: "Article seeded successfully",
            article: updatedArticle,
        });
    } catch (error: any) {
        console.error("Error seeding article:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
