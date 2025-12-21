import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Content from "@/models/Content";
import Category from "@/models/Category";
import { Types } from "mongoose";

export async function GET() {
    await dbConnect();

    try {
        let bioCategory = await Category.findOne({ name: "Biography" });

        if (!bioCategory) {
            // Create if not exists (fail-safe)
            bioCategory = await Category.create({
                name: "Biography",
                slug: "biography",
                uiLabel: "Biography",
                description: "Biographies of famous personalities",
                isActive: true
            });
        }

        const mamataBiography = {
            title: "ममता बनर्जी की जीवनी: संघर्ष, जनआंदोलन और बंगाल की पहली महिला मुख्यमंत्री बनने तक का सफर",
            slug: "mamata-banerjee-biography-struggle-to-chief-minister",
            type: "biography",
            categoryId: bioCategory._id,
            author: "भारत की बात",
            coverImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766253562/mamta_didi_wnhrdh.jpg",
            tags: [
                "ममता बनर्जी",
                "Mamata Banerjee Biography",
                "West Bengal CM",
                "Bengal Politics",
                "Women Leaders of India",
                "TMC Founder"
            ],
            meta: {
                title: "ममता बनर्जी की जीवनी: संघर्ष से सत्ता तक | पश्चिम बंगाल की मुख्यमंत्री",
                description: "ममता बनर्जी का जीवन संघर्ष, छात्र राजनीति, जनआंदोलनों और पश्चिम बंगाल की पहली महिला मुख्यमंत्री बनने की कहानी है। जानिए 2025 तक उनके योगदान और जनजीवन पर असर।",
                keywords: [
                    "ममता बनर्जी",
                    "Mamata Banerjee Biography in Hindi",
                    "West Bengal Politics",
                    "TMC Leader",
                    "Women Chief Minister"
                ],
                ogImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766253562/mamta_didi_wnhrdh.jpg"
            },
            published: true,
            contentBlocks: [
                {
                    type: "image",
                    data: {
                        src: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1766253562/mamta_didi_wnhrdh.jpg",
                        alt: "पश्चिम बंगाल की मुख्यमंत्री ममता बनर्जी",
                        caption: "ममता बनर्जी — संघर्षों से सजी राजनीति की कहानी"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "पश्चिम बंगाल की राजनीति में ममता बनर्जी का नाम सिर्फ सत्ता का नहीं, बल्कि संघर्ष, जिद और जनसरोकार की पहचान है। उनकी राजनीति सड़क से संसद तक फैली रही है, जहां आम लोगों की आवाज़ हमेशा केंद्र में रही।"
                    }
                },
                {
                    type: "heading",
                    data: { text: "प्रारंभिक जीवन और पारिवारिक पृष्ठभूमि", level: 2 }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "5 जनवरी 1955 को कोलकाता के एक साधारण ब्राह्मण परिवार में जन्मी ममता बनर्जी का जीवन शुरू से ही चुनौतियों से भरा रहा। उनके पिता प्रमिलेश्वर बनर्जी स्वतंत्रता सेनानी थे, जबकि मां गायत्री देवी नौ भाई-बहनों वाले परिवार की जिम्मेदारी संभालती थीं।"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "किशोरावस्था में पिता के निधन ने परिवार की आर्थिक स्थिति को डगमगा दिया। हालात से समझौता करने के बजाय ममता बनर्जी ने स्टेनोग्राफर, शिक्षक, निजी ट्यूटर और सेल्स गर्ल के रूप में काम कर परिवार को संभाला। यही अनुभव आगे चलकर उनकी राजनीति की बुनियाद बने।"
                    }
                },
                {
                    type: "heading",
                    data: { text: "छात्र जीवन से नेतृत्व की पहचान", level: 2 }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "1970 में देशबन्धु शिशु विद्यालय से स्कूली शिक्षा पूरी करने के बाद ममता बनर्जी ने कोलकाता विश्वविद्यालय से इतिहास में स्नातक और इस्लामिक इतिहास में स्नातकोत्तर किया। उन्होंने B.Ed. और LL.B. की पढ़ाई भी पूरी की। बाद में उन्हें D.Litt. की मानद उपाधि प्रदान की गई।"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "महज 15 वर्ष की उम्र में छात्र राजनीति में कदम रखते हुए उन्होंने जोगमाया देवी कॉलेज में छात्र परिषद की स्थापना की। 1976 में पश्चिम बंगाल महिला कांग्रेस की महासचिव बनने के साथ उनका नाम एक जुझारू युवा नेता के रूप में स्थापित हुआ।"
                    }
                },
                {
                    type: "heading",
                    data: { text: "संसद से मुख्यमंत्री तक का सफर", level: 2 }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "1984 में ममता बनर्जी ने दिग्गज नेता सोमनाथ चटर्जी को हराकर लोकसभा चुनाव जीता और राष्ट्रीय राजनीति में अपनी पहचान बनाई। यह जीत बंगाल की राजनीति में बदलाव की आहट थी।"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "केंद्र सरकार में उन्होंने मानव संसाधन विकास, युवा मामले, खेल, महिला एवं बाल विकास, रेलवे तथा कोयला मंत्रालयों में जिम्मेदारी निभाई। सत्ता में रहते हुए भी उनका जमीनी जुड़ाव बना रहा।"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "1998 में अखिल भारतीय तृणमूल कांग्रेस (AITC) की स्थापना के बाद सिंगुर और नंदीग्राम आंदोलनों ने बंगाल की राजनीति को निर्णायक मोड़ दिया। 2011 में 34 वर्षों के वाम शासन को समाप्त कर वे पश्चिम बंगाल की पहली महिला मुख्यमंत्री बनीं।"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "2016 और 2021 में जनता ने दोबारा उन पर भरोसा जताया। 2024–2025 के दौरान उनका फोकस सामाजिक कल्याण, आधारभूत ढांचे, रोजगार सृजन और निवेश को बढ़ावा देने पर रहा।"
                    }
                },
                {
                    type: "factBox",
                    data: {
                        title: "प्रमुख जनकल्याण योजनाएँ और उनका असर",
                        facts: [
                            "लक्ष्मी भंडार: 2.2 करोड़ महिलाओं को मासिक आर्थिक सहायता",
                            "कन्याश्री प्रकल्प: बालिकाओं की शिक्षा को बढ़ावा, बाल विवाह में कमी",
                            "खाद्य साथी योजना: लगभग 9 करोड़ लोगों तक सस्ता राशन",
                            "कर्मश्री योजना: ग्रामीण रोजगार और आय में स्थिरता"
                        ]
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "बंगाल ग्लोबल बिजनेस समिट 2025 में लगभग 4.4 लाख करोड़ रुपये के निवेश प्रस्ताव सामने आए, जिससे राज्य में रोजगार के अवसर बढ़े और स्थानीय उद्योगों को गति मिली।"
                    }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "सिंगुर और नंदीग्राम आंदोलनों के बाद भूमि अधिग्रहण नीति में बदलाव हुआ, जिससे किसानों के अधिकार मजबूत हुए और ग्रामीण समुदायों में भरोसा बढ़ा।"
                    }
                },
                {
                    type: "heading",
                    data: { text: "राजनीति से परे ममता बनर्जी", level: 2 }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राजनीति के अलावा ममता बनर्जी एक सक्रिय लेखिका और चित्रकार भी हैं। उन्होंने 20 से अधिक पुस्तकें लिखी हैं और अपनी कई पेंटिंग्स सामाजिक कार्यों के लिए नीलाम की हैं। सादगी और आम लोगों से सीधा संवाद उनकी पहचान है।"
                    }
                },
                {
                    type: "heading",
                    data: { text: "वर्तमान भूमिका और भविष्य की दिशा", level: 2 }
                },
                {
                    type: "paragraph",
                    data: {
                        text: "मुख्यमंत्री के रूप में ममता बनर्जी का विज़न पश्चिम बंगाल को पूर्वी भारत का वाणिज्यिक गेटवे बनाने का है। सड़क, कनेक्टिविटी, ग्रामीण आवास और महिला सशक्तिकरण पर उनका जोर राज्य के विकास की दिशा तय कर रहा है।"
                    }
                },
                {
                    type: "quote",
                    data: {
                        text: "ममता बनर्जी की राजनीति सत्ता की नहीं, बल्कि संघर्ष से उठी जनआवाज़ की राजनीति है।",
                        author: "वरिष्ठ राजनीतिक विश्लेषक"
                    }
                }
            ],
            views: 0
        };

        const result = await Content.findOneAndUpdate(
            { slug: mamataBiography.slug },
            mamataBiography,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, message: "Mamata Banerjee biography seeded successfully", data: result });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
