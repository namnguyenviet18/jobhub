const { query } = require('express');
const Job = require('../models/Job');

module.exports = {
    createJob: async (req, res) => {
        const newJob = new Job(req.body);

        try {
            const savedJob = await newJob.save();
            const { __v, createdAt, updatedAt, ...newJobInfo } = newJob._doc;
            res.status(201).json(newJobInfo);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    updateJob: async (req, res) => {
        try {

            const job = await Job.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            const { __v, createdAt, updatedAt, ...updatedJob } = job._doc;
            res.status(200).json({ updatedJob });

        } catch (err) {
            res.status(500).json(err.message);

        }
    },

    deleteJob: async (req, res) => {

        try {
            await Job.findByIdAndDelete(req.params.id);
            res.status(200).json("This job successfully deleted");
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    getJob: async (req, res) => {
        try {
            const job = await Job.findById(req.params.id);
            const { __v, createdAt, updatedAt, ...jobInfo } = job._doc;
            res.status(200).json(jobInfo);
        } catch (err) {
            res.status(500).json(err.message);

        }
    },

    getAllJob: async (req, res) => {
        try {
            const jobs = await Job.find();
            res.status(200).json(jobs);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    searchJob: async (req, res) => {
        try {
            const results = await Job.aggregate(
                [
                    {
                        $search: {
                            index: "jobsearch",
                            text: {
                                query: req.params.keyword,
                                path: {
                                    wildcard: "*"
                                }
                            }

                        }
                    }
                ]
            );

            res.status(200).json(results);
        } catch (err) {
            res.status(500).json(err.message);

        }
    }

}
