import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const relationSchema = new Schema({
    fperson:{
        type: Schema.Types.ObjectId, ref: 'persons',
        required: true,
    },
    sperson:{
        type: Schema.Types.ObjectId, ref: 'persons',
        required: true,
    },
    relation:{
        type: Schema.Types.ObjectId, ref: 'tags',
        required: true,
    }
});

const Relation = mongoose.model('Relation',relationSchema);

export default Relation;