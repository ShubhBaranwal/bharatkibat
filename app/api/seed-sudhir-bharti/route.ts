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
            title: "गोरखपुर: 11वीं के छात्र सुधीर भारती की दिनदहाड़े गोली मारकर हत्या, इलाके में तनाव",
            slug: "gorakhpur-sudhir-bharti-student-murder",
            type: "news",
            categoryId: category._id,
            author: "Admin",
            coverImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766859715/sudhir_gorakhpur_bhyeig.jpg",
            tags: ["Gorakhpur News", "Sudhir Bharti", "Student Safety", "Awadh Ki Baat", "School Violence", "Crime News"],
            contentBlocks: [
                {
                    blockId: "h1",
                    type: "heading",
                    data: {
                        text: "गोरखपुर: 11वीं के छात्र सुधीर भारती की दिनदहाड़े गोली मारकर हत्या, इलाके में तनाव",
                        level: 2
                    }
                },
                {
                    blockId: "p1",
                    type: "paragraph",
                    data: {
                        text: "गोरखपुर के पिपराइच इलाके में शुक्रवार दोपहर 11वीं कक्षा के छात्र सुधीर भारती को गोली मार दी गई। घटना ने इलाके में डर और चिंता बढ़ा दी है। परिजन और ग्रामीण गहरे सदमे में हैं।"
                    }
                },
                {
                    blockId: "p2",
                    type: "paragraph",
                    data: {
                        text: "पुलिस के मुताबिक, सुधीर अपने स्कूल के खेल मैदान में मौजूद था। तभी कुछ युवक आए और कथित विवाद के दौरान गोली चली। घायल छात्र को तुरंत अस्पताल ले जाया गया, लेकिन उपचार से पहले ही उसकी मौत हो गई।"
                    }
                },
                {
                    blockId: "quote1",
                    type: "quote",
                    data: {
                        text: "इस तरह की घटनाएँ बच्चों और स्कूलों की सुरक्षा पर गंभीर सवाल खड़े करती हैं।",
                        caption: "स्थानीय निवासी"
                    }
                },
                {
                    blockId: "p3",
                    type: "paragraph",
                    data: {
                        text: "घटना की सूचना मिलते ही पुलिस मौके पर पहुंची और जांच शुरू की। वर्तमान में दो आरोपियों को हिरासत में लिया गया है, जबकि दो अन्य फरार हैं। इलाके में शांति बनाए रखने के लिए अतिरिक्त पुलिस बल तैनात किया गया है।"
                    }
                },
                {
                    blockId: "timeline1",
                    type: "timeline",
                    data: {
                        events: [
                            {
                                date: "शुक्रवार दोपहर",
                                title: "सुधीर भारती पर हमला",
                                description: "स्कूल के खेल मैदान में कुछ युवकों ने कथित विवाद के दौरान गोली चलाई।"
                            },
                            {
                                date: "तुरंत बाद",
                                title: "घायल छात्र को अस्पताल ले जाया गया",
                                description: "परंतु इलाज से पहले सुधीर की मौत हो गई।"
                            },
                            {
                                date: "कुछ घंटे बाद",
                                title: "पुलिस जांच शुरू",
                                description: "दो आरोपियों को हिरासत में लिया गया, दो फरार। अतिरिक्त पुलिस बल तैनात।"
                            }
                        ]
                    }
                },
                {
                    blockId: "fact1",
                    type: "factBox",
                    data: {
                        title: "घटना के प्रमुख तथ्य",
                        facts: [
                            { "label": "स्थान", "value": "पिपराइच, गोरखपुर" },
                            { "label": "पीड़ित", "value": "सुधीर भारती, 11वीं छात्र" },
                            { "label": "घटना का समय", "value": "शुक्रवार दोपहर" },
                            { "label": "अभियुक्त", "value": "दो हिरासत में, दो फरार" },
                            { "label": "सुरक्षा उपाय", "value": "अतिरिक्त पुलिस बल तैनात, स्कूल अस्थायी रूप से बंद" }
                        ]
                    }
                },
                {
                    blockId: "p4",
                    type: "paragraph",
                    data: {
                        text: "पुलिस अधिकारी ने बताया कि CCTV फुटेज और गवाहों के बयान की मदद से मामले की गहन जांच जारी है। स्कूल परिसर को अस्थायी रूप से बंद कर दिया गया है।"
                    }
                },
                {
                    blockId: "p5",
                    type: "paragraph",
                    data: {
                        text: "घटना के कारण की अभी जांच जारी है। यह स्पष्ट नहीं हुआ है कि गोली चलाने का मकसद क्या था।"
                    }
                },
                {
                    blockId: "p6",
                    type: "paragraph",
                    data: {
                        text: "स्थानीय लोगों ने पुलिस की त्वरित कार्रवाई की उम्मीद जताई। इलाके में तनाव का माहौल है और परिजन गहरे सदमे में हैं।"
                    }
                },
                {
                    blockId: "p7",
                    type: "paragraph",
                    data: {
                        text: "पुलिस और प्रशासन सुरक्षा और न्याय सुनिश्चित करने के लिए सतर्क हैं। स्कूल परिसरों और भीड़-भाड़ वाले क्षेत्रों में अतिरिक्त निगरानी बढ़ाई गई है।"
                    }
                },
                {
                    blockId: "p8",
                    type: "paragraph",
                    data: {
                        text: "गोरखपुर में सुधीर भारती की हत्या ने स्कूल सुरक्षा और स्थानीय कानून व्यवस्था पर गंभीर सवाल खड़े किए हैं। पुलिस की त्वरित कार्रवाई और आरोपी की गिरफ्तारी इलाके में भरोसा बनाए रखने के लिए आवश्यक है।"
                    }
                }
            ],
            meta: {
                title: "गोरखपुर: 11वीं के छात्र सुधीर भारती की हत्या, इलाके में तनाव बढ़ा",
                description: "गोरखपुर के पिपराइच इलाके में 11वीं के छात्र सुधीर भारती की दिनदहाड़े गोली मारकर हत्या कर दी गई। पुलिस ने जांच शुरू कर दी है, दो आरोपी हिरासत में और दो फरार हैं।",
                keywords: ["Sudhir Bharti", "Gorakhpur News", "Student Safety", "School Violence", "Awadh Ki Baat", "Crime News", "Police Action"],
                ogImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766859715/sudhir_gorakhpur_bhyeig.jpg"
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
