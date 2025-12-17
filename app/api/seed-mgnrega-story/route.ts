import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Content from "@/models/Content";
import Category from "@/models/Category";
import { Types } from "mongoose";

export async function GET() {
    await dbConnect();

    try {
        // 1. Find Category
        let category = await Category.findOne({ name: "Politics" });
        if (!category) {
            // Try case-insensitive
            category = await Category.findOne({ name: { $regex: new RegExp("^politics$", "i") } });
        }

        if (!category) {
            return NextResponse.json({ success: false, message: "Category 'Politics' not found" }, { status: 404 });
        }

        const categoryId = category._id;

        const storyData = {
            title: "ग्रामीण रोजगार नीति में बदलाव: मनरेगा का नया नाम और भविष्य को लेकर बढ़ी राजनीतिक बहस",
            slug: "mgnrega-rural-employment-policy-future-debate",
            type: "story",
            categoryId: categoryId,
            author: "Editorial Desk",
            coverImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1765958852/narega_v5xlji.jpg",
            tags: [
                "MGNREGA",
                "Rural Employment Policy",
                "Manrega Debate",
                "Government Reform",
                "Bihar Politics",
                "Employment Guarantee Scheme",
                "Gramin Rozgar Policy",
            ],
            published: true,
            meta: {
                title: "ग्रामीण रोजगार नीति में बदलाव और मनरेगा का नया नाम: राजनीतिक बहस और सुधारों की समीक्षा",
                description: "Gramin Rozgar Policy replaces MGNREGA? Debate intensifies as government hints at reforms while opposition raises concerns over rural employment security.",
                keywords: [
                    "MGNREGA future",
                    "Gramin Rozgar Policy",
                    "Rural employment India",
                    "Manrega reform debate",
                    "Employment guarantee scheme change",
                ],
                ogImage: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/mgnrega-news-og.jpg",
            },
            contentBlocks: [
                {
                    type: "heading",
                    data: { text: "नई दिल्ली | Published: December 2025" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "देश की ग्रामीण रोजगार नीति को लेकर केंद्र और राज्य सरकारों के बीच चर्चा तेज हो गई है। सूत्रों के अनुसार, सरकार मनरेगा का नाम बदलकर **Gramin Rozgar Policy** करने और योजना की संरचना को आधुनिक बनाने पर विचार कर रही है। यह कदम ग्रामीण रोजगार की प्रभावशीलता और पारदर्शिता बढ़ाने के उद्देश्य से उठाया जा रहा है।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "विपक्षी दल इसे सामाजिक सुरक्षा का संवेदनशील मामला मान रहे हैं और किसी भी बदलाव पर सतर्क रुख अपना रहे हैं। कांग्रेस और अन्य विपक्षी दलों का कहना है कि मनरेगा ग्रामीण गरीबों की आजीविका की रीढ़ है और गारंटी तत्व को कमजोर नहीं किया जाना चाहिए।",
                    },
                },
                {
                    type: "heading",
                    data: { text: "ग्रामीण रोजगार नीति क्यों चर्चा का केंद्र?" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "मनरेगा पिछले 20 वर्षों से ग्रामीण भारत में रोजगार उपलब्ध कराने की सबसे बड़ी सरकारी योजना रही है। महामारी, कृषि संकट और आर्थिक मंदी के दौरान यह योजना ग्रामीण परिवारों के लिए स्थिर आय का आधार बनी। सरकार का उद्देश्य अब इसे और अधिक टिकाऊ, पारदर्शी और डिजिटल बनाने का है।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "हाल के महीनों में ग्रामीण रोजगार नीति में सुधार की दिशा में संकेत मिले हैं, जिसमें रोजगार के स्वरूप, निगरानी प्रणाली और पारिश्रमिक वितरण में बदलाव शामिल हैं।",
                    },
                },
                {
                    type: "heading",
                    data: { text: "सरकार बदलाव की आवश्यकता क्यों बता रही है?" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "सरकारी अधिकारियों का कहना है कि मौजूदा मनरेगा ढांचे में कुछ संरचनात्मक कमजोरियां हैं, जिन्हें दूर करने के लिए सुधार जरूरी हैं। प्रमुख सुझावों में शामिल हैं:",
                    },
                },
                {
                    type: "list",
                    data: {
                        items: [
                            "डिजिटल ट्रैकिंग और काम की निगरानी प्रणाली को मजबूत बनाना",
                            "स्थायी परिसंपत्तियों और गांव की आधारभूत संरचना पर जोर",
                            "कौशल आधारित और टिकाऊ रोजगार के अवसर बढ़ाना",
                            "समय पर मजदूरी भुगतान सुनिश्चित करना और पारदर्शिता बढ़ाना",
                            "केंद्र और राज्य स्तर पर बेहतर समन्वय सुनिश्चित करना",
                        ],
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "सरकार का मानना है कि इन सुधारों से योजना अधिक परिणाम-केंद्रित और जवाबदेह बन सकती है। इसके तहत रोजगार की गुणवत्ता और स्थायित्व दोनों सुनिश्चित किए जाएंगे।",
                    },
                },
                {
                    type: "heading",
                    data: { text: "नीति में संभावित बदलाव" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "विशेषज्ञों के अनुसार, सरकार केवल नाम बदलने तक सीमित नहीं है। **Gramin Rozgar Policy** के तहत निम्नलिखित बदलाव प्रस्तावित हैं:",
                    },
                },
                {
                    type: "list",
                    data: {
                        items: [
                            "डिजिटल निगरानी और ऑनलाइन ट्रैकिंग सिस्टम",
                            "स्थायी परिसंपत्ति निर्माण पर अधिक फोकस",
                            "स्थानीय जरूरतों के अनुरूप काम की योजना",
                            "राज्य और केंद्र के बीच प्रशासनिक समन्वय",
                            "नौकरी की गुणवत्ता और काम के घंटे सुनिश्चित करना",
                        ],
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "हालांकि, फिलहाल कोई अंतिम मसौदा सार्वजनिक नहीं किया गया है। सभी बदलाव चरणबद्ध तरीके से लागू किए जाएंगे।",
                    },
                },
                {
                    type: "heading",
                    data: { text: "विपक्ष की आपत्ति और चिंता" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "कांग्रेस और अन्य विपक्षी दलों का कहना है कि योजना का मूल उद्देश्य—ग्रामीण मजदूरों को रोजगार और सामाजिक सुरक्षा प्रदान करना—कमजोर नहीं होना चाहिए। विपक्ष का तर्क है कि नाम बदलने या संरचना में बदलाव से योजना की गारंटी तत्व पर असर पड़ सकता है।",
                    },
                },
                {
                    type: "heading",
                    data: { text: "विशेषज्ञों की राय" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "नीति विशेषज्ञ और ग्रामीण विकास विशेषज्ञ मानते हैं कि सुधार जरूरी हैं, लेकिन इन्हें संतुलित और चरणबद्ध तरीके से लागू किया जाना चाहिए। उनके अनुसार:",
                    },
                },
                {
                    type: "list",
                    data: {
                        items: [
                            "बदलाव चरणबद्ध तरीके से लागू किए जाने चाहिए",
                            "मजदूरी भुगतान और काम की उपलब्धता सर्वोच्च प्राथमिकता रहे",
                            "राज्य, पंचायत और श्रमिक संगठनों से संवाद जरूरी है",
                            "सामाजिक और आर्थिक प्रभाव का आकलन पहले किया जाना चाहिए",
                        ],
                    },
                },
                {
                    type: "heading",
                    data: { text: "आगे की राह और संभावना" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "फिलहाल सरकार ने Gramin Rozgar Policy के आधिकारिक लॉन्च या संशोधन की घोषणा नहीं की है। आगामी बजट, संसद सत्र और नीति मंचों में दिशा स्पष्ट हो सकती है। विशेषज्ञों का मानना है कि सही ढंग से किए गए सुधार ग्रामीण अर्थव्यवस्था को मजबूत कर सकते हैं और लाखों परिवारों की आजीविका सुनिश्चित कर सकते हैं।",
                    },
                },
                {
                    type: "heading",
                    data: { text: "निष्कर्ष" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "मनरेगा का भविष्य केवल नाम बदलने या ढांचे के बदलाव तक सीमित नहीं है। यह ग्रामीण रोजगार, सामाजिक सुरक्षा और स्थानीय विकास को संतुलित रूप से सुनिश्चित करने का मुद्दा है। आगामी नीति सुधारों और सरकारी निर्णयों का प्रभाव सीधे करोड़ों ग्रामीण परिवारों की आर्थिक स्थिरता और रोजगार अवसरों पर पड़ेगा।",
                    },
                },
                {
                    type: "quote",
                    data: {
                        text: "यह लेख उपलब्ध सार्वजनिक जानकारी, नीति चर्चाओं और विशेषज्ञों की राय पर आधारित है। किसी भी प्रस्तावित बदलाव की अंतिम तस्वीर आधिकारिक घोषणा के बाद ही स्पष्ट होगी।",
                        author: "Editorial Desk",
                    },
                },
            ],
        };

        // Check if story already exists to avoid duplicates
        const existing = await Content.findOne({ slug: storyData.slug });
        if (existing) {
            return NextResponse.json({ success: false, message: "Story already exists", story: existing });
        }

        const story = await Content.create(storyData);

        return NextResponse.json({ success: true, story });
    } catch (error: any) {
        console.error("Error creating story:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
