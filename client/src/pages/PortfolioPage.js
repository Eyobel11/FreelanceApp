import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useParams } from 'react-router-dom';

const PortfolioPage = () => {
  const { freelancerId } = useParams(); // Extract freelancerId from URL params
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', link: '', images: [] });

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await axios.get(`/portfolio/${freelancerId}`);
      setProjects(data);
    };
    fetchPortfolio();
  }, [freelancerId]);

  const handleAddProject = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/portfolio', {
        title: newProject.title,           // Use state for the title
        description: newProject.description, // Use state for the description
        link: newProject.link,             // Use state for the link (optional)
        freelancer: freelancerId,          // Use freelancerId from URL params
      });
  
      // Add the new project to the existing list
      setProjects([...projects, response.data]);
      console.log(response.data);  // Check the response in the console
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`/portfolio/${projectId}`);
      // Update the state to remove the deleted project
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Portfolio</h2>
      <form onSubmit={handleAddProject} className="space-y-4">
        <input
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          placeholder="Project Title"
          className="w-full p-2 border rounded-md"
        />
        <textarea
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          placeholder="Project Description"
          className="w-full p-2 border rounded-md"
        />
        <input
          value={newProject.link}
          onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
          placeholder="Project Link"
          className="w-full p-2 border rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Add Project
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-gray-100 p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {project.link}
            </a>
            <button
              onClick={() => handleDeleteProject(project._id)}
              className="bg-red-500 text-white p-2 rounded-md mt-2"
            >
              Delete Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
