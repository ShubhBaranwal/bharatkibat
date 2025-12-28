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
            title: "उन्नाव कांड: कुलदीप सेंगर को जमानत, बृजभूषण शरण का समर्थन, राजनीति में बहस तेज",
            slug: "unnaav-kand-kuldeep-sengar-brijbhushan-sharan",
            type: "news",
            categoryId: category._id,
            author: "Admin",
            coverImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766860395/brij_cgvhgl.jpg",
            tags: ["Unnaav Case", "Kuldeep Sengar", "Brijbhushan Sharan", "UP Politics", "Awadh Ki Baat", "Social Debate", "Justice News"],
            contentBlocks: [
                {
                    blockId: "h1",
                    type: "heading",
                    data: {
                        text: "उन्नाव कांड: कुलदीप सेंगर को जमानत, बृजभूषण शरण का समर्थन, राजनीति में बहस तेज",
                        level: 2
                    }
                },
                {
                    blockId: "p1",
                    type: "paragraph",
                    data: {
                        text: "लखनऊ: उन्नाव दुष्कर्म कांड में उम्रकैद की सजा पाए पूर्व भाजपा विधायक कुलदीप सिंह सेंगर को हाल ही में जमानत मिलने के बाद राजनीतिक और सामाजिक बहस फिर से तेज हो गई है। उपलब्ध रिपोर्ट्स के मुताबिक, इस फैसले के बाद राजनीतिक दलों और मीडिया में इस मामले पर चर्चा बढ़ गई है।"
                    }
                },
                {
                    blockId: "quote1",
                    type: "quote",
                    data: {
                        text: "सेंगर के खिलाफ अन्याय हुआ, जिससे मामला राष्ट्रीय राजनीति में चर्चा का विषय बन गया।",
                        caption: "पूर्व सांसद बृजभूषण शरण सिंह"
                    }
                },
                {
                    blockId: "p2",
                    type: "paragraph",
                    data: {
                        text: "स्थानीय और मीडिया दोनों स्तरों पर बृजभूषण शरण के बयान ने संवेदनशील बहस को गति दी है। उपलब्ध रिपोर्ट्स के अनुसार, बयान का हवाला स्थानीय मीडिया और सोशल प्लेटफॉर्म से लिया गया है।"
                    }
                },
                {
                    blockId: "p3",
                    type: "paragraph",
                    data: {
                        text: "इस घटना ने कई महत्वपूर्ण सवाल खड़े किए हैं: क्या इस तरह का समर्थन “बेटी बचाओ, बेटी पढ़ाओ” जैसी सरकारी पहल के संदेश के अनुरूप है? क्या भाजपा का यह रुख पार्टी की मूल नीतियों और सामाजिक जिम्मेदारी से मेल खाता है? क्या 2027 के उत्तर प्रदेश विधानसभा चुनाव में कुलदीप सेंगर या उनके परिवार को फिर से टिकट मिल सकता है?"
                    }
                },
                {
                    blockId: "p4",
                    type: "paragraph",
                    data: {
                        text: "विशेषज्ञ और जनता के बीच इन सवालों पर मतभेद बने हुए हैं, जिससे राजनीतिक बहस लगातार जारी है।"
                    }
                },
                {
                    blockId: "p5",
                    type: "paragraph",
                    data: {
                        text: "उन्नाव कांड और इसके बाद के बयानों ने समाज में बहस और चिंतन दोनों को गति दी है। पीड़ित परिवार और महिलाओं के अधिकारों पर ध्यान केंद्रित हुआ। राजनीतिक दलों की नीतियों और रुख पर जनमत का विश्लेषण हुआ। मीडिया और सोशल प्लेटफॉर्म पर लगातार चर्चा और रिपोर्टिंग जारी है।"
                    }
                },
                {
                    blockId: "fact1",
                    type: "factBox",
                    data: {
                        title: "मुख्य बिंदु",
                        facts: [
                            { label: "कुलदीप सेंगर", value: "पूर्व भाजपा विधायक, उन्नाव कांड में उम्रकैद सजा" },
                            { label: "हालिया घटना", value: "जमानत मिली" },
                            { label: "समर्थन", value: "पूर्व सांसद बृजभूषण शरण ने खुला समर्थन किया" },
                            { label: "राजनीतिक असर", value: "उत्तर प्रदेश में संवेदनशील बहस और चर्चा" },
                            { label: "सामाजिक असर", value: "महिला सुरक्षा, न्याय और सामाजिक जिम्मेदारी पर सवाल" }
                        ]
                    }
                },
                {
                    blockId: "p6",
                    type: "paragraph",
                    data: {
                        text: "इससे यह स्पष्ट होता है कि न्याय, राजनीतिक नैतिकता और सामाजिक जिम्मेदारी के मुद्दे लोगों की संवेदनाओं से सीधे जुड़े हैं। कुलदीप सेंगर की जमानत और बृजभूषण शरण के बयान ने उत्तर प्रदेश की राजनीति और समाज में संवेदनशील बहस को फिर से सक्रिय किया है। उपलब्ध रिपोर्ट्स के अनुसार, चुनावी और सामाजिक फैसलों में जनता की प्रतिक्रिया और राजनीतिक नैतिकता दोनों का महत्वपूर्ण असर पड़ता है।"
                    }
                }
            ],
            meta: {
                title: "उन्नाव कांड: कुलदीप सेंगर को जमानत, बृजभूषण शरण का समर्थन और राजनीतिक बहस",
                description: "उन्नाव दुष्कर्म कांड में उम्रकैद की सजा पाए पूर्व भाजपा विधायक कुलदीप सेंगर को जमानत मिलने के बाद राजनीतिक और सामाजिक बहस तेज। बृजभूषण शरण के बयान ने विवाद बढ़ाया।",
                keywords: ["Unnaav Case", "Kuldeep Sengar", "Brijbhushan Sharan", "UP Politics", "Justice Debate", "Awadh Ki Baat", "Social Impact"],
                ogImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766860395/brij_cgvhgl.jpg"
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
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
