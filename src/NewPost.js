//import React from 'react'
//import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
//mport api from './api/posts'
//import DataContext from './context/DataContext';
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
  //const [postTitle, setPostTitle] = useState('');
  //const [postBody, setPostBody] = useState('');
  //const { posts, setPosts } = useContext(DataContext);
  const posts = useStoreState((state) => (state.posts));
  const postTitle = useStoreState((state) => (state.postTitle));
  const postBody = useStoreState((state) => (state.postBody));

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length 
        ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    navigate('/');
  };

  console.log('new post');

  return (
    <main className="NewPost">
        <h2>NewPost</h2>
        <form className="newPostForm" onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Title: </label>
          <input
            id="postTitle"
            type="text"
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)} 
          ></input>
          <label htmlFor="postBody">Post: </label>
          <textarea
            id="postBody"
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>    
    </main>
  )
}

export default NewPost
// onSubmit에서 굳이 익명 함수를 만들어 전달인자 e 같은 것을 통해
// 전달인자를 받는 부분을 넣어주지 않더라도 단순히 handleSubmit과
// 같은 함수명을 넣어주면 자동적으로 그런 이벤트 전달인자를
// 해당 함수에 받아들이게 된다.