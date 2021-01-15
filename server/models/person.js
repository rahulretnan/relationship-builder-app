import mongoose from 'mongoose';


const personSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    }
});

const Person = mongoose.model('Persons',personSchema);

export default Person;