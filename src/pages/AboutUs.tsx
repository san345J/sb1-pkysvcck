export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      <section className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-500">
          Welcome to CreativeConnect
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          We are the platform where digital creators and clients meet. A place
          where innovation thrives, collaboration is endless, and ideas come to
          life.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary-400">For Creators</h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Showcase your skills and connect with clients looking for digital solutions. Get noticed, get hired, and grow your portfolio.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-primary-400">For Clients</h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Find the perfect digital creator to bring your ideas to life. From design to development, we help you find the right talent for your projects.
            </p>
          </div>
        </div>
      </section>
    
    </div>
  );
};
