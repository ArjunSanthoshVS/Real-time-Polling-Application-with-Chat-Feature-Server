const Vote = require("../models/voteSchema");

module.exports = {
    getAllVotes: async (req, res) => {
        try {
            const votes = await Vote.find({});
            res.json(votes);
        } catch (error) {
            res.status(500).json({ error: 'Unable to fetch votes' });
        }
    },


    vote: async (req, res) => {
        const { lang, userId } = req.body;

        try {
            const userVotes = await Vote.find({ user: userId });
            const totalVotesByUser = userVotes.reduce((total, vote) => total + vote.count, 0);
            const maxVotesPerUser = 5;
            if (totalVotesByUser >= maxVotesPerUser) {
                return res.status(400).json({ message: "Maximum vote limit reached for the user." });
            }
            let vote = await Vote.findOne({ user: userId, option: lang });

            if (!vote) {
                vote = new Vote({ user: userId, option: lang, count: 1 });
            } else {
                vote.count += 1;
            }

            await vote.save();
            return res.status(200).json({ message: 'Vote recorded successfully.' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to record the vote.' });
        }
    }
}