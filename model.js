const { sq } = require("./db");
const { DataTypes } = require("sequelize");

const Image = sq.define("Image", {
  title: DataTypes.STRING,
  url: DataTypes.STRING,
},
// {
//   hooks:{
//     beforeValidate:(image,options)=>{
// console.log("yeahhhhhhhhhhhh");
//     },
//     afterValidate:(image,options)=>{
//       image.title="krinal"
//     }
//   }
// }
);
Image.addHook('beforeValidate', 'customerName',(image,Option)=>{
  image.title="new hook"
})
const Video = sq.define("Video", {
  title: DataTypes.STRING,
  text: DataTypes.STRING,
});

// const Comment = sq.define("comment", {
//   title: DataTypes.STRING,
//   commentableId: DataTypes.INTEGER,
//   commentableType: DataTypes.STRING,
// });

const Tag = sq.define("Tag", {
  name: DataTypes.STRING,
});

const Tag_taggable = sq.define("tag_taggable", {
  tagId: {
    type: DataTypes.INTEGER,
  },
  taggableId: {
    type: DataTypes.INTEGER,
  },
  taggableType: {
    type: DataTypes.STRING,
  },
});

sq.sync({ alter: true });

module.exports = {Image,Video,Tag , Tag_taggable}
// module.exports = Tag;
// module.exports = Tag_taggable;


