import mongoose from 'mongoose';


const tagSchema = mongoose.Schema({
    tag:{
        type: String,
        required: true,
        unique:true
    }
});

const Tag = mongoose.model('Tag',tagSchema);

export default Tag;