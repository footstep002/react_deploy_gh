//import React from 'react';
import { useEffect} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
//import DataContext from './context/DataContext';
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPost = () => {
    //const { posts, setPosts } = useContext(DataContext);
    //const posts = useStoreState((state) => (state.posts));
    //const setPosts = useStoreActions((actions) => (actions.setPosts));
    const {id} = useParams();
    //const [editTitle, setEditTitle] = useState('');
    //const [editBody, setEditBody] = useState('');
    const editPost = useStoreActions((actions) => actions.editPost);
    const editTitle = useStoreState((state) => (state.editTitle));
    const setEditTitle = useStoreActions((actions) => (actions.setEditTitle));
    const editBody = useStoreState((state) => (state.editBody));
    const setEditBody = useStoreActions((actions) => (actions.setEditBody));

    
    //const post = posts.find(post => (post.id).toString() === id);
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])

    // for update in CRUD
    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = { id, title: editTitle, datetime, body: editBody };
        editPost(updatedPost);
        navigate(`/post/${id}`);
    };

    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>EditPost</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title: </label>
                    <input
                        id="postTitle"
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)} 
                    ></input>
                    <label htmlFor="postBody">Post: </label>
                    <textarea
                        id="postBody"
                        required
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                    />
                    <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Page Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                    <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            }  
        </main>
    );
}

export default EditPost

/*
위의 반환문에서 내부에 fragment를 쓴 이유는 jsx에선 부모 요소가
필요한데 fragment로 감싸주지 않을 경우 그 안의 복수의 요소들이
(여기서의 경우는 h2와 form) 남매 요소로써 동급 레벨에 존재하게 
되기 때문이다.
참고로 main의 클래스명을 NewPost로 놔둔 이유는 NewPost에 적용된
스타일을 그대로 그냥 적용하고자 하기 때문이다.
 */