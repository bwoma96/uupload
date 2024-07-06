const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 } // Limit file size to 10MB
}).single('myFile');

// EJS
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));

// Public folder
app.use(express.static('./public'));

// Index route
app.get('/', (req, res) => res.render('index'));

// Upload route
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

// Files route
app.get('/files', (req, res) => {
  fs.readdir('./public/uploads/', (err, files) => {
    if (err) {
      res.render('files', { files: [] });
    } else {
      res.render('files', { files: files });
    }
  });
});

// Delete route
app.post('/delete', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'uploads', req.body.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/files');
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
