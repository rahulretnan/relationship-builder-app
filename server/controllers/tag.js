
import Tag from '../models/tag.js'


export const getTags = async (req,res)=>{
    try{
        const tag = await Tag.find();
        var data = [];
        var key = 0;
        tag.forEach(element => {
            key++;
            data.push({
                "_id": element._id,
                "tag": element.tag,
                "key": key
              });
        });
        console.log(data)
        res.status(200).json(data)
    }catch(error){
        res.status(404).json({ message: error.message})
    }
} 


export const createTag = async (req,res)=>{
    const tag = req.body;
    const newTag = new Tag(tag);
    try{
        await newTag.save();
        const tags = await Tag.find();
        var data = [];
        var key = 0;
        tags.forEach(element => {
            key++;
            data.push({
                "_id": element._id,
                "tag": element.tag,
                "key": key
              });
        });
        console.log(data)
        res.status(200).json(data)
    } catch(error){
        res.status(409).json({ message: error.message})
    }
}
export const updateTag = async (req,res)=>{
    const { id: _id } = req.params;
    const tag = req.body;
    try{
        const updatedTag = await Tag.findByIdAndUpdate(_id, tag, {new : true})
        const tags = await Tag.find();
        var data = [];
        var key = 0;
        tags.forEach(element => {   
            key++;
            data.push({
                "_id": element._id,
                "tag": element.tag,
                "key": key
              });
        });
        console.log(data)
        res.status(200).json(data)
    } catch(error){
        res.status(409).json({ message: error.message})
    }
}