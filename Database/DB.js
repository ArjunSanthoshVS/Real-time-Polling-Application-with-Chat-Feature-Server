const mongoose = require('mongoose');

module.exports = () => {
    try {
        mongoose.connect("mongodb+srv://arjunsanthosh738:bwixcQJ8xMR5ELdI@cluster0.e5p405v.mongodb.net/Scintillate")
        console.log("Connected Successfully...!")
    } catch (error) {
        console.log("Not Connected...!")
    }
}

