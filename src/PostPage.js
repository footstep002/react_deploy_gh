//import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
//import { useContext } from 'react';
//import api from './api/posts'
//import DataContext from './context/DataContext';
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
  //const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);
  const handleDelete = (id) => {
    deletePost(id);
    navigate('/');
  };

  console.log('postpage');

  // 여기서 id라 한 이유는 그걸 App.js의 우리의 라우트에서
  // PostPage를 위한 매개변수를 정의할 때 그렇게 불렀기 때문이다.
  // 만약에 거기서 다른 이름으로 불렀다면 여기서도 그에 맞게
  // 바꿔줘야 한다.
  //
  // useParams를 써서 id를 활용(주소 끝에 숫자(예/1, /4 등)),
  // 해당 포스트를 가져와 페이지에포스트의 상세 내용 전부를 
  // 표시해 주는데 성공했다.
  // 참고로 경로를 존재하지는 포스트의 경로인 /5로 끝을 맺어주고
  // 가보면 아래의 post가 없을 경우에 대한 화면 표시 내용을
  // 보여주게 된다.
  //const post = posts.find(post => (post.id).toString() === id);// 원래는 post.id가 숫자이므로 ==가 아닌 ===로 문자열 id와 비교하려면 여기서의 경우처럼 toString을 써줘야 한다.

  return (
    <main className="PostPage">
        <article className="post">
          {post && // if post exists below fragment will be displayed
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{post.datetime}</p>
              <p className="postBody">{post.body}</p>
              <Link to={`/edit/${post.id}`}>
                <button className="editButton">
                  Edit Post</button>
              </Link>
              <button className="deleteButton"
                onClick={() => handleDelete(post.id)}>
                Delete Post
              </button>
            </>
          }
          { // post가 없을 경우
            !post &&
            <>
              <h2>Post Not Found</h2>
              <p>Well, that's disappointing.</p>
              <p>
                <Link to='/'>Visit Our Homepage</Link>
              </p>
            </>
          }
        </article>
    </main>
  );
}

export default PostPage