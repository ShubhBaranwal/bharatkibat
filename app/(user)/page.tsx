// app/(user)/page.tsx
import Link from "next/link";

// async function getLatestNews() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
//     cache: "no-store",
//   });
//   return res.json();
// }

export default async function HomePage() {
  // const { news } = await getLatestNews();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Latest News</h2>

      <div className="grid md:grid-cols-3 gap-6">
        hello this is news website home page
      </div>
    </div>
  );
}
