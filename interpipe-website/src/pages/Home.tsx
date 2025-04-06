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
  { number: "150+", label: "Happy Customers", icon: Users },
  { number: "5+", label: "Years Experience", icon: Award },
  { number: "3+", label: "Countries Served", icon: Globe },
  { number: "24/7", label: "Support Available", icon: Clock }
];

const featuredProducts = [
  {
    name: "PVC Irrigation Pipes",
    description: "High-quality PVC pipes for efficient water distribution",
    image: "/src/assets/Products/PVC/Pvc edited 5.jpg",
    link: "/products#pvc-pipes"
  },
  {
    name: "HDPE Pipes",
    description: "Durable polyethylene pipes for various applications",
    image: "/src/assets/Products/POLY PIPES/HDPE Re edited.jpg",
    link: "/products#poly-pipes"
  },
  {
    name: "Borehole Casings",
    description: "Reliable casings for water well applications",
    image: "/src/assets/Products/Borehole Casings/Borehole Casings Edit 1.jpg",
    link: "/products#casings"
  }
];

const testimonials = [
  {
    quote: "Interpipe has been a great blessing to our business. They do not just meet our requirements but go beyond in providing the best possible products, support, pricing and technical assistance.",
    author: "Intergrated Construction Projects",
    role: "Company",
    company: "ICP",
    category: "Construction"
  },
  {
    quote: "Working with Interpipe has been a delight on all of our sites and projects. They always had everything we needed and provided excellent service in terms of material supply.",
    author: "LIQUITECH",
    role: "Company",
    company: "LIQUITECH",
    category: "Industry"
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
                  <div className="h-64 w-full overflow-hidden">
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
                  <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mr-4">
                    <span className="text-sky-500 font-bold">
                      {testimonial.company.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role} | {testimonial.category}
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