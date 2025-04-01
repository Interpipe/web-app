import { ArrowRight, Droplet, Shield, Zap, Users, Award, Globe, Clock, Star } from 'lucide-react';
import HomeHero from '../components/HomeHero';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Droplet,
    title: "Superior Quality",
    description: "Our PVC pipes are manufactured using the highest quality materials, ensuring durability and long-lasting performance."
  },
  {
    icon: Shield,
    title: "Reliable Performance",
    description: "Built to withstand the toughest conditions, our pipes deliver consistent performance year after year."
  },
  {
    icon: Zap,
    title: "Energy Efficient",
    description: "Optimized design ensures maximum water flow with minimal energy consumption, saving you money."
  }
];

const stats = [
  { number: "10K+", label: "Happy Customers", icon: Users },
  { number: "25+", label: "Years Experience", icon: Award },
  { number: "50+", label: "Countries Served", icon: Globe },
  { number: "24/7", label: "Support Available", icon: Clock }
];

const featuredProducts = [
  {
    name: "PVC Irrigation Pipes",
    description: "High-quality PVC pipes for efficient water distribution",
    image: "/images/products/pvc-pipes.jpg",
    link: "/products#pvc-pipes"
  },
  {
    name: "Drip Irrigation Systems",
    description: "Precision water delivery for optimal plant growth",
    image: "/images/products/drip-irrigation.jpg",
    link: "/products#drip-irrigation"
  },
  {
    name: "Smart Controllers",
    description: "Automated irrigation control for water conservation",
    image: "/images/products/smart-controller.jpg",
    link: "/products#smart-controllers"
  }
];

const testimonials = [
  {
    quote: "Interpipe's products have transformed our agricultural operations. The water efficiency has increased by 40%.",
    author: "John Smith",
    role: "Farm Manager",
    company: "Green Valley Farms",
    image: "/images/testimonials/john.jpg"
  },
  {
    quote: "The quality and durability of their pipes are unmatched. We've been using them for over 5 years with zero issues.",
    author: "Sarah Chen",
    role: "Landscape Architect",
    company: "Green Design Studio",
    image: "/images/testimonials/sarah.jpg"
  }
];

const Home = () => {
  return (
    <div>
      <HomeHero />
      
      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 text-sky-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Interpipe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <feature.icon className="text-sky-500 mb-4" size={40} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Link key={index} to={product.link} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="text-sky-500 font-semibold flex items-center">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sky-600 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="inline-block bg-white text-sky-500 px-8 py-3 rounded-lg font-semibold border-2 border-sky-500 hover:bg-sky-50 transition-colors"
            >
              Read More Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Irrigation System?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to learn more about our products and get expert advice for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              to="/products"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 