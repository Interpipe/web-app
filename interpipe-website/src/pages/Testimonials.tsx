import { Star, Quote } from 'lucide-react';
import Hero from '../components/Hero';

const testimonials = [
  {
    id: 1,
    name: 'David Thompson',
    role: 'Farm Owner',
    company: 'Thompson Farms',
    image: '/images/testimonials/david.jpg',
    rating: 5,
    testimonial: 'The irrigation system provided by Interpipe has transformed our farming operations. The water efficiency has improved significantly, and the support team is always ready to help.',
    category: 'Agriculture',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Landscape Architect',
    company: 'Green Design Studio',
    image: '/images/testimonials/sarah.jpg',
    rating: 5,
    testimonial: "I've worked with Interpipe on multiple commercial projects. Their products are reliable, and their technical expertise is invaluable for complex installations.",
    category: 'Landscaping',
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    role: 'Golf Course Manager',
    company: 'Pine Valley Golf Club',
    image: '/images/testimonials/michael.jpg',
    rating: 5,
    testimonial: 'The smart irrigation system has helped us maintain perfect course conditions while reducing water consumption by 30%. The ROI has been exceptional.',
    category: 'Sports',
  },
  {
    id: 4,
    name: 'Emily Watson',
    role: 'Greenhouse Manager',
    company: 'Sustainable Growth Co.',
    image: '/images/testimonials/emily.jpg',
    rating: 5,
    testimonial: "Interpipe's drip irrigation system is perfect for our greenhouse operations. The precision control and water efficiency have significantly improved our crop yields.",
    category: 'Agriculture',
  },
];

const categories = ['All', 'Agriculture', 'Landscaping', 'Sports'];

const Testimonials = () => {
  return (
    <div>
      <Hero 
        title="Customer Testimonials"
        subtitle="See what our customers have to say about Interpipe"
        image="/images/hero/testimonials-hero.jpg"
      />
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-gray-200 p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-sky-500"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                    {/* Replace with actual image */}
                    <div className="w-full h-full rounded-full bg-sky-100 flex items-center justify-center">
                      <span className="text-sky-500 text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-current"
                      size={16}
                    />
                  ))}
                </div>

                <div className="relative mb-4">
                  <Quote className="absolute -top-2 -left-2 text-sky-500 opacity-20" size={24} />
                  <p className="text-gray-600 italic">{testimonial.testimonial}</p>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded-full">
                    {testimonial.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-sky-50 rounded-lg p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
              <p className="text-gray-600 mb-6">
                We'd love to hear about your experience with Interpipe products and services.
              </p>
              <button className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                Submit Your Testimonial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 