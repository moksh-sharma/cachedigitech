import { motion } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback"
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Prarthana Gupta Cache Technologies",
    excerpt: "Prarthana is the CMD of Cache and its group of companies. The first of its group companies, Cache Technologies was founded in 1991 that specialize in hardware solutions and support services and maintains exclusive partnership with most OEMs of the industry. ",
    author: "Purva Unipegasus",
    date: "March 15, 2025",
    category: "About Cache",
    readTime: "5 min read",
    image: "/team/prathnablog.jpg"
  },
  {
    id: 2,
    title: "Why the World Needs Sustainable Software More Than Ever",
    excerpt: "Digital technology is now so deeply integrated into everyday life that it's sometimes easy to forget it's even there. But the growing use...",
    author: "Developer palak",
    date: "March 8, 2025",
    category: "Cloud",
    readTime: "8 min read",
    image: "/blog/2ndblog.avif"
  },
 {
  id: 3,
  title: "Why the World Needs Sustainable Software More Than Ever",
  excerpt: "Digital technology is now so deeply integrated into everyday life that it's sometimes easy to forget it's even there....",
  author: "Shraddha Gupta",
  date: "February 28, 2025",
  category: "Security",
  readTime: "6 min read",
  image: "/blog/security.jpg"
}

];

export function BlogSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 scroll-mt-20" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Tech <span className="text-red-600">Insights</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in system integration and digital transformation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                      {post.category}
                    </Badge> */}
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-2" />
                      <span>{post.author}</span>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-red-600 group-hover:text-red-700"
                    >
                      {/* <ArrowRight className="w-5 h-5" /> */}
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            View All Articles
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
}