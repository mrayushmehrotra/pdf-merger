const express = require('express');
const app = express();
const multer = require("multer");
const {mergePDFs} = require("./testpdfs")
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))
const port = 3000;

app.get("/", (req,res)=>{
    res.sendFile((__dirname + "/templates/index.html"));
});

app.post("/", (req,res)=>{
    res.sendFile((__dirname + "/templates/index.html"));

});

app.post("/merge", upload.array('pdfs', 2), async (req, res, next) => {
    await mergePDFs((__dirname, req.files[0].path), (__dirname, req.files[1].path));

    res.redirect('http://localhost:3000/static/merged.pdf' );
    console.log(req.body.pdfs);
});


app.listen(port, ()=>{
    console.log(`Server is on http://localhost:${port}`);
});
