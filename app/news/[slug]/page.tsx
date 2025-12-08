

export default async function SingleNewsPage ({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
 
 console.log(slug);
 
  return (
    <div>
{`This is the news article page for slug: ${slug}`}
 
    
    </div>
  )
}