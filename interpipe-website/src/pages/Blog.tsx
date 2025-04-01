import { Calendar, Clock, Tag, Search } from 'lucide-react';
import Hero from '../components/Hero';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Smart Irrigation Systems',
    excerpt: 'Discover how modern technology is revolutionizing irrigation practices and improving water efficiency.',
    category: 'Technology',
    date: '2024-03-15',
    readTime: '5 min read',
    image: '/images/blog/smart-irrigation.jpg',
    author: 'John Smith',
  },
  {
    id: 2,
    title: 'Sustainable Agriculture: Water Conservation Tips',
    excerpt: 'Learn about effective water conservation techniques for agricultural applications.',
    category: 'Sustainability',
    date: '2024-03-10',
    readTime: '4 min read',
    image: '/images/blog/sustainable-ag.jpg',
    author: 'Sarah Johnson',
  },
  {
    id: 3,
    title: 'Choosing the Right Irrigation System for Your Farm',
    excerpt: 'A comprehensive guide to selecting the perfect irrigation solution for your agricultural needs.',
    category: 'Agriculture',
    date: '2024-03-05',
    readTime: '6 min read',
    image: '/images/blog/farm-irrigation.jpg',
    author: 'Michael Brown',
  },
  {
    id: 4,
    title: 'Maintenance Tips for Long-Lasting Irrigation Systems',
    excerpt: 'Essential maintenance practices to ensure your irrigation system performs optimally for years.',
    category: 'Maintenance',
    date: '2024-02-28',
    readTime: '4 min read',
    image: '/images/blog/maintenance.jpg',
    author: 'Emily Davis',
  },
];

const categories = ['All', 'Technology', 'Sustainability', 'Agriculture', 'Maintenance'];

const Blog = () => {
  return (
    <div>
      <Hero 
        title="Blog"
        subtitle="Stay updated with the latest news and insights from Interpipe"
        image="/images/hero/blog-hero.jpg"
      />
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium whitespace-nowrap hover:border-sky-500 hover:text-sky-500 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Replace with actual image */}
                  <div className="w-full h-48 bg-sky-100 flex items-center justify-center">
                    <span className="text-sky-500">Blog Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="mr-1" size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1" size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="text-sky-500" size={16} />
                      <span className="text-sm text-gray-500">{post.category}</span>
                    </div>
                    <span className="text-sm text-gray-500">By {post.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest insights and updates in the irrigation industry.
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <button className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 