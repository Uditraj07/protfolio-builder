const Home = () => {
    return (
      <>
        <div className="bg-blue-600 text-white py-20 px-2.5  text-center">
            <h1 className="text-4xl font-bold">Build Your Stunning Portfolio Today</h1>
            <p className="mt-2 text-lg">Create a beautiful portfolio to showcase your skills and projects.</p>
            <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg ">
                Get Started
            </button>
        </div>
        <section className="py-16 px-2.5">
            <h2 className="text-3xl font-bold text-center">What We Offer</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                <h3 className="font-bold">Easy Portfolio Creation</h3>
                <p>Create a beautiful portfolio in minutes with our simple and intuitive builder.</p>
                </div>
                <div className="text-center">
                <h3 className="font-bold">Customizable Templates</h3>
                <p>Choose from a variety of professional templates to suit your personal style.</p>
                </div>
                <div className="text-center">
                <h3 className="font-bold">Showcase Your Projects</h3>
                <p>Upload your work and showcase your skills with images, descriptions, and links.</p>
                </div>
            </div>
        </section>
        <section className="py-16 bg-gray-100 px-2.5">
            <h2 className="text-3xl font-bold text-center">Sample Portfolios</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white shadow-lg rounded-lg p-4">
                <img src="portfolio1.jpg" alt="Portfolio 1" className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="mt-4 text-xl font-bold">John Doe - Developer</h3>
                <p className="text-gray-500">A portfolio showcasing web development projects.</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                <img src="portfolio2.jpg" alt="Portfolio 2" className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="mt-4 text-xl font-bold">Jane Smith - Designer</h3>
                <p className="text-gray-500">A portfolio displaying graphic design and branding work.</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                <img src="portfolio3.jpg" alt="Portfolio 3" className="w-full h-48 object-cover rounded-t-lg" />
                <h3 className="mt-4 text-xl font-bold">Chris Lee - Photographer</h3>
                <p className="text-gray-500">A portfolio featuring photography and visual art.</p>
                </div>
            </div>
        </section>
        <section className="py-16 bg-gray-200 px-2.5">
            <h2 className="text-3xl font-bold text-center">What Our Users Say</h2>
            <div className="mt-8 flex justify-center">
                <blockquote className="bg-white p-6 shadow-lg rounded-lg max-w-md">
                <p className="text-lg italic">"This platform made it so easy to build my portfolio and showcase my skills. Highly recommend!"</p>
                <footer className="mt-4 font-semibold">– John Doe</footer>
                </blockquote>
            </div>
        </section>
        <div className="bg-blue-600 text-white py-16 text-center px-2.5">
            <h2 className="text-3xl font-bold">Ready to create your portfolio?</h2>
            <p className="mt-2 text-lg">Sign up now to start building your personalized portfolio.</p>
            <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg">
                Get Started
            </button>
        </div>

      </>
    );
  };
  
  export default Home;
  