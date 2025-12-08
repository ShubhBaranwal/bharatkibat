// "use client";

// import React, { useState, useEffect } from "react";

// interface BreakingItem {
//   id: number;
//   title: string;
//   slug?: string;
// }

// const TrendingNews = () => {
//   // Dynamic News Array (can be fetched from API later)
//   const breakingNews: BreakingItem[] = [
//     {
//       id: 1,
//       title:
//         "दिल्ली ब्लास्ट केस: 'सुसाइड बॉम्बिंग शहादत नहीं, बल्कि संगीन जुर्म', बोले ओवैसी",
//     },
//     {
//       id: 2,
//       title: "भारत ने चांद पर भेजा नया मिशन, ISRO ने तोड़ी सभी उम्मीदें",
//     },
//     {
//       id: 3,
//       title: "बिहार चुनाव: पहले चरण में रिकॉर्ड मतदान",
//     },
//     {
//       id: 4,
//       title: "मुंबई में भारी बारिश, कई ट्रेनें प्रभावित",
//     },
//   ];

//   const [index, setIndex] = useState(0);

//   // Auto change news every 4 seconds
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % breakingNews.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [breakingNews.length]);

//   return (
//     <section
//       aria-label="Breaking News"
//       className="w-full my-6 px-4 flex justify-center"
//     >
//       <div className="w-full max-w-5xl flex items-center gap-3">
//         {/* Breaking Label */}
//         <span className="bg-[var(--light-red)] text-white px-5 py-2 rounded-full text-[1.2rem] font-bold whitespace-nowrap">
//           🔥 ब्रेकिंग न्यूज़
//         </span>

//         {/* News Slider */}
//         <div className="relative w-full overflow-hidden">
//           <p
//             key={index}
//             className="text-[1.25rem] font-semibold text-[var(--dark-red)] whitespace-nowrap animate-fade"
//           >
//             {breakingNews[index].title}
//           </p>
//         </div>
//       </div>

//       {/* Fade Animation */}
//       <style>
//         {`
//           .animate-fade {
//             animation: fadeIn 0.6s ease-in-out;
//           }
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(5px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//         `}
//       </style>
//     </section>
//   );
// };

// export default TrendingNews;


"use client";

import React, { useState, useEffect } from "react";

interface BreakingItem {
  id: number;
  title: string;
  slug?: string;
}

const TrendingNews = () => {
  const breakingNews: BreakingItem[] = [
    {
      id: 1,
      title:
        "दिल्ली ब्लास्ट केस: 'सुसाइड बॉम्बिंग शहादत नहीं, बल्कि संगीन जुर्म', बोले ओवैसी",
      slug: "delhi-blast-case-owaisi-statement",
    },
    {
      id: 2,
      title: "भारत ने चांद पर भेजा नया मिशन, ISRO ने तोड़ी सभी उम्मीदें",
      slug: "isro-new-moon-mission",
    },
    {
      id: 3,
      title: "बिहार चुनाव: पहले चरण में रिकॉर्ड मतदान",
      slug: "bihar-election-first-phase",
    },
    {
      id: 4,
      title: "मुंबई में भारी बारिश, कई ट्रेनें प्रभावित",
      slug: "mumbai-rain-disruption",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % breakingNews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [breakingNews.length]);

  return (
    <section
      aria-label="Breaking News Section"
      className="w-full my-6 px-4 flex justify-center"
    >
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md border border-gray-200 flex items-center gap-5 p-5 sm:flex-row flex-col">
        <div className="flex items-center gap-5">
        {/* LIVE Red Dot */}
        <div className="relative flex items-center justify-center">
          <span className="w-3 h-3 bg-(--light-red) rounded-full animate-ping absolute"></span>
          <span className="w-3 h-3 bg-(--light-red) rounded-full"></span>
        </div>

        {/* Breaking Label */}
        <span className="bg-(--light-red) text-white px-6 py-2 rounded-lg text-[0.9rem] sm:text-[1.1rem] font-bold whitespace-nowrap shadow">
          ब्रेकिंग न्यूज़
        </span>
</div>
        {/* News Slider */}
        <div className="flex flex-col gap-1 w-full overflow-hidden">
          <p
            key={index}
            className="sm:text-[1.45rem] text-[1rem] md:text-[1.6rem] font-bold text-(--dark-red) animate-fade leading-tight text-center sm:text-left"
          >
            {breakingNews[index].title}
          </p>

          {/* CTA: Read more */}
          <a
            href={`/news/${breakingNews[index].slug}`}
            className="text-(--light-red) font-semibold text-[1.05rem] hover:text-(--dark-red) transition underline text-center sm:text-left" 
          >
            पूरी खबर पढ़ें →
          </a>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          .animate-fade {
            animation: fadeIn 0.6s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default TrendingNews;
