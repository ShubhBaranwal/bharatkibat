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

        const rahulGandhiBiography = {
            title: "राहुल गांधी की जीवनी: विरासत, शिक्षा और भारतीय लोकतंत्र में विचार आधारित राजनीति की यात्रा",
            slug: "rahul-gandhi-biography-indian-democracy",
            type: "biography",
            categoryId: bioCategory._id,
            author: "Admin",
            coverImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1765949982/rahul-gandhi-photo-with-mike_uhaop6.png",
            tags: [
                "Rahul Gandhi Biography",
                "राहुल गांधी जीवन परिचय",
                "Indian National Congress Leader",
                "Gandhi Family Politics",
                "Rahul Gandhi Political Journey",
                "Indian Democracy Leaders",
            ],
            published: true,

            meta: {
                title: "राहुल गांधी की जीवनी | शिक्षा, राजनीतिक जीवन और भारतीय लोकतंत्र में भूमिका",
                description: "राहुल गांधी की विस्तृत जीवनी: जन्म, पारिवारिक पृष्ठभूमि, शिक्षा, राजनीति में प्रवेश, कांग्रेस पार्टी में भूमिका और भारतीय लोकतंत्र में उनके विचारों का संतुलित एवं तथ्यात्मक विवरण।",
                keywords: [
                    "Rahul Gandhi biography in Hindi",
                    "राहुल गांधी जीवन परिचय",
                    "Rahul Gandhi education",
                    "Rahul Gandhi political ideology",
                    "Congress leader Rahul Gandhi biography",
                    "Indian democracy Rahul Gandhi",
                ],
                ogImage: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/rahul-gandhi-og.jpg",
            },

            contentBlocks: [
                {
                    type: "heading",
                    data: { text: "प्रस्तावना" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राहुल गांधी आधुनिक भारतीय राजनीति के उन नेताओं में शामिल हैं जिनकी पहचान केवल सत्ता की राजनीति तक सीमित नहीं है, बल्कि विचार, संवाद और लोकतांत्रिक संस्थाओं के महत्व को रेखांकित करने से जुड़ी है। वे भारतीय राष्ट्रीय कांग्रेस के प्रमुख नेताओं में से एक हैं और सार्वजनिक जीवन में संतुलित दृष्टिकोण, संवैधानिक मूल्यों और सामाजिक समावेशन पर जोर देने के लिए जाने जाते हैं।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "उनका राजनीतिक सफर एक ऐसी यात्रा के रूप में देखा जाता है जिसमें विरासत, व्यक्तिगत अनुभव और आधुनिक लोकतांत्रिक सोच का संगम दिखाई देता है।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "जन्म और पारिवारिक पृष्ठभूमि" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राहुल गांधी का जन्म 19 जून 1970 को नई दिल्ली में हुआ। वे भारत के प्रतिष्ठित नेहरू-गांधी परिवार से संबंध रखते हैं, जिसने स्वतंत्रता आंदोलन से लेकर आधुनिक भारत के निर्माण तक महत्वपूर्ण भूमिका निभाई है। उनके परदादा जवाहरलाल नेहरू स्वतंत्र भारत के पहले प्रधानमंत्री थे, जबकि दादी इंदिरा गांधी और पिता राजीव गांधी भी देश के प्रधानमंत्री रहे।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "इस राजनीतिक विरासत के बावजूद, राहुल गांधी का बचपन अपेक्षाकृत निजी माहौल में बीता। सुरक्षा कारणों से उनका जीवन सामान्य सार्वजनिक जीवन से अलग रहा, जिसने उनके व्यक्तित्व में आत्मसंयम और गंभीरता को जन्म दिया।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "शिक्षा और बौद्धिक विकास" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राहुल गांधी ने अपनी प्रारंभिक शिक्षा भारत में प्राप्त की। इसके बाद उन्होंने उच्च शिक्षा के लिए विदेश का रुख किया। उन्होंने हार्वर्ड विश्वविद्यालय में अध्ययन किया और बाद में यूनाइटेड किंगडम के ट्रिनिटी कॉलेज, कैम्ब्रिज से स्नातक की पढ़ाई पूरी की।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "विदेश में शिक्षा के दौरान उन्हें विभिन्न राजनीतिक व्यवस्थाओं, आर्थिक मॉडलों और लोकतांत्रिक संस्थाओं को समझने का अवसर मिला। यह अनुभव उनके विचारों में अंतरराष्ट्रीय दृष्टिकोण और विश्लेषणात्मक सोच जोड़ने में सहायक रहा।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "राजनीति में प्रवेश" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राहुल गांधी ने औपचारिक राजनीति में प्रवेश वर्ष 2004 में किया, जब वे उत्तर प्रदेश के अमेठी लोकसभा क्षेत्र से सांसद चुने गए। संसद में उनके प्रवेश को युवा नेतृत्व के रूप में देखा गया।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "सांसद के रूप में उन्होंने शिक्षा, रोजगार, युवाओं की भागीदारी और सामाजिक न्याय जैसे विषयों पर ध्यान केंद्रित किया। उनका प्रयास रहा कि संसद और राजनीति आम नागरिकों की वास्तविक समस्याओं से जुड़ी रहे।",
                    },
                },

                {
                    type: "quote",
                    data: {
                        text: "लोकतंत्र केवल चुनावों से नहीं, बल्कि संस्थाओं, संवाद और नागरिकों की भागीदारी से मजबूत होता है।",
                        author: "राहुल गांधी",
                    },
                },

                {
                    type: "heading",
                    data: { text: "कांग्रेस पार्टी में भूमिका और नेतृत्व" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राहुल गांधी ने भारतीय राष्ट्रीय कांग्रेस में विभिन्न संगठनात्मक भूमिकाएँ निभाईं। उन्होंने युवाओं को राजनीति से जोड़ने, आंतरिक संवाद को बढ़ाने और पार्टी के ढांचे को आधुनिक बनाने पर बल दिया।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "कांग्रेस अध्यक्ष के रूप में उनके कार्यकाल में संगठनात्मक सुधार, पारदर्शिता और जमीनी स्तर पर संपर्क को प्राथमिकता दी गई।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "जनसंपर्क, यात्राएँ और संवाद" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राहुल गांधी ने देश के विभिन्न हिस्सों में व्यापक जनसंपर्क यात्राएँ कीं। इन यात्राओं का उद्देश्य समाज के विभिन्न वर्गों से सीधे संवाद स्थापित करना और उनकी चिंताओं को समझना रहा।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "उनकी यात्राओं को एक ऐसे प्रयास के रूप में देखा गया, जिसमें राजनीति को केवल सत्ता तक सीमित न रखकर संवाद और सहभागिता का माध्यम बनाया गया।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "विचारधारा और दृष्टिकोण" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राहुल गांधी की राजनीति का केंद्र भारतीय संविधान, लोकतांत्रिक संस्थाओं और सामाजिक समावेशन पर आधारित है। वे बहुलतावाद, अभिव्यक्ति की स्वतंत्रता और समान अवसरों के महत्व पर जोर देते हैं।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "उनका दृष्टिकोण यह मानता है कि लोकतंत्र की मजबूती केवल सरकार से नहीं, बल्कि सक्रिय नागरिक सहभागिता और मजबूत संस्थाओं से आती है।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "व्यक्तिगत जीवन और रुचियाँ" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राहुल गांधी निजी जीवन में सादगी पसंद करते हैं। उन्हें अध्ययन, प्रकृति, यात्रा और आत्मचिंतन में रुचि है। वे मानसिक संतुलन और निरंतर सीखने को जीवन का महत्वपूर्ण हिस्सा मानते हैं।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "निष्कर्ष" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राहुल गांधी का जीवन और राजनीतिक यात्रा भारतीय लोकतंत्र में विचार आधारित राजनीति के महत्व को रेखांकित करती है। विरासत और आधुनिक सोच के संतुलन के साथ, उनका सफर समकालीन राजनीति में संवाद, संस्थागत सम्मान और सामाजिक समावेशन की भूमिका को उजागर करता है।",
                    },
                },
            ],
        };

        const result = await Content.findOneAndUpdate(
            { slug: rahulGandhiBiography.slug },
            rahulGandhiBiography,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, message: "Rahul Gandhi biography seeded successfully", data: result });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
