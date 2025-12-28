import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Content from "@/models/Content";
import Category from "@/models/Category";

export async function GET() {
    try {
        await connectToDatabase();

        // 1. Find the "Politics" Category
        const categoryName = "Politics";
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
            title: "BJP राष्ट्रीय कार्यकारी अध्यक्ष नितिन नबीन: बिहार से राष्ट्रीय मंच तक तेज़ी से उभरता करियर, राज्यसभा की अटकलें",
            slug: "nitin-nabin-bjp-national-executive-president-bihar-politics",
            type: "news",
            categoryId: category._id,
            author: "Admin",
            coverImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766049886/597701105_1416227776540611_3427446968670182863_n_1_ad7dle.jpg",
            tags: ["Nitin Nabin", "BJP", "Bihar Politics", "Rajya Sabha", "Political News", "AwadhKiBaat"],
            contentBlocks: [
                {
                    blockId: "p1",
                    type: "paragraph",
                    data: {
                        text: "पटना/दिल्ली: बिहार की राजनीति में लंबे समय से सक्रिय नितिन नबीन को हाल ही में भाजपा का राष्ट्रीय कार्यकारी अध्यक्ष बनाए जाने के बाद राष्ट्रीय राजनीतिक मंच पर चर्चा का केंद्र बना दिया गया है। उपलब्ध रिपोर्ट्स के अनुसार, इस फैसले के बाद राजनीतिक गलियारों और मीडिया में उनके करियर को लेकर अटकलें तेज हो गई हैं।"
                    }
                },
                {
                    blockId: "h1",
                    type: "heading",
                    data: { "text": "नितिन नबीन का राजनीतिक कदम और संकेत", "level": 2 }
                },
                {
                    blockId: "p2",
                    type: "paragraph",
                    data: {
                        text: "उपलब्ध रिपोर्ट्स के मुताबिक, नितिन नबीन के कार्यकारी अध्यक्ष बनाए जाने के तुरंत बाद उन्होंने बिहार सरकार में मंत्री पद से इस्तीफा दे दिया था। राजनीतिक विश्लेषक और पार्टी के अंदरूनी सूत्रों के अनुसार, यह कदम संकेत देता है कि भविष्य में वे बिहार विधानसभा से भी इस्तीफा दे सकते हैं और राज्यसभा की सदस्यता ग्रहण कर सकते हैं।"
                    }
                },
                {
                    blockId: "p3",
                    type: "paragraph",
                    data: {
                        text: "राज्यसभा चुनाव बिहार में लगभग तीन महीने बाद होने हैं, लेकिन पार्टी स्तर पर सियासी तैयारियाँ और रणनीतियाँ पहले से ही तेज़ी से बन रही हैं। विशेषज्ञ मानते हैं कि प्रधानमंत्री नरेंद्र मोदी और गृह मंत्री अमित शाह पार्टी में नितिन नबीन को महत्वपूर्ण जिम्मेदारी देने के मूड में हैं।"
                    }
                },
                {
                    blockId: "h2",
                    type: "heading",
                    data: { "text": "राजनीतिक और संगठनात्मक महत्व", "level": 2 }
                },
                {
                    blockId: "p4",
                    type: "paragraph",
                    data: {
                        text: "भाजपा के राष्ट्रीय नेतृत्व द्वारा नितिन नबीन को कार्यकारी अध्यक्ष बनाए जाने से पार्टी में संगठनात्मक स्थिति और रणनीति पर असर पड़ सकता है। उनके पदोन्नति से यह संदेश जाता है कि बिहार जैसे महत्वपूर्ण राज्य से आने वाले नेताओं को राष्ट्रीय भूमिका दी जा रही है।"
                    }
                },
                {
                    blockId: "list1",
                    type: "list",
                    data: {
                        style: "unordered",
                        items: [
                            "बिहार में आगामी राज्यसभा चुनाव में पार्टी की स्थिति और उम्मीदवार रणनीति प्रभावित हो सकती है।",
                            "पार्टी कार्यकर्ताओं और स्थानीय नेताओं में सक्रियता और संगठनात्मक ऊर्जा बढ़ सकती है।",
                            "राष्ट्रीय नेतृत्व की निर्णय प्रक्रिया और राजनीतिक स्थिरता पर असर हो सकता है।"
                        ]
                    }
                },
                {
                    blockId: "h3",
                    type: "heading",
                    data: { "text": "जनता और मीडिया पर प्रभाव", "level": 2 }
                },
                {
                    blockId: "p5",
                    type: "paragraph",
                    data: {
                        text: "नितिन नबीन की नई जिम्मेदारी और संभावित विधानसभा से इस्तीफे की चर्चा जनता और मीडिया दोनों में तेज़ हो गई है। सोशल मीडिया और राजनीतिक मंचों पर बिहार से राष्ट्रीय राजनीति तक उनके करियर को लेकर बहस जारी है।"
                    }
                },
                {
                    blockId: "p6",
                    type: "paragraph",
                    data: {
                        text: "विशेषज्ञों का मानना है कि यह कदम राज्य और केंद्र दोनों स्तर पर राजनीतिक समीकरणों को प्रभावित कर सकता है और अगले चुनावों की रणनीति को समझने का संकेत दे सकता है।"
                    }
                },
                {
                    blockId: "h4",
                    type: "heading",
                    data: { "text": "निष्कर्ष", "level": 2 }
                },
                {
                    blockId: "p7",
                    type: "paragraph",
                    data: {
                        text: "नितिन नबीन का राष्ट्रीय कार्यकारी अध्यक्ष बनना और बिहार सरकार में मंत्री पद से इस्तीफा उनके राजनीतिक करियर में नए मोड़ की शुरुआत है। आने वाले महीनों में उनके विधानसभा से इस्तीफे और राज्यसभा की संभावनाएँ भारतीय राजनीति के अगले स्तर के समीकरणों पर असर डाल सकती हैं।"
                    }
                },
                {
                    blockId: "fact1",
                    type: "factBox",
                    data: {
                        title: "मुख्य तथ्य",
                        facts: [
                            { label: "पद", value: "BJP राष्ट्रीय कार्यकारी अध्यक्ष" },
                            { label: "राजनीतिक अनुभव", value: "बिहार विधानसभा और मंत्री पद" },
                            { label: "संभावित अगला कदम", value: "राज्यसभा सदस्यता" },
                            { label: "राज्यसभा चुनाव", value: "लगभग 3 महीने में बिहार में" }
                        ]
                    }
                },
                {
                    blockId: "link1",
                    type: "link",
                    data: {
                        text: "अधिक राजनीतिक खबरों के लिए यहाँ क्लिक करें",
                        url: "https://www.bharatkibat.com",
                        description: "Bharat Ki Baat पर ताज़ा राजनीतिक समाचार पढ़ें"
                    }
                }
            ],
            meta: {
                title: "नितिन नबीन बने BJP राष्ट्रीय कार्यकारी अध्यक्ष, बिहार से राष्ट्रीय राजनीति तक तेजी",
                description: "भाजपा ने नितिन नबीन को राष्ट्रीय कार्यकारी अध्यक्ष बनाया। बिहार से राष्ट्रीय मंच तक उनके करियर और राज्यसभा की अटकलें। उपलब्ध रिपोर्ट्स और विशेषज्ञ विश्लेषण।",
                keywords: ["Nitin Nabin", "BJP", "Bihar Politics", "Rajya Sabha", "Political News", "AwadhKiBaat"],
                ogImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766049886/597701105_1416227776540611_3427446968670182863_n_1_ad7dle.jpg"
            },
            published: true,
            views: 0
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
            { error: error.message || "Internal Server Error", stack: error.stack },
            { status: 500 }
        );
    }
}
