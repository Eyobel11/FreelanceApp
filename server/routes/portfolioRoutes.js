const express = require('express');
const { addPortfolioProject, getPortfolio, deletePortfolioProject } = require('../controllers/portfolioController');
const router = express.Router();

router.post('/', addPortfolioProject);
router.get('/:freelancerId', getPortfolio);
router.delete('/:projectId', deletePortfolioProject);

module.exports = router;
