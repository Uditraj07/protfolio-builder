const Home = () => {
    return (
      <>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white py-24 px-6 text-center">
          <h1 className="text-5xl font-extrabold leading-tight">
            AI-Powered Script Generation
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Create professional content in seconds using AI-driven technology.
          </p>
          <div className="mt-6 space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-white font-semibold rounded-lg transition">
              Try for Free
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 text-white font-semibold rounded-lg transition">
              Watch Demo
            </button>
          </div>
        </div>
  
        {/* Features Section */}
        <section className="py-20 px-6 bg-gray-900 text-white text-center">
          <h2 className="text-4xl font-bold">Why Choose Our AI?</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold">AI-Powered Content</h3>
              <p className="mt-2 text-gray-400">
                Generate scripts, blogs, and marketing copies effortlessly.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold">Seamless Integration</h3>
              <p className="mt-2 text-gray-400">
                Connect with ChatGPT/Gemini APIs for intelligent responses.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold">Customizable & Fast</h3>
              <p className="mt-2 text-gray-400">
                Tailor content output based on your needs in real time.
              </p>
            </div>
          </div>
        </section>
  
        {/* How It Works */}
        <section className="py-20 px-6 bg-gray-800 text-white text-center">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold">Step 1: Sign Up</h3>
              <p className="mt-2 text-gray-400">
                Create your account to access AI-powered tools.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold">Step 2: Generate Scripts</h3>
              <p className="mt-2 text-gray-400">
                Enter your ideas and let AI generate high-quality content.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold">Step 3: Export & Share</h3>
              <p className="mt-2 text-gray-400">
                Download and share your AI-generated content instantly.
              </p>
            </div>
          </div>
        </section>
  
        {/* Pricing Section */}
        <section className="py-20 px-6 bg-gray-900 text-white text-center">
          <h2 className="text-4xl font-bold">Pricing Plans</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-semibold">Free Plan</h3>
              <p className="text-gray-400">Basic features with limited usage.</p>
              <button className="mt-4 bg-blue-500 px-6 py-2 text-white font-semibold rounded-lg">
                Get Started
              </button>
            </div>
            <div className="p-6 bg-blue-600 rounded-lg">
              <h3 className="text-2xl font-semibold">Pro Plan</h3>
              <p className="text-white">Advanced AI tools for professionals.</p>
              <button className="mt-4 bg-white text-blue-600 px-6 py-2 font-semibold rounded-lg">
                Choose Plan
              </button>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-semibold">Enterprise</h3>
              <p className="text-gray-400">Custom AI solutions for businesses.</p>
              <button className="mt-4 bg-blue-500 px-6 py-2 text-white font-semibold rounded-lg">
                Contact Us
              </button>
            </div>
          </div>
        </section>
  
        {/* Testimonials */}
        <section className="py-20 px-6 bg-gray-800 text-white">
          <h2 className="text-4xl font-bold text-center">What Our Users Say</h2>
          <div className="mt-8 flex justify-center">
            <blockquote className="bg-gray-900 p-6 shadow-lg rounded-lg max-w-lg text-center">
              <p className="text-lg italic text-gray-300">
                "This AI tool has transformed the way I create content! Highly recommended!"
              </p>
              <footer className="mt-4 font-semibold">– Alex Johnson</footer>
            </blockquote>
          </div>
        </section>
  
        {/* Call to Action */}
        <div className="bg-blue-600 text-white py-16 text-center px-6">
          <h2 className="text-3xl font-bold">Start Creating with AI Today!</h2>
          <p className="mt-2 text-lg">Sign up now to experience AI-powered script generation.</p>
          <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
            Get Started
          </button>
        </div>
      </>
    );
  };
  
  export default Home;
  