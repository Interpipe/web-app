import { Star, Quote } from 'lucide-react';
import Hero from '../components/Hero';
// Import hero image
import bluePvcImage from '../assets/Home/blue  pvc.jpg 2.jpg';

const testimonials = [
  {
    id: 1,
    name: 'Intergrated Construction Projects',
    role: 'Company',
    company: 'ICP',
    image: '/images/testimonials/icp.jpg',
    rating: 5,
    testimonial: 'Interpipe has been a great blessing to our business. They do not just meet our requirements but go beyond in providing the best possible products, support, pricing and technical assistance. Their well-stocked branch is a pleasure to deal with and offer not just great service but a personalized service to us. I do not need to use any other company other than Interpipe. I\'d strongly recommend them to anyone and I look forward to doing much more business with the team!',
    category: 'Construction',
  },
  {
    id: 2,
    name: 'LIQUITECH',
    role: 'Company',
    company: 'LIQUITECH',
    image: '/images/testimonials/liquitech.jpg',
    rating: 5,
    testimonial: "Working with Interpipe has been a delight on all of our sites and projects. They always had everything we needed and provided excellent service in terms of material supply. Their solution offerings have allowed us to provide a very efficient and reliable system in a very remote place.",
    category: 'Industry',
  },
  {
    id: 3,
    name: 'MAC HOMES',
    role: 'Company',
    company: 'MAC HOMES',
    image: '/images/testimonials/machomes.jpg',
    rating: 5,
    testimonial: 'We are in the business of Land and Property Development, and Inter Pipe is one of our consistent Pipe suppliers in terms of quality and service. We confidently recommend Inter Pipe Pvt Ltd as a solid and reliable pipe supplier.',
    category: 'Property Development',
  },
  {
    id: 4,
    name: 'FORTUNE HARDWARE',
    role: 'Company',
    company: 'FORTUNE HARDWARE',
    image: '/images/testimonials/fortune.jpg',
    rating: 5,
    testimonial: "Many thanks to Loreta and her Team, for their excellent product support and technical knowledge. You have yet again gone the extra mile to assist and solve my problems. It is refreshing to deal with a team you can trust. I am sincerely grateful.",
    category: 'Hardware',
  },
];

const categories = ['All', 'Construction', 'Industry', 'Property Development', 'Hardware'];

const Testimonials = () => {
  return (
    <div>
      <Hero 
        title="Customer Testimonials"
        subtitle="See what our customers have to say about Interpipe"
        image={bluePvcImage}
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
                    {/* Use company initial for avatar */}
                    <div className="w-full h-full rounded-full bg-sky-100 flex items-center justify-center">
                      <span className="text-sky-500 font-bold text-sm">
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