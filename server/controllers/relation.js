import Relation from "../models/relation.js";
import Person from "../models/person.js";
import Tag from "../models/tag.js";

export const getRelations = async (req, res) => {
  try {
    const relation = await Relation.find();
    const person = await Person.find();
    const tag = await Tag.find();
    var data = [];
    var key = 0;
    relation.forEach((element) => {
      person.forEach((fperson) => {
        if (String(element.fperson) == String(fperson._id)) {
          person.forEach((sperson) => {
            if (String(element.sperson) == String(sperson._id)) {
            tag.forEach((tag) => {
              if (String(element.relation) == String(tag._id)) {
                key++;
                data.push({
                  "_id": element._id,
                  "fperson": fperson.name,
                  "sperson": sperson.name,
                  "relation": tag.tag,
                  "key": key
                });
              }
            });
          }
          });
        }
      });
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRelation = async (req, res) => {
  const relation = req.body;
  const newRelation = new Relation(relation);
  try {
    await newRelation.save();
    const relations = await Relation.find();
    const person = await Person.find();
    const tag = await Tag.find();
    var data = [];
    var key = 0;
    relations.forEach((element) => {
      person.forEach((fperson) => {
        if (String(element.fperson) == String(fperson._id)) {
          person.forEach((sperson) => {
            if (String(element.sperson) == String(sperson._id)) {
            tag.forEach((tag) => {
              if (String(element.relation) == String(tag._id)) {
                key++;
                data.push({
                  "_id": element._id,
                  "fperson": fperson.name,
                  "sperson": sperson.name,
                  "relation": tag.tag,
                  "key": key
                });
              }
            });
          }
          });
        }
      });
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const checkRelations = async (req, res) => {
  try {
    const relation = await Relation.find();
    const p = await Person.find();
    const person = req.body;
    var relationdata = [];
    var sidedata = [];
    var output = [];
    var fperson = person.sperson;
    var sperson = person.fperson;
    sidedata.push(sperson);
    var sideChecker = (p) => {
      relation.forEach((p1) => {
        var f1 = p1.fperson;
        var s1 = p1.sperson;
        if (
          (p == String(f1) || p == String(s1)) &&
          !(String(f1) == sperson || String(s1) == sperson)
        ) {
          if (String(p1.fperson) == fperson && !sidedata.includes(fperson)) {
            if (!sidedata.includes(fperson)) {
              sidedata.push(fperson);
            }
            relationdata.push(sidedata);
            return;
          }
          if (String(p1.sperson) == fperson && !sidedata.includes(fperson)) {
            // console.log("found fperson in s side loop");
            if (!sidedata.includes(fperson)) {
              sidedata.push(fperson);
            }
            relationdata.push(sidedata);
            // console.log(relationdata);
            return;
          }
          if (String(p) == String(p1.fperson) && !sidedata.includes(fperson)) {
            if (!sidedata.includes(String(p1.sperson))) {
              sidedata.push(String(p1.sperson));
              // console.log(sidedata);
              sideChecker(String(p1.sperson));
            }
          } else if (
            String(p) == String(p1.sperson) &&
            !sidedata.includes(fperson)
          ) {
            if (!sidedata.includes(String(p1.fperson))) {
              sidedata.push(String(p1.fperson));
              // console.log(sidedata);
              sideChecker(String(p1.fperson));
            }
          }
        }
      });
    };

    const setOutput = () => {
      relationdata.forEach((element) => {
        var data = "";
        element.forEach((e) => {
          p.forEach((per) => {
            if (String(per._id) == String(e)) {
              if (data == "") {
                data = per.name;
              } else {
                data = data + " > " + per.name;
              }
            }
          });
        });
        output.push(data);
        console.log(output);
      });
    };

    relation.forEach((element) => {
      var f = element.fperson;
      var s = element.sperson;
      if (sperson == String(f) || sperson == String(s)) {
        if (String(s) == fperson && !sidedata.includes(fperson)) {
          if (!sidedata.includes(fperson)) {
            sidedata.push(fperson);
          }
          relationdata.push(sidedata);
          return;
          
        } else if (String(f) == fperson && !sidedata.includes(fperson)) {
          if (!sidedata.includes(fperson)) {
            sidedata.push(fperson);
          }
          relationdata.push(sidedata);
          return;
          
        }

        if (sperson == String(f)  && !sidedata.includes(fperson)) {
          if (!sidedata.includes(String(s))) {
            sidedata.push(String(s));
            // console.log(sidedata);
            sideChecker(String(s));
            sidedata = [];
            sidedata.push(sperson);
            // console.log("Reset");
          }
        } else if (sperson == String(s)  && !sidedata.includes(fperson)) {
          if (!sidedata.includes(String(f))) {
            sidedata.push(String(f));
            // console.log(sidedata);
            sideChecker(String(f));
            sidedata = [];
            sidedata.push(sperson);
            // console.log("Reset");
          }
        }
      }
    });
    relationdata.sort((a, b) => {
      if (a.length < b.length) {
        return -1;
      } else {
        return 1;
      }
    });
    // console.log(relationdata);
    setOutput();
    res.status(200).json(output);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
