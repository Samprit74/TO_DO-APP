const mongoose =require('mongoose');
const dataSchema = new mongoose.Schema(
    {
        title:{
            type: String ,
            require : true
        },
        status:{
            type:Boolean,
            default:false
        }

    }
);


const data =mongoose.model('data',dataSchema);
module.exports = data;

