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
            title: "अयोध्या 2029: विनय कटियार ने लोकसभा चुनाव में उतरने का ऐलान, राजनीति में हलचल",
            slug: "ayodhya-2029-vinay-katiyar-lok-sabha",
            type: "news",
            categoryId: category._id,
            author: "Admin",
            coverImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766860691/vinay_katiyar_x7nre4.jpg",
            tags: ["Ayodhya News", "Vinay Katiyar", "Faizabad Lok Sabha", "UP Politics", "Ram Mandir", "Awadh Ki Baat", "Election 2029"],
            contentBlocks: [
                {
                    blockId: "h1",
                    type: "heading",
                    data: {
                        text: "अयोध्या 2029: विनय कटियार ने लोकसभा चुनाव में उतरने का ऐलान, राजनीति में हलचल",
                        level: 2
                    }
                },
                {
                    blockId: "p1",
                    type: "paragraph",
                    data: {
                        text: "अयोध्या: रामकोट स्थित अपने आवास पर पूर्व सांसद और राम मंदिर आंदोलन के प्रमुख नेता विनय कटियार ने वर्ष 2029 के लोकसभा चुनाव में अयोध्या (फैजाबाद) संसदीय क्षेत्र से चुनाव लड़ने का ऐलान किया। उन्होंने समर्थकों से कहा कि फैजाबाद उनका पारंपरिक राजनीतिक क्षेत्र रहा है और अब वह सक्रिय राजनीति में लौटकर इसे फिर से नेतृत्व प्रदान करने का संकल्प ले चुके हैं।"
                    }
                },
                {
                    blockId: "p2",
                    type: "paragraph",
                    data: {
                        text: "कटियार ने अपने समर्थकों से बातचीत में कहा कि फैजाबाद लंबे समय तक उनका राजनीतिक गढ़ रहा है। उन्होंने यह भी बताया कि उनकी चुनावी रणनीति तैयार है और वह पूरी तैयारी के साथ 2029 के चुनाव में मैदान में उतरेंगे।"
                    }
                },
                {
                    blockId: "p3",
                    type: "paragraph",
                    data: {
                        text: "उन्होंने इस अवसर पर सनातन धर्म और राम मंदिर आंदोलन से जुड़े अपने अनुभव साझा किए। कटियार ने कहा कि भगवान श्रीराम का भव्य मंदिर बन चुका है और इससे अयोध्या का धार्मिक और सांस्कृतिक महत्व और बढ़ा है। उन्होंने बताया कि उनके दृष्टिकोण में यह क्षेत्र अपनी परंपरा और पहचान के लिए महत्वपूर्ण है।"
                    }
                },
                {
                    blockId: "p4",
                    type: "paragraph",
                    data: {
                        text: "इस अवसर पर उनके आवास ‘हिंदू धाम’ में आचार्य डॉ. ज्ञानप्रकाश दुबे ने उन्हें गदा और अंगवस्त्र भेंट कर सनातन धर्म और सांस्कृतिक मूल्यों की रक्षा के लिए सक्रिय भूमिका निभाने का संकल्प दिलाया। कार्यक्रम में मिल्कीपुर के हिंदू नेता रामसजीवन मिश्र, भाजपा युवा नेता चंद्रप्रकाश मिश्र और कई स्थानीय समर्थक मौजूद रहे।"
                    }
                },
                {
                    blockId: "fact1",
                    type: "factBox",
                    data: {
                        title: "विनय कटियार का राजनीतिक परिचय",
                        facts: [
                            { "label": "जन्म", "value": "11 नवंबर 1954, कानपुर" },
                            { "label": "शिक्षा", "value": "कानपुर विश्वविद्यालय, वाणिज्य स्नातक" },
                            { "label": "राजनीतिक शुरुआत", "value": "छात्र राजनीति, अखिल भारतीय विद्यार्थी परिषद" },
                            { "label": "1984", "value": "बजरंग दल की स्थापना" },
                            { "label": "1991,1996,1999", "value": "फैजाबाद से लोकसभा सांसद" },
                            { "label": "2002–04", "value": "उत्तर प्रदेश भाजपा अध्यक्ष" },
                            { "label": "2006–2018", "value": "राज्यसभा सांसद (दो बार)" },
                            { "label": "महत्वपूर्ण घटनाएं", "value": "1989 में अयोध्या आए, राम मंदिर आंदोलन में अग्रिम पंक्ति के नेता, 6 दिसंबर 1992 की घटनाओं में शामिल" }
                        ]
                    }
                },
                {
                    blockId: "p5",
                    type: "paragraph",
                    data: {
                        text: "विनय कटियार के इस ऐलान के बाद अयोध्या की राजनीति में हलचल बढ़ गई है। समर्थकों में उत्साह है और राजनीतिक गलियारों में चर्चा हो रही है कि 2029 के लोकसभा चुनाव में अयोध्या का चुनावी रण किस रूप में सामने आएगा।"
                    }
                },
                {
                    blockId: "p6",
                    type: "paragraph",
                    data: {
                        text: "विशेषज्ञों के अनुसार, इस कदम से क्षेत्रीय राजनीति, धार्मिक और सांस्कृतिक भावनाओं पर असर पड़ सकता है। इससे स्थानीय और राज्य स्तर पर राजनीतिक सक्रियता बढ़ने की संभावना है।"
                    }
                },
                {
                    blockId: "p7",
                    type: "paragraph",
                    data: {
                        text: "विनय कटियार का 2029 लोकसभा चुनाव में अयोध्या से मैदान में उतरने का ऐलान क्षेत्रीय राजनीति और सामाजिक चर्चाओं में नई हलचल ला सकता है। समर्थकों और राजनीतिक दलों की नजरें अब अगले चुनावी समीकरणों पर टिकी हैं।"
                    }
                }
            ],
            meta: {
                title: "अयोध्या 2029: विनय कटियार का लोकसभा चुनाव ऐलान और राजनीतिक हलचल",
                description: "पूर्व सांसद विनय कटियार ने 2029 लोकसभा चुनाव में अयोध्या से मैदान में उतरने का ऐलान किया। राजनीतिक हलचल, समर्थकों की प्रतिक्रिया और सामाजिक महत्व।",
                keywords: ["Vinay Katiyar", "Ayodhya 2029", "Faizabad Lok Sabha", "UP Politics", "Ram Mandir", "Awadh Ki Baat", "Election News"],
                ogImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766860691/vinay_katiyar_x7nre4.jpg"
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
