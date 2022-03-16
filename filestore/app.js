var express = require('express');
var path = require('path');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
const port = 3000
const app = express();

app.use(logger('dev'));
app.use(express.json());


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 50 * 1024 * 1024 },
}));

app.get('/', function(req, res, next) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="upload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
});

app.post('/upload', function(req,res, next){
   console.log(req.files.filetoupload)
   let incomingFile = req.files.filetoupload
   let fileName = incomingFile.name
   let storeName = Date.now() + '_' + fileName 
   let storePath = './store/' + storeName 
   incomingFile.mv( storePath, function() {
       res.send('upload is successful')
   })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})