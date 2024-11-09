const express = require('express');
const router = express.Router();
const {
    submitProposal,
    getProposalsByJob,
    getProposalsByFreelancer,
    updateProposalStatus,
    getProposalsByClientId,
    upload,
    countProposals
  }
   = require('../controllers/proposalController');
const protect = require('../middleware/authMiddleware');

// Route to submit a new proposal
router.post('/', upload.single('attachments') ,submitProposal);

// Route to get all proposals for a specific job
router.get('/:jobId', getProposalsByJob);

// Route to get all proposals by a freelancer
router.get('/freelancer/:freelancerId', getProposalsByFreelancer);

// Route to update the status of a proposal (accept/reject)
router.put('/:proposalId', updateProposalStatus);

// Route to fetch all proposals for all jobs posted by a specific client
router.get('/client/:clientId', getProposalsByClientId);

router.get('/count', countProposals); // Route for counting proposals

module.exports = router;
