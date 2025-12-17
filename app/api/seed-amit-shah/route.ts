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

        const amitShahBiography = {
            title: "अमित शाह की जीवनी: संगठनात्मक रणनीति, प्रशासनिक भूमिका और समकालीन भारतीय राजनीति में प्रभाव",
            slug: "amit-shah-biography-indian-politics",
            type: "biography",
            categoryId: bioCategory._id,
            author: "Admin",
            coverImage: "https://res.cloudinary.com/ddy5pkbkc/image/upload/v1765952984/amit_saha_ji_fywb1p.jpg",
            tags: [
                "Amit Shah Biography",
                "अमित शाह जीवन परिचय",
                "Indian Home Minister",
                "BJP Leader Amit Shah",
                "Indian Politics Leaders",
                "Union Home Minister Biography",
            ],
            published: true,

            meta: {
                title: "अमित शाह की जीवनी | शिक्षा, राजनीतिक सफर और भारत के गृह मंत्री के रूप में भूमिका",
                description: "अमित शाह की विस्तृत जीवनी: जन्म, शिक्षा, प्रारंभिक राजनीतिक जीवन, भाजपा संगठन में भूमिका, केंद्रीय गृह मंत्री के रूप में प्रशासनिक जिम्मेदारियाँ और भारतीय राजनीति में उनका समकालीन महत्व।",
                keywords: [
                    "Amit Shah biography in Hindi",
                    "अमित शाह जीवन परिचय",
                    "Amit Shah political career",
                    "Amit Shah Home Minister India",
                    "BJP leader Amit Shah biography",
                    "Indian internal security leadership",
                ],
                ogImage: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/amit-shah-og.jpg",
            },

            contentBlocks: [
                {
                    type: "heading",
                    data: { text: "प्रस्तावना" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "अमित शाह समकालीन भारतीय राजनीति के उन प्रमुख नेताओं में शामिल हैं जिनकी पहचान संगठनात्मक रणनीति, प्रशासनिक दक्षता और दीर्घकालिक राजनीतिक योजना से जुड़ी है। वे भारतीय जनता पार्टी के वरिष्ठ नेता हैं और भारत सरकार में केंद्रीय गृह मंत्री के रूप में कार्य कर चुके हैं।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "उनका राजनीतिक योगदान पार्टी संगठन, चुनावी प्रबंधन और शासन से जुड़े संस्थागत ढांचे के संदर्भ में देखा जाता है।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "जन्म और पारिवारिक पृष्ठभूमि" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "अमित शाह का जन्म 22 अक्टूबर 1964 को मुंबई, महाराष्ट्र में हुआ। उनका परिवार मूल रूप से गुजरात से संबंधित है और सामाजिक व व्यावसायिक गतिविधियों से जुड़ा रहा है।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "उनका पालन-पोषण एक अनुशासित पारिवारिक वातावरण में हुआ, जहाँ शिक्षा, संगठन और सामाजिक जिम्मेदारी को महत्व दिया गया।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "शिक्षा और प्रारंभिक जीवन" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "अमित शाह ने अपनी प्रारंभिक और उच्च शिक्षा गुजरात में प्राप्त की। उन्होंने विज्ञान विषय में स्नातक की डिग्री हासिल की।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "शैक्षणिक जीवन के दौरान ही वे संगठनात्मक गतिविधियों और सामाजिक कार्यों में रुचि लेने लगे, जिसने आगे चलकर उनके राजनीतिक जीवन की दिशा तय की।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "राजनीति में प्रवेश" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "अमित शाह का राजनीति में प्रवेश छात्र राजनीति और संगठनात्मक कार्यों के माध्यम से हुआ। वे राष्ट्रीय स्वयंसेवक संघ से जुड़े और बाद में भारतीय जनता पार्टी में सक्रिय भूमिका निभाने लगे।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "गुजरात में संगठनात्मक कार्यों के दौरान उन्होंने बूथ-स्तर प्रबंधन और कार्यकर्ता नेटवर्क को मजबूत करने पर ध्यान केंद्रित किया।",
                    },
                },

                {
                    type: "quote",
                    data: {
                        text: "संगठन की मजबूती ही लोकतांत्रिक राजनीति की स्थिरता का आधार होती है।",
                        author: "अमित शाह",
                    },
                },

                {
                    type: "heading",
                    data: { text: "गुजरात राजनीति में भूमिका" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "अमित शाह गुजरात सरकार में मंत्री रहे और प्रशासनिक जिम्मेदारियाँ निभाईं। इस दौरान उन्होंने गृह, परिवहन और अन्य विभागों से जुड़े कार्यों में भाग लिया।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "राज्य स्तर पर प्रशासनिक अनुभव ने उन्हें नीति क्रियान्वयन और शासन की व्यावहारिक चुनौतियों को समझने का अवसर दिया।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "भाजपा संगठन और राष्ट्रीय अध्यक्ष की भूमिका" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "अमित शाह ने भारतीय जनता पार्टी के राष्ट्रीय अध्यक्ष के रूप में संगठनात्मक ढांचे को विस्तार देने में महत्वपूर्ण भूमिका निभाई।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "उनके कार्यकाल में पार्टी संगठन को बूथ-स्तर तक मजबूत करने, कार्यकर्ताओं के प्रशिक्षण और डेटा-आधारित रणनीति पर जोर दिया गया।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "केंद्रीय गृह मंत्री के रूप में भूमिका" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "केंद्रीय गृह मंत्री के रूप में अमित शाह की जिम्मेदारियों में आंतरिक सुरक्षा, कानून-व्यवस्था, केंद्रीय सशस्त्र पुलिस बलों और राज्यों के साथ समन्वय शामिल रहा।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "यह भूमिका नीति-निर्माण, प्रशासनिक समीक्षा और संघीय ढांचे के अंतर्गत केंद्र-राज्य समन्वय से संबंधित होती है।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "सहकारिता मंत्रालय और संस्थागत विकास" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "अमित शाह को सहकारिता मंत्रालय की जिम्मेदारी भी सौंपी गई। यह मंत्रालय सहकारी संस्थाओं के लिए एक अलग प्रशासनिक ढांचा प्रदान करता है।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "इसका उद्देश्य सहकारी क्षेत्र में पारदर्शिता, संरचनात्मक सुधार और संस्थागत क्षमता को सुदृढ़ करना है।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "प्रशासनिक शैली और कार्यप्रणाली" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "अमित शाह की कार्यशैली को संरचित योजना, स्पष्ट जिम्मेदारी निर्धारण और समयबद्ध समीक्षा पर आधारित माना जाता है।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "वे निर्णय-निर्माण में संगठनात्मक अनुशासन और प्रक्रियागत स्पष्टता पर बल देते हैं।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "सार्वजनिक विमर्श और आलोचनाएँ" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "लंबे समय तक सार्वजनिक जीवन में सक्रिय रहने के कारण अमित शाह की नीतियों और निर्णयों पर विभिन्न दृष्टिकोणों से चर्चा होती रही है।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "लोकतांत्रिक व्यवस्था में नीति-निर्माण और प्रशासनिक निर्णयों पर सार्वजनिक विमर्श को एक स्वाभाविक प्रक्रिया माना जाता है।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "भारतीय राजनीति में समकालीन महत्व" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "अमित शाह का योगदान समकालीन भारतीय राजनीति में संगठनात्मक रणनीति और शासन के संयोजन के रूप में देखा जाता है।",
                    },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "उनकी भूमिका प्रशासन, संगठन और नीति-निर्माण के व्यापक संदर्भ में महत्वपूर्ण मानी जाती है।",
                    },
                },

                {
                    type: "heading",
                    data: { text: "निष्कर्ष" },
                },
                {
                    type: "paragraph",
                    data: {
                        text: "अमित शाह की राजनीतिक यात्रा संगठनात्मक क्षमता, प्रशासनिक अनुभव और दीर्घकालिक रणनीतिक दृष्टिकोण का उदाहरण प्रस्तुत करती है। उनका योगदान भारतीय राजनीति और शासन व्यवस्था के अध्ययन में एक महत्वपूर्ण संदर्भ प्रदान करता है।",
                    },
                },
            ],
        };

        const result = await Content.findOneAndUpdate(
            { slug: amitShahBiography.slug },
            amitShahBiography,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, message: "Amit Shah biography seeded successfully", data: result });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
