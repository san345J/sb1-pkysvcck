import { ArrowRight, Palette, Code, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Connect with Top
            <span className="text-primary-500"> Digital Creators</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Find the perfect creative professional for your project. Connect with talented designers, developers, and content creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-primary-500 text-white rounded-md hover:bg-primary-600 flex items-center justify-center gap-2"
            >
              Find Creators <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 border-2 border-primary-500 text-primary-500 dark:text-primary-400 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900"
            >
              Become a Creator
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Connect with Amazing Talent
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Designers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find talented designers for your brand, website, or product designs.
              </p>
            </div>
           
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Content Creators</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Discover content creators to help grow your brand presence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};