const Proposal = require('../models/Proposals');
const JobPost = require('../models/JobPost');
const Notification = require('../models/Notification'); // Import Notification model

const multer = require('multer');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this is the correct folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const submitProposal = async (req, res) => {
  try {
    const { freelancerId, jobId, coverLetter, proposedRate, estimatedTime } = req.body;

    const job = await JobPost.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const newProposal = new Proposal({
      freelancerId,
      jobId,
      title: job.title,
      clientId: job.user,
      coverLetter,
      proposedRate,
      estimatedTime,
    });

    if (req.file) {
      newProposal.attachments = req.file.path;
    }

    const savedProposal = await newProposal.save();

    // Notify the client about the new proposal
    const notification = new Notification({
      userId: job.user,
      type: 'Proposal',
      message: `You received a new proposal for your job post "${job.title}"`,
      readStatus: false,
      link:`/client/proposals`
    });
    await notification.save();

    res.status(201).json(savedProposal);
  } catch (error) {
    console.error('Error submitting proposal:', error.message);
    return res.status(500).json({ message: 'Error submitting proposal' });
  }
};



// Get all proposals for a specific job
const getProposalsByJob = async (req, res) => {
  try {
    const proposals = await Proposal.find({ jobId: req.params.jobId }).populate('freelancerId', 'fullName email');
    res.status(200).json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error.message);
    res.status(500).json({ message: 'Error fetching proposals' });
  }
};

const getProposalsByClientId = async (req, res) => {
  try {
    const { clientId } = req.params;
    const jobs = await JobPost.find({ user: clientId });

    if (!jobs.length) {
      return res.status(404).json({ message: 'No jobs found for this client.' });
    }

    const proposals = await Proposal.find({
      jobId: { $in: jobs.map(job => job._id) },
    }).populate([
      { path: 'freelancerId', model: 'User', select: 'name email' },
      { path: 'jobId', select: 'title' } // Populate jobId to include title
    ]);

    if (!proposals.length) {
      return res.status(404).json({ message: 'No proposals found for any of the client\'s jobs.' });
    }

    res.status(200).json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error.message);
    res.status(500).json({ message: 'Error fetching proposals.' });
  }
};


// Get all proposals submitted by a freelancer

const getProposalsByFreelancer = async (req, res) => {
  try {
    const { freelancerId } = req.params;

    const proposals = await Proposal.find({ freelancerId }).populate([
      { path: 'jobId', select: 'title' } // Populate jobId to include title
    ]);

    if (!proposals || proposals.length === 0) {
      return res.status(404).json({ message: 'No proposals found for this freelancer.' });
    }

    res.status(200).json(proposals);
  } catch (error) {
    console.error('Error fetching proposals:', error.message);
    res.status(500).json({ message: 'Error fetching proposals' });
  }
};

// Update proposal status by the client
// PUT /proposals/:proposalId/status
const updateProposalStatus = async (req, res) => {
  const { proposalId } = req.params;
  const { status } = req.body;

  try {
    const updatedProposal = await Proposal.findByIdAndUpdate(
      proposalId,
      { status },
      { new: true }
    );
    if (!updatedProposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }
    res.status(200).json(updatedProposal);
  } catch (error) {
    console.error('Error updating proposal status:', error);
    res.status(500).json({ message: 'Error updating proposal status' });
  }
};

// Count all proposals
const countProposals = async (req, res) => {
  try {
    const proposalCount = await Proposal.countDocuments();
    res.status(200).json({ count: proposalCount });
  } catch (error) {
    console.error('Error counting proposals:', error.message);
    res.status(500).json({ message: 'Error counting proposals' });
  }
};


module.exports = {
  submitProposal,
  getProposalsByJob,
  getProposalsByFreelancer,
  updateProposalStatus,
  getProposalsByClientId,
  countProposals, // <-- New export for counting proposals
  upload
};
