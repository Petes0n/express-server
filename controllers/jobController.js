import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      salary,
      budget,
      posted,
      postedDate,
      date,
      genre,
      category,
      experience,
      description,
      urgent
    } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        type,
        salary,
        budget,
        posted,
        postedDate,
        date,
        genre,
        category,
        experience,
        description,
        urgent: urgent || false
      }
    });

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create job',
      error: error.message
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: {
        id: id
      }
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch job',
      error: error.message
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      company,
      location,
      type,
      salary,
      budget,
      posted,
      postedDate,
      date,
      genre,
      category,
      experience,
      description,
      urgent
    } = req.body;

    const job = await prisma.job.update({
      where: {
        id: id
      },
      data: {
        title,
        company,
        location,
        type,
        salary,
        budget,
        posted,
        postedDate,
        date,
        genre,
        category,
        experience,
        description,
        urgent
      }
    });

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    console.error('Error updating job:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update job',
      error: error.message
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.job.delete({
      where: {
        id: id
      }
    });

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: error.message
    });
  }
};
