import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// This would normally come from a database
const getBlogPost = (id: string) => {
  const posts = [
    {
      id: "1",
      title: "The Art of Perfect Bread Making",
      content: `
        <p>Bread making is both an art and a science. The perfect loaf requires quality ingredients, precise measurements, and careful attention to technique. At Al Thai Foods, we believe that great bread starts with exceptional flour.</p>
        
        <h2>The Foundation: Quality Flour</h2>
        <p>The type of flour you use significantly impacts your bread's texture, flavor, and rise. Our Premium Wheat Flour is specially formulated for bread making, with the ideal protein content to develop strong gluten networks that trap gases during fermentation, resulting in that perfect rise and chewy texture.</p>
        
        <h2>The Science of Fermentation</h2>
        <p>Fermentation is where the magic happens. As yeast consumes sugars in the dough, it produces carbon dioxide and alcohol, which give bread its distinctive flavor and airy structure. Proper fermentation requires patience—rushing this process results in less flavorful bread.</p>
        
        <h2>Kneading Techniques</h2>
        <p>Kneading develops the gluten structure in your dough. Whether you prefer hand kneading or using a stand mixer, the goal is to create a smooth, elastic dough that passes the "windowpane test"—when a small piece can be stretched thin enough to see light through without tearing.</p>
        
        <h2>The Importance of Proofing</h2>
        <p>Proofing allows the dough to rise before baking. The environment matters: too cold, and the yeast becomes sluggish; too warm, and fermentation happens too quickly, affecting flavor development. The ideal proofing temperature is around 75-78°F (24-26°C).</p>
        
        <h2>Baking Environment</h2>
        <p>Professional bakers use steam-injected ovens to create that perfect crust. At home, you can replicate this by placing a pan of water in the oven or spraying water onto the hot oven walls (carefully!) when you put your bread in. The steam helps the bread expand fully before the crust sets.</p>
        
        <h2>The Final Touch: Cooling</h2>
        <p>Resist the temptation to cut into warm bread immediately. Cooling allows the crumb structure to set and moisture to distribute evenly. Cutting too soon results in a gummy texture.</p>
        
        <p>With quality ingredients like Al Thai Premium Flour and attention to these details, you'll be well on your way to creating bakery-quality bread at home.</p>
      `,
      excerpt:
        "Learn the secrets to baking the perfect loaf with our premium flour. We dive into the techniques used by professional bakers to achieve that perfect crust and soft interior.",
      image: "/placeholder.svg?height=600&width=1200",
      date: "May 10, 2023",
      author: "Sarah Ahmed",
      category: "Recipes",
      tags: ["bread making", "baking tips", "flour quality"],
    },
    {
      id: "2",
      title: "From Farm to Table: Our Flour Journey",
      content: `
        <p>At Al Thai Foods, we believe that exceptional flour begins long before it reaches our mill. Our journey from farm to table is a carefully orchestrated process that ensures quality at every step.</p>
        
        <h2>Selecting the Finest Wheat</h2>
        <p>Our journey begins with selecting the perfect wheat varieties. We work with trusted farmers who share our commitment to quality and sustainable farming practices. The wheat varieties are chosen based on their protein content, hardness, and overall baking performance.</p>
        
        <h2>Harvesting at Peak Maturity</h2>
        <p>Timing is crucial when harvesting wheat. Our agricultural experts monitor the fields closely to ensure the wheat is harvested at peak maturity, when the kernels have reached their optimal moisture content and nutritional profile.</p>
        
        <h2>Rigorous Quality Testing</h2>
        <p>Before the wheat enters our facility, it undergoes comprehensive testing. We analyze for protein content, moisture levels, and potential contaminants. Only wheat that meets our strict standards moves forward in the process.</p>
        
        <h2>The Milling Process</h2>
        <p>Our state-of-the-art milling facility combines traditional wisdom with modern technology. The wheat is cleaned, conditioned to the perfect moisture level, and then ground between precision rollers. This process separates the endosperm (which becomes white flour) from the bran and germ.</p>
        
        <h2>Enrichment and Fortification</h2>
        <p>Depending on the flour type, we may enrich it with essential nutrients or create specialized blends for specific baking needs. Our food scientists work tirelessly to develop formulations that deliver consistent performance.</p>
        
        <h2>Packaging with Care</h2>
        <p>The freshly milled flour is carefully packaged in moisture-resistant bags that preserve its quality. Each batch is labeled with a production date and lot number for complete traceability.</p>
        
        <h2>Distribution Network</h2>
        <p>Our efficient distribution network ensures that our flour reaches bakeries, supermarkets, and food manufacturers across the UAE in optimal condition. Temperature-controlled vehicles maintain the flour's freshness during transit.</p>
        
        <p>This meticulous attention to detail at every stage of the journey is why Al Thai Foods has become the trusted flour supplier for leading bakeries and food businesses throughout the region. When you choose our flour, you're not just getting an ingredient—you're getting our commitment to excellence from farm to table.</p>
      `,
      excerpt:
        "Discover how we source the finest wheat to create our premium flour products. We follow the journey from the wheat fields to your table, ensuring quality at every step.",
      image: "/placeholder.svg?height=600&width=1200",
      date: "April 22, 2023",
      author: "Mohammed Al Farsi",
      category: "Company News",
      tags: ["sourcing", "quality control", "milling process"],
    },
  ]

  return posts.find((post) => post.id === id) || posts[0]
}

type Props = {
  params: { id: string }
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getBlogPost(params.id)

  return {
    title: `${post.title} | Al Thai Foods Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.id)

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-16 bg-secondary/30 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-primary-600 mb-6 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all articles
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}</span>
              </div>
              <Badge variant="secondary">{post.category}</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="aspect-[16/9] relative rounded-xl overflow-hidden mb-8">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center flex-wrap gap-2">
                <Tag className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-gray-600 dark:text-gray-400">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
