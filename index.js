const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = 3000;
app.use(express.json());
// const uploadimage = multer({ dest: 'uploads/' })

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const filenameupload = Date.now() + '_' + file.originalname
      cb(null,  filenameupload)
    }
  })
  
  const upload = multer({ storage: storage })


app.get('/' , (req , res)=>{
 return res.render("homepage")
});

app.post('/upload', upload.single('UploadImage'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/")
    
  })



app.listen(PORT , ()=> console.log('> Server is up and running on port : ' + PORT))