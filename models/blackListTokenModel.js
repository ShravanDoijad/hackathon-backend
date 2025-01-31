const mongoose =  require("mongoose");
const Schema = mongoose.Schema;

const blackListTokenSchema = new Schema({
    token:{
        type: String,
        required: true,
        unique: true,
    },
    expriesAt: {
        type: Date,
        default: Date.now,
        index: {expires: '24h'}
    }
})

module.exports = mongoose.model("BlackListToken", blackListTokenSchema)