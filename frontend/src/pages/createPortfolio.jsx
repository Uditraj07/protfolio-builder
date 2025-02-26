import axios from "axios";
import { useState } from "react";

export default function PortfolioForm() {
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    description: "",
    profile_picture: null,
    cover_image: null,
    skills: "",
    experience: [{ role: "", company: "", start_date: "", end_date: "", description: "" }],
    projects: [{ title: "", live_demo: "", tech_stack: "", description: "", github_link: "" }],
    education: [{ degree: "", start_year: "", end_year: "", institution: "" }],
    certifications: [{ name: "", year: "", organization: "" }],
    awards: [{ name: "", year: "" }],
    contact_email: "",
    phone: "",
    website: "",
    resume: null,
    availability:"",
    social_links: { github: "", twitter: "", linkedin: "" },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleArrayChange = (index, field, value, arrayName) => {
    const newArray = [...formData[arrayName]];
    newArray[index][field] = value;
    setFormData({ ...formData, [arrayName]: newArray });
  };

  const addField = (arrayName, emptyObject) => {
    setFormData({ ...formData, [arrayName]: [...formData[arrayName], emptyObject] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    // Retrieve the auth token from localStorage
    const token = localStorage.getItem("authtoken"); 
  
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user-portfolio/create-portfolio/", // Corrected API URL
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`, // Attach Authorization token
          },
        }
      );
  
      alert("Portfolio created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting portfolio:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        social_links: {
            ...prev.social_links,
            [name]: value
        }
    }));
};


  return (
    <div className="max-w-3xl mx-auto p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Portfolio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="tagline" placeholder="Tagline" value={formData.tagline} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />

        <label className="block">Profile Picture:
          <input type="file" name="profile_picture" onChange={handleFileChange} className="w-full p-2 border rounded" required />
        </label>
        
        <label className="block">Cover Image:
          <input type="file" name="cover_image" onChange={handleFileChange} className="w-full p-2 border rounded" required />
        </label>

        <div>
          <h3 className="text-lg font-semibold">Skills</h3>
          <input type="text" name="skills" placeholder="Enter skills, separated by commas" value={formData.skills} onChange={handleChange} className="w-full p-2 border rounded mt-2" required />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="space-y-2 border p-2 rounded">
              <input type="text" placeholder="Role" value={exp.role} onChange={(e) => handleArrayChange(index, "role", e.target.value, "experience")} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleArrayChange(index, "company", e.target.value, "experience")} className="w-full p-2 border rounded" />
              <input type="date" placeholder="Start Date" value={exp.start_date} onChange={(e) => handleArrayChange(index, "start_date", e.target.value, "experience")} className="w-full p-2 border rounded" />
              <input type="date" placeholder="End Date" value={exp.end_date} onChange={(e) => handleArrayChange(index, "end_date", e.target.value, "experience")} className="w-full p-2 border rounded" />
              <textarea placeholder="Description" value={exp.description} onChange={(e) => handleArrayChange(index, "description", e.target.value, "experience")} className="w-full p-2 border rounded" />
            </div>
          ))}
          <button type="button" onClick={() => addField("experience", { role: "", company: "", start_date: "", end_date: "", description: "" })} className="text-blue-500">Add Experience</button>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Projects</h3>
          {formData.projects.map((project, index) => (
            <div key={index} className="space-y-2 border p-2 rounded">
              <input type="text" placeholder="Project Title" value={project.title} onChange={(e) => handleArrayChange(index, "title", e.target.value, "projects")} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Live Demo URL" value={project.live_demo} onChange={(e) => handleArrayChange(index, "live_demo", e.target.value, "projects")} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Tech Stack (comma-separated)" value={project.tech_stack} onChange={(e) => handleArrayChange(index, "tech_stack", e.target.value, "projects")} className="w-full p-2 border rounded" />
              <textarea placeholder="Description" value={project.description} onChange={(e) => handleArrayChange(index, "description", e.target.value, "projects")} className="w-full p-2 border rounded" />
              <input type="text" placeholder="GitHub Link" value={project.github_link} onChange={(e) => handleArrayChange(index, "github_link", e.target.value, "projects")} className="w-full p-2 border rounded" />
            </div>
          ))}
          <button type="button" onClick={() => addField("projects", { title: "", live_demo: "", tech_stack: "", description: "", github_link: "" })} className="text-blue-500">Add Project</button>
        </div>
        <div>
        <h3 className="text-lg font-semibold">Education</h3>
            {formData.education.map((edu, index) => (
                <div key={index} className="space-y-2 border p-2 rounded">
                <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange(index, "degree", e.target.value, "education")} className="w-full p-2 border rounded" />
                <input type="text" placeholder="Institution/University" value={edu.institution} onChange={(e) => handleArrayChange(index, "institution", e.target.value, "education")} className="w-full p-2 border rounded" />
                <input type="date" placeholder="Start Date" value={edu.start_date} onChange={(e) => handleArrayChange(index, "start_date", e.target.value, "education")} className="w-full p-2 border rounded" />
                <input type="date" placeholder="End Date" value={edu.end_date} onChange={(e) => handleArrayChange(index, "end_date", e.target.value, "education")} className="w-full p-2 border rounded" />
                <textarea placeholder="Description (Optional)" value={edu.description} onChange={(e) => handleArrayChange(index, "description", e.target.value, "education")} className="w-full p-2 border rounded" />
                </div>
            ))}
            <button type="button" onClick={() => addField("education", { degree: "", institution: "", start_date: "", end_date: "", description: "" })} className="text-blue-500">
                Add Education
            </button>
        </div>
        <div>
            <h3 className="text-lg font-semibold">Certifications</h3>
            {formData.certifications.map((cert, index) => (
                <div key={index} className="space-y-2 border p-2 rounded">
                <input type="text" placeholder="Certification Name" value={cert.name} onChange={(e) => handleArrayChange(index, "name", e.target.value, "certifications")} className="w-full p-2 border rounded" />
                <input type="text" placeholder="Issuing Organization" value={cert.organization} onChange={(e) => handleArrayChange(index, "organization", e.target.value, "certifications")} className="w-full p-2 border rounded" />
                <input type="number" placeholder="Year" value={cert.year} onChange={(e) => handleArrayChange(index, "year", e.target.value, "certifications")} className="w-full p-2 border rounded" />
                </div>
            ))}
            <button type="button" onClick={() => addField("certifications", { name: "", organization: "", year: "" })} className="text-blue-500">
                Add Certification
            </button>
        </div>

        <div>
            <h3 className="text-lg font-semibold">Awards</h3>
            {formData.awards.map((award, index) => (
                <div key={index} className="space-y-2 border p-2 rounded">
                <input type="text" placeholder="Award Name" value={award.name} onChange={(e) => handleArrayChange(index, "name", e.target.value, "awards")} className="w-full p-2 border rounded" />
                <input type="number" placeholder="Year" value={award.year} onChange={(e) => handleArrayChange(index, "year", e.target.value, "awards")} className="w-full p-2 border rounded" />
                </div>
            ))}
            <button type="button" onClick={() => addField("awards", { name: "", year: "" })} className="text-blue-500">
                Add Award
            </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Availability</h3>
          <input type="text" required name="availability" placeholder="Enter Availability" value={formData.availability} onChange={handleChange} className="w-full p-2 border rounded mt-2" />
        </div>



        <input type="email" required name="contact_email" placeholder="Email" value={formData.contact_email} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" required name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="w-full p-2 border rounded" />

        <label className="block">Resume:
          <input type="file" name="resume" onChange={handleFileChange} className="w-full p-2 border rounded" required />
        </label>
        <div>
        <h3 className="text-lg font-semibold">Social Links</h3>
        <input
            type="text"
            name="github"
            placeholder="GitHub URL"
            value={formData.social_links.github}
            onChange={handleSocialChange}
            className="w-full p-2 border rounded" 
        />
        <input
            type="text"
            name="twitter"
            placeholder="Twitter URL"
            value={formData.social_links.twitter}
            onChange={handleSocialChange}
            className="w-full p-2 border rounded" 
        />
        <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.social_links.linkedin}
            onChange={handleSocialChange}
            className="w-full p-2 border rounded" 
        />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}
