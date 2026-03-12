import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Calendar, User } from "lucide-react";
import { HARDCODED_BLOGS } from "../../data/blogsAndHighlights";

export function BlogSection() {
  const posts = HARDCODED_BLOGS;
  const navigate = useNavigate();

  return (
    <section className="pt-8 lg:pt-10 pb-0 bg-gray-50 scroll-mt-20" id="blog">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 overflow-visible">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            <span className="text-red-600">Blogs</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in system integration and digital transformation.
          </p>
        </motion.div>

        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">No blog posts yet.</div>
        )}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: "-30px" }}
            className="relative px-6 sm:px-8 lg:px-12 pb-8 md:pb-10 overflow-visible"
          >
            <Carousel
              opts={{
                align: "start",
                loop: true,
                skipSnaps: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 sm:-ml-4">
                {posts.map((post) => (
                  <CarouselItem
                    key={post.id}
                    className="pl-2 sm:pl-4 mb-6 basis-full sm:basis-[85%] md:basis-[70%] lg:basis-[45%] xl:basis-[32%]"
                  >
                    <Card
                      className="h-full mb-6 transition-all duration-300 ease-out group cursor-pointer border-0 shadow-md rounded-xl focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2"
                      onClick={() => navigate(`/blog/${post.id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          navigate(`/blog/${post.id}`);
                        }
                      }}
                    >
                      <CardHeader className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <ImageWithFallback
                            src={post.image}
                            alt={post.title}
                            className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 flex flex-col h-full">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                          <span>{post.date}</span>
                          <span className="mx-1.5">•</span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-base font-bold text-black mb-2 group-hover:text-red-600 transition-colors duration-300 ease-out line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-500 min-w-0 mt-auto">
                          <User className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                          <span className="truncate">{post.author}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 sm:-left-8 md:-left-12 h-10 w-10 border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 transition-colors duration-200 ease-out z-10" />
              <CarouselNext className="right-2 sm:-right-8 md:-right-12 h-10 w-10 border-2 border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 transition-colors duration-200 ease-out z-10" />
            </Carousel>
          </motion.div>
        )}

        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 ease-out"
          >
            View All Articles
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
}