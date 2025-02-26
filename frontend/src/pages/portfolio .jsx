import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Portfolio = () => {
  const { isLoggedIn } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const userId = localStorage.getItem("authtoken");
        if (!userId) {
          setError("User ID not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/user-portfolio/get-portfolio/${userId}`);
        console.log(response.data);
        setPortfolio(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch portfolio");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchPortfolio();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      {portfolio ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src={portfolio.cover_image || "default-cover.jpg"}
              alt="Cover"
              className="w-full h-60 object-cover"
            />
            <img
              src={portfolio.profile_picture || "default-profile.jpg"}
              alt="Profile"
              className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 w-24 h-24 object-cover rounded-full border-4 border-white"
            />
          </div>
          <div className="text-center mt-12 p-4">
            <h2 className="text-3xl font-bold">{portfolio.title}</h2>
            <p className="text-gray-600">{portfolio.tagline}</p>
            <p className="mt-2 text-gray-700">{portfolio.description}</p>
            {portfolio.resume && (
              <a
                href={portfolio.resume}
                download
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
              >
                Download Resume
              </a>
            )}
          </div>
          <div className="p-4">
            {portfolio.skills?.length > 0 && (
              <>
                <h3 className="text-2xl font-bold">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {portfolio.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}
            {portfolio.experience.length === 1 && 
            portfolio.experience[0].role === "" &&
            portfolio.experience[0].company === "" &&
            portfolio.experience[0].start_date === "" &&
            portfolio.experience[0].end_date === "" &&
            portfolio.experience[0].description === "" ? (
              <>
                <h3 className="text-2xl font-bold mt-6">Experience</h3>
                <p className="text-gray-500 text-lg mt-4">No Prior Experience Available</p>
              </>
              
            ) : (
              <>
                <h3 className="text-2xl font-bold mt-6">Experience</h3>
                <div className="mt-2 space-y-3">
                  {portfolio.experience.map((exp, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
                      <h4 className="font-bold text-xl text-gray-800">
                        Role: {exp.role || "N/A"}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        <span className="font-semibold">Company:</span> {exp.company || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Duration:</span> {exp.start_date || "N/A"} to {exp.end_date || "N/A"}
                      </p>
                      <p className="text-gray-700 mt-2">{exp.description || "N/A"}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

           {portfolio.projects?.length > 0 && 
                !(portfolio.projects.length === 1 && Object.values(portfolio.projects[0]).every(value => value === "")) ? (
                  <>
                    <h3 className="text-2xl font-bold mt-6">Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {portfolio.projects.map((project, index) => (
                      <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
                        <h4 className="font-bold text-xl text-gray-800">
                          Title: {project.title || "N/A"}
                        </h4>
                        <p className="text-gray-600 mt-1">
                          <span className="font-semibold">Tech Stack:</span> {project.tech_stack || "N/A"}
                        </p>
                        <p className="text-gray-700 mt-2">{project.description || "N/A"}</p>
                        <div className="mt-3">
                          {project.live_demo ? (
                            <a href={project.live_demo} className="text-blue-600 font-medium hover:underline">
                              Live Demo
                            </a>
                          ) : (
                            <span className="text-gray-500">Live Demo: N/A</span>
                          )}
                          <br />
                          {project.github_link ? (
                            <a href={project.github_link} className="text-blue-600 font-medium hover:underline">
                              GitHub Link
                            </a>
                          ) : (
                            <span className="text-gray-500">GitHub Link: N/A</span>
                          )}
                        </div>
                      </div>
                    ))}
                    </div>
                  </>
                ) : (
                  <>
                  <h3 className="text-2xl font-bold mt-6">Projects</h3>
                  <p className="text-gray-500 mt-6">No project is available</p>
                  </>
                )
              }

            {portfolio.education.length === 1 &&
            portfolio.education[0].degree === "" &&
            portfolio.education[0].institution === "" &&
            portfolio.education[0].start_year === "" &&
            portfolio.education[0].end_year === "" ? (
              <>
               <h3 className="text-2xl font-bold mt-6">Education</h3>
              <p className="text-gray-500 text-lg mt-4">No Education Details Available</p>
              </>
              
            ) : (
              <>
                <h3 className="text-2xl font-bold mt-6">Education</h3>
                <div className="mt-2 space-y-3">
                  {portfolio.education.map((edu, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
                      <h4 className="font-bold text-xl text-gray-800">
                        Degree: {edu.degree || "N/A"}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        <span className="font-semibold">Institution:</span> {edu.institution || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Duration:</span> {edu.start_year || "N/A"} to {edu.end_year || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {portfolio.certifications.length === 1 &&
            portfolio.certifications[0].name === "" &&
            portfolio.certifications[0].organization === "" &&
            portfolio.certifications[0].year === "" ? (
              <>
              <h3 className="text-2xl font-bold mt-6">Certifications</h3>
              <p className="text-gray-500 text-lg mt-4">No Certifications Available</p>
              </>
              
            ) : (
              <>
                <h3 className="text-2xl font-bold mt-6">Certifications</h3>
                <div className="mt-2 space-y-3">
                  {portfolio.certifications.map((cert, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-lg bg-white">
                      <h4 className="font-bold text-xl text-gray-800">
                        Certification: {cert.name || "N/A"}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        <span className="font-semibold">Organization:</span> {cert.organization || "N/A"}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Year:</span> {cert.year || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {portfolio.social_links &&
            Object.keys(portfolio.social_links).length > 0 &&
            Object.values(portfolio.social_links).some((link) => link) ? (
              <div>
                <h3 className="text-2xl font-bold mt-6">Social Links</h3>
                <div className="flex gap-4 mt-2">
                  {Object.entries(portfolio.social_links).map(([platform, link]) =>
                    link ? (
                      <a
                        key={platform}
                        href={link}
                        className="text-blue-600 font-semibold hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </a>
                    ) : null
                  )}
                </div>
              </div>
            ) : (
              <>
               <h3 className="text-2xl font-bold mt-6">Social Links</h3>
              <p className="text-gray-500 text-lg mt-4">No Social Links Available</p>
              </>
              
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-6">
          {error ? <p className="text-red-500">{error}</p> : <p className="text-lg text-gray-600">You don't have a portfolio yet.</p>}
          <Link to="/create-portfolio">
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              Create Your Portfolio Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
