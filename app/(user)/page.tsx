import { getHomepageData } from "@/lib/data/homepage";
import BigNewsGrid from "@/components/userComponents/BigNewsGrid";

// Revalidate every 60 seconds (matches the API cache control)
export const revalidate = 60;

export default async function Home() {
    const homepageData = await getHomepageData();

    return (
        <main>
            {homepageData.map((section) => {
                // If there is no main story (left), we skip rendering this category section logic
                // or we could render a different component. For BigNewsGrid, left is required.
                if (!section.left) return null;

                return (
                    <BigNewsGrid
                        key={section.category.slug}
                        title={section.category.name}
                        left={section.left}
                        middle={section.middle}
                        right={section.right}
                    />
                );
            })}

            {homepageData.length === 0 && (
                <div className="p-10 text-center text-gray-500">
                    No content available.
                </div>
            )}
        </main>
    );
}
