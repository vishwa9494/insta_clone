const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: 'http://localhost:5173'
}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Alldata/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

let posts = [];

app.use(express.json());
app.use('/Alldata', express.static(path.join(__dirname, 'Alldata')));

app.post('/upload', upload.single('image'), (req, res) => {
  const post = {
    id: Date.now().toString(),
    imagePath: req.file.filename,
    description: req.body.description,
    likes: 0,
    comments: []
  };
  posts.push(post);
  io.emit('new_post', post);
  res.status(201).json(post);
});

app.get('/uploads', (req, res) => {
  res.json(posts);
});

app.post('/like/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.likes += 1;
    io.emit('like_post', post);
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

app.post('/comment/:id', (req, res) => {
  const postId = req.params.id;
  const post = posts.find(p => p.id === postId);
  if (post) {
    const comment = {
      id: Date.now().toString(),
      text: req.body.text
    };
    post.comments.push(comment);
    io.emit('comment_post', { id: postId, comment });
    res.status(201).json(comment);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
