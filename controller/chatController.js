const { Chat } = require("../models/chatSchema")
const User = require("../models/userSchema")


module.exports = {

    allContacts: async (req, res, next) => {
        try {
            const contacts = await User.find({ _id: { $ne: req.query.id } }).select([
                "email", "name"
            ])
            return res.json(contacts)
        } catch (error) {
            next(error)
        }
    },

    addMessage: async (req, res, next) => {
        try {
            const { from, to, message } = req.body
            const data = await Chat.create({
                message: { text: message },
                users: [from, to],
                sender: from,
            })
            if (data) return res.json({ msg: "Message added successfully." })
            return res.json({ msg: "Failed to add message." })
        } catch (error) {
            next(error)
        }
    },
    getAllMessage: async (req, res, next) => {
        try {
            const { from, to } = req.query;
            const messages = await Chat.find({ users: { $all: [from, to] } }).sort({ updatedAt: 1 });
            const projectedMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                };
            });
            res.json(projectedMessages);
        } catch (error) {
            next(error);
        }
    },
}