import Person from '../models/person.js'


export const getPersons = async (req,res)=>{
    try{
        const person = await Person.find();
        var data = [];
        var key = 0;
        person.forEach(element => {
            key++;
            data.push({
                "_id": element._id,
                "name": element.name,
                "key": key
              });
        });
        console.log(data)
        res.status(200).json(data)
    }catch(error){
        res.status(404).json({ message: error.message})
    }
} 


export const createPerson = async (req,res)=>{
    const person = req.body;
    const newPerson = new Person(person);
    try{
        await newPerson.save();
        const persons = await Person.find();
        var data = [];
        var key = 0;
        persons.forEach(element => {
            key++;
            data.push({
                "_id": element._id,
                "name": element.name,
                "key": key
              });
        });
        res.status(200).json(data)
    } catch(error){
        res.status(409).json({ message: error.message})
    }
}