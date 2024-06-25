import React, { useState, useEffect } from 'react';
import './Feed.css';
import axios from 'axios';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:3000');

const Feed = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();

    socket.on("new_post", (newPost) => {
      setPosts(prevPosts => [...prevPosts, newPost]);
    });

    socket.on("like_post", (update) => {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === update.id ? { ...post, likes: update.likes } : post
        )
      );
    });

    socket.on("comment_post", (update) => {
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === update.id ? { ...post, comments: [...post.comments, update.comment] } : post
        )
      );
    });

    return () => {
      socket.off("new_post");
      socket.off("like_post");
      socket.off("comment_post");
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/uploads");
      setPosts(response.data);
     
    } catch (err) {
      console.error(err);
    }
  };



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);

    try {
      await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        setFile(null);
        setDescription("");
        fetchPosts(); 
        toast.success("Posted Successfully");
      } else {
        toast.error("Failed to post");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (id) => {
    try {
      await axios.post(`http://localhost:3000/like/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (id, text) => {
    try {
      await axios.post(`http://localhost:3000/comment/${id}`, { text });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    
    <div className="FeedContainer">
      < ToastContainer/>
      <div className="share">
        <div className="photos">
          <div className="user">
            <span className="material-symbols-outlined user1">
              account_circle
            </span>
            <div className='input'>
              <input
                type="text"
                name='description'
                placeholder='Description'
                onChange={handleDescriptionChange}
                value={description}
                style={{ width: "300px", height: "30px " }}
              />
            </div>
          </div>
          <hr />
          <div className='shareicons'>
            <label className="photos">
              <input
                type="file"
                name='image'
                style={{ visibility: "hidden", width: "0.1px" }}
                onChange={handleFileChange}
              />
              <div>
                <span className="material-symbols-outlined icn">
                  image
                </span>
                Upload photo
              </div>
            </label>
            <button className='btn' onClick={handleSubmit}>Share</button>
          </div>
        </div>
      </div>
      
      
        {posts.map(post => (
          <div className='Imagestop'>
          <div key={post.id} className='userupload'>
            <div className="user">
              <div><span className="material-symbols-outlined user1">
                account_circle
              </span> 
              <p className='vi'>User</p></div>
              <div><span className="material-symbols-outlined">
                more_vert
              </span></div>
              
              
            </div>
            <div>
             
            </div>
            <div className='desc'>
              <p>{post.description}</p>
            </div>
            <img src={`http://localhost:3000/Alldata/${post.imagePath}`} alt="" />
            <div className="likecomment">
              <div className='likes'>
                <span className="material-symbols-outlined" onClick={() => handleLike(post.id)} style={{cursor:"pointer"}}>
                  favorite
                </span>
                <span>{post.likes}</span> 
                <span className="material-symbols-outlined">
                  maps_ugc
                </span>
              </div>
              <div className='comments'>{post.comments.length} comments</div>
            </div>
            <div className='input'>
              <input 
                type="text" 
                placeholder='comments' 
                style={{ width: "80%", height: "30px " }} 
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(post.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
             
            </div>
            <hr />
            <div className='comm'>
              <p className='commhead'>Comments</p>
              {post.comments.map(comment => (
                <p key={comment.id}>{comment.text}</p>
              ))}
            </div>
            <hr />
          </div>
          </div>
        ))}
      
    </div>
  );
};

export default Feed;
