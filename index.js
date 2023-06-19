const { json } = require("body-parser");
const express = require("express");
const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const { sq } = require("./db");

const {Image , Video ,Tag,Tag_taggable} = require("./model");

const app = express();
app.use(express.json());

/**---------------one to many-------------------------**/

Image.hasMany(Comment , {
    foreignKey: 'commentableId',
    constraints:false,
    scope:{
      commentableType:'image' 
    }
  })
  Video.hasMany(Comment , {
    constraints:false,
    scope:{
      commentableType:'video'
    }
  })
  Comment.belongsTo(Image , {
    constraints:false,
     foreignKey: 'commentableId'
  })
  Comment.belongsTo(Video , {
      constraints:false,
      foreignKey: 'commentableId'
  })



/**---------------many to many-------------------------**/

Image.belongsToMany(Tag,{
    through:{
        model:Tag_taggable,
        unique:false,
        as:"tag",
        scope:{
            taggableType:'image'
        }
    },
    foreignKey:'taggableId',
    constraints:false
})

Tag.belongsToMany(Image ,{
    through:{
        model:Tag_taggable,
        as:"image",
        unique:false,
        scope:{
            taggableType:'image'
        }
    },
    foreignKey:'taggableId',
    constraints:false
})

Video.belongsToMany(Tag,{
    through:{
        model:Tag_taggable,
        unique:false,
        as:"tag",
        scope:{
            taggableType:'video'
        }
    },
    foreignKey:'taggableId',
    constraints:false
})

Tag.belongsToMany(Video ,{
    through:{
        model:Tag_taggable,
        unique:false,
        as:"video",
        scope:{
            taggableType:'video'
        }
    },
    foreignKey:'taggableId',
    constraints:false
})

/**---------------many to many-------------------------**/

app.get("/data", async (req, res) => {
  try {
    const tags = await Video.findAll({
        include:[{model:Tag}]
    });
    res.send(tags);
  } catch (error) {
    console.log(error.message);
  }
});

/**---------------one to many-------------------------**/


app.get("/data", async (req, res) => {
  try {
    const tags = await Image.findAll({
        include:[{
          model:Comment
        }]
    });
    res.send(tags);
  } catch (error) {
    console.log(error.message);
  }
});

/**---------------row query-------------------------**/

app.get("/query", async (req, res) => {
  const users = await Image.sequelize.query(
    "select * from comments where title IN(:title)",
    {
      type: QueryTypes.SELECT,
      model: Image,
      mapToModel: true,
      replacements: { title: ["okay", "good"] },
      // replacements:['okay']
    }
  );
  let response = {
    data: "row query",
    record: users,
  };
})


/**---------------transaction--------------------------**/

  app.get("/transaction", async (req, res) => {
    const t = await sq.transaction();
    try {
      const image = await Image.create(
        {id:101, title: "sss", url: "sdfssssdfsd" },{   transaction: t,})
        console.log("commit")
        res.status(200).send(image)
       t.commit();
      res.status(200).send("okay");
    } catch (error) {
        console.log(error.message);
        console.log("rollback");
      t.rollback();
    }
  }
  
  );

 
/**---------------hooks--------------------------**/ 


app.get('/hooks' , async(req,res)=>{
  try {
    const image = await Image.create(
           {id:18, title: "seffe53s", url: "sdfffee535sd" })
           res.status(200).send(image)
  } catch (error) {
    console.log(error.message);
  }
});



/**--------------- qyery interface --------------------------**/


const queryInterface = sq.getQueryInterface();

app.get('/queryInterface', async(req,res)=>{
  try {
    // queryInterface.createTable('avon' , {
    //   name:DataTypes.STRING
    // })

    // queryInterface.addColumn('avon', 'email' ,{
    //   type:DataTypes.STRING
    // } )

    // queryInterface.changeColumn('avon', 'email' ,{
    //   type:DataTypes.STRING,
    //   defaultValue:'riaa@test'
    // } )
  //  queryInterface.removeColumn('avon' , 'email')   
      // queryInterface.dropTable('avon')
    res.send(200).send('okat')
  } catch (error) {
    console.log(error.message);
  }

})


app.listen(8080, () => {
  console.log("server is running on 8080 port");
});
