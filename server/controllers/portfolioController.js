const Portfolio = require('../models/Portfolio'); // Ensure Portfolio model exists

// Add new portfolio project
const addPortfolioProject = async (req, res) => {
  const { title, description, link, freelancer } = req.body;

  if (!title || !description || !freelancer || !link) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newProject = new Portfolio({
      title,
      description,
      link,
      freelancer
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error adding portfolio project:", error.message); // Log the error
    res.status(500).json({ message: 'Error adding portfolio project' });
  }
};
// Get portfolio by freelancer ID
const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ freelancer: req.params.freelancerId });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
};

const deletePortfolioProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    // Find the project by ID and delete it
    const deletedProject = await Portfolio.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio project:', error.message);
    res.status(500).json({ message: 'Error deleting portfolio project' });
  }
};

module.exports = {
  addPortfolioProject,
  getPortfolio,
  deletePortfolioProject
};
