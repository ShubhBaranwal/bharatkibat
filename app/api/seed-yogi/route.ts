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

        const yogiAdityanathBiography = {
            title: "योगी आदित्यनाथ की जीवनी: उत्तराखंड के साधारण गांव से उत्तर प्रदेश के मुख्यमंत्री बनने तक का सफर",
            slug: "yogi-adityanath-biography-uttar-pradesh-chief-minister",
            type: "biography",
            categoryId: bioCategory._id,
            author: "Admin",
            coverImage: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/yogi-adityanath-biography.jpg", // Keeping user's placeholder or I could replace if I had one
            tags: [
                "Yogi Adityanath Biography",
                "योगी आदित्यनाथ जीवन परिचय",
                "Uttar Pradesh Chief Minister",
                "Yogi Adityanath Life Story",
                "Indian Politician Biography",
            ],
            published: true,

            meta: {
                title: "योगी आदित्यनाथ की जीवनी | उत्तर प्रदेश के मुख्यमंत्री योगी आदित्यनाथ का जीवन परिचय",
                description: "योगी आदित्यनाथ की संपूर्ण जीवनी: जन्म, शिक्षा, सन्यास जीवन, राजनीतिक यात्रा और उत्तर प्रदेश के मुख्यमंत्री बनने तक का विस्तृत व प्रामाणिक विवरण।",
                keywords: [
                    "Yogi Adityanath biography in Hindi",
                    "योगी आदित्यनाथ जीवन परिचय",
                    "Yogi Adityanath political journey",
                    "Yogi Adityanath early life",
                    "Yogi Adityanath education",
                ],
                ogImage: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/yogi-adityanath-og.jpg",
            },

            contentBlocks: [
                {
                    type: "heading",
                    data: { text: "प्रस्तावना" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "योगी आदित्यनाथ भारतीय राजनीति के एक प्रमुख और प्रभावशाली नेता हैं, जो वर्तमान में उत्तर प्रदेश के मुख्यमंत्री के रूप में कार्यरत हैं। उनका जीवन सन्यास, अनुशासन और सार्वजनिक सेवा के समन्वय का उदाहरण माना जाता है। साधारण पारिवारिक पृष्ठभूमि से निकलकर देश के सबसे बड़े राज्य का नेतृत्व करने तक का उनका सफर विशेष रूप से उल्लेखनीय है।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "जन्म और प्रारंभिक जीवन" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "योगी आदित्यनाथ का जन्म 5 जून 1972 को उत्तराखंड के पौड़ी गढ़वाल जिले के पंचूर गांव में हुआ। उनका जन्म नाम अजय सिंह बिष्ट है। वे एक सामान्य मध्यमवर्गीय परिवार से आते हैं, जहां अनुशासन, परिश्रम और सादगी को महत्व दिया जाता था।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "बचपन से ही उनमें नेतृत्व क्षमता और आत्मनिर्भरता के गुण दिखाई देने लगे थे। पहाड़ी क्षेत्र में पले-बढ़े योगी आदित्यनाथ ने कठिन परिस्थितियों में जीवन जीने का अनुभव प्राप्त किया, जिसने उनके व्यक्तित्व को मजबूत बनाया।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "शिक्षा और सन्यास जीवन" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "योगी आदित्यनाथ ने अपनी प्रारंभिक शिक्षा उत्तराखंड में प्राप्त की और बाद में गणित विषय में स्नातक की पढ़ाई पूरी की। युवावस्था में उन्होंने सांसारिक जीवन से अलग होकर आध्यात्मिक मार्ग को अपनाने का निर्णय लिया।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "वे गोरखनाथ मठ से जुड़े और वहां सन्यास जीवन की दीक्षा ली। इसी दौरान उन्होंने सामाजिक सेवा, अनुशासन और संगठनात्मक जीवन को गहराई से समझा, जो आगे चलकर उनके सार्वजनिक जीवन की नींव बना।",
                    },
                },

                {
                    type: "quote",
                    data: {
                        text: "सेवा ही जीवन का सर्वोच्च उद्देश्य है, और समाज के प्रति जिम्मेदारी सबसे बड़ा धर्म।",
                        author: "योगी आदित्यनाथ",
                    },
                },

                {
                    type: "heading",
                    data: { text: "राजनीति में प्रवेश" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "योगी आदित्यनाथ ने राजनीति में प्रवेश एक युवा जनप्रतिनिधि के रूप में किया। वे पहली बार वर्ष 1998 में गोरखपुर लोकसभा क्षेत्र से सांसद चुने गए और इसके बाद लगातार कई बार जनता का विश्वास प्राप्त किया।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "सांसद के रूप में उन्होंने क्षेत्रीय विकास, सामाजिक मुद्दों और जनसंपर्क पर विशेष ध्यान दिया। उनकी पहचान एक सक्रिय और जमीनी स्तर पर जुड़े नेता के रूप में बनी।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "उत्तर प्रदेश के मुख्यमंत्री के रूप में भूमिका" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "वर्ष 2017 में योगी आदित्यनाथ ने उत्तर प्रदेश के मुख्यमंत्री के रूप में शपथ ली। उनके नेतृत्व में राज्य प्रशासन में अनुशासन, कानून व्यवस्था और बुनियादी ढांचे पर विशेष जोर दिया गया।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "सरकारी योजनाओं के प्रभावी क्रियान्वयन, निवेश को प्रोत्साहन और प्रशासनिक सुधार उनके कार्यकाल की प्रमुख विशेषताएं रही हैं।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "शासन दृष्टि और कार्यशैली" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "योगी आदित्यनाथ की कार्यशैली अनुशासन, समयबद्ध निर्णय और स्पष्ट प्रशासनिक दृष्टि पर आधारित मानी जाती है। वे नियमित समीक्षा बैठकों और जमीनी रिपोर्ट पर भरोसा करते हैं।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "उनका मानना है कि शासन का उद्देश्य आम नागरिक के जीवन को सरल बनाना और विकास के अवसरों को समान रूप से उपलब्ध कराना होना चाहिए।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "व्यक्तिगत जीवन और दिनचर्या" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "योगी आदित्यनाथ व्यक्तिगत जीवन में सादगी और संयम का पालन करते हैं। योग, ध्यान और नियमित दिनचर्या उनके जीवन का अभिन्न हिस्सा है। वे स्वयं को एक सार्वजनिक सेवक के रूप में देखते हैं, न कि व्यक्तिगत लाभ के दृष्टिकोण से।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "निष्कर्ष" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "योगी आदित्यनाथ का जीवन आध्यात्मिक अनुशासन और सार्वजनिक सेवा के संयोजन का उदाहरण है। उनका सफर यह दर्शाता है कि स्पष्ट उद्देश्य, कठोर परिश्रम और जिम्मेदारी की भावना के साथ नेतृत्व किया जाए, तो बड़े सामाजिक और प्रशासनिक दायित्वों को निभाया जा सकता है।",
                    },
                },
            ],
        };

        const result = await Content.findOneAndUpdate(
            { slug: yogiAdityanathBiography.slug },
            yogiAdityanathBiography,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, message: "Yogi Adityanath biography seeded successfully", data: result });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
