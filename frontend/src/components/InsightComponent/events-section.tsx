import { motion } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, MapPin, Users, Heart, Award, Lightbulb } from "lucide-react";
import { usePlacement } from "../../context/PlacementsContext";

const events = [
  {
    id: 1,
    title: "Digital Transformation Summit 2025",
    type: "Industry Conference",
    date: "April 15-16, 2025",
    location: "Mumbai Convention Center",
    description: "Join industry leaders for two days of insights on the future of digital integration and emerging technologies.",
    image: "/images/careers-meeting.png",
    attendees: "500+ Expected"
  },
  {
    id: 2,
    title: "Tech Training Workshop Series",
    type: "Educational",
    date: "Every Month",
    location: "Cache Digitech HQ",
    description: "Monthly hands-on workshops covering latest integration technologies, cloud platforms, and best practices.",
    image: "/blog/insight.jpg",
    attendees: "50 per session"
  },
  {
    id: 3,
    title: "Innovation Hackathon",
    type: "Competition",
    date: "June 20-22, 2025",
    location: "Bangalore Tech Park",
    description: "48-hour hackathon focused on solving real-world system integration challenges with innovative solutions.",
    image: "/blog/global.jpg",
    attendees: "200+ Participants"
  }
];

const socialActivities = [
  {
    icon: Heart,
    title: "Community Outreach",
    description: "Supporting local schools with technology education and digital literacy programs.",
    impact: "500+ students trained"
  },
  {
    icon: Award,
    title: "Scholarship Program",
    description: "Annual scholarships for underprivileged students pursuing technology education.",
    impact: "25 scholarships yearly"
  },
  {
    icon: Lightbulb,
    title: "Open Source Initiatives",
    description: "Contributing to open source projects and maintaining integration tools for the community.",
    impact: "15+ projects maintained"
  }
];

export function EventsSection() {
  const eventsImageUrl = usePlacement('insights', 'events', 'image') || '/blog/insightsection.jpg';
  return (
    <section className="pt-0 pb-16 lg:pb-24 bg-gray-50 scroll-mt-20" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Events & <span className="text-red-600">Community</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us at industry events and discover how we're giving back to the technology community.
          </p>
        </motion.div> */}

        {/* Events Section */}
        {/* <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-black mb-8"
          >
            Upcoming Events
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                        {event.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors">
                      {event.title}
                    </h4>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-red-600" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-red-600" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-red-600" />
                        {event.attendees}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div> */}

        {/* Social Activities Section */}
        {/* <div className="font-glacial relative">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-black mb-8 flex items-center justify-center"
          >
            Social Responsibility
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {socialActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 group">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="inline-block p-4 bg-red-100 rounded-full mb-4"
                    >
                      <IconComponent className="w-8 h-8 text-red-600" />
                    </motion.div>
                    
                    <h4 className="text-lg font-bold text-black mb-3 group-hover:text-red-600 transition-colors">
                      {activity.title}
                    </h4>
                    
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                      {activity.description}
                    </p>
                    
                    <div className="text-2xl font-bold text-red-600">
                      {activity.impact}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div> */}

        {/* Community Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="overflow-hidden">
            <div className="relative">
              <ImageWithFallback
                src={eventsImageUrl}
                alt="Community Activities"
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl md:text-4xl font-bold mb-4">
                    Building Tomorrow's Tech Community
                  </h3>
                  <p className="text-sm md:text-xl">
                    Together we grow, innovate, and create lasting impact
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}