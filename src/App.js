import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
// 만약에 import Missing from './About'; 잘못 임포트 하면
// 아무리 와일드카드 페이지에 대한 경로를 바꿔줘도
// Missing에 대해서도 Missing 페이지가 아닌
// About 페이지가 대응되기 때문에 Missing 페이지는 안나오고
// 틀린 경로 입력시 주구 장창 About 페이지만 뜨게된다.
// 실제로 그런 실수를 했고 제대로 아래와 같이 고쳐준 후 
// 404 페이지를 위한 경로에 적용된 와일드카드 경로 "*"는 제대로 작동했다.
// 이전까지 About로 Missing이 잘못대응되고 있을 때는
// 아무리 와일드카드를 쓴다 한들 About 페이지만 계속 떴다.
import Missing from './Missing';
import { Routes,Route } from "react-router-dom";
//import { DataProvider } from './context/DataContext';

import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';


// How react router works is that
// it routes components
function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
      setPosts(data);
  }, [data, setPosts]);
  // DataProvider로 컴포넌트들을 감싸주고 컴포넌트들은
  // 필요에 따라 DataProvider를 구독할 수 있게 된다.
  return (
    <div className="App">
      <Header title="React JS Blog" />
      
        <Nav />
        <Routes>
          <Route path="/" element={
            <Home 
              isLoading={isLoading}
              fetchError={fetchError} />}/>
          <Route path="/post" element={<NewPost />}/>
          <Route path="/edit/:id" element={<EditPost />}/>
          <Route path="/post/:id" element={<PostPage />}/>
          <Route path="/about" element={<About />}/>
          <Route path="*" element={<Missing />}/>
        </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;
/*
원래는 위의 About과 Missing에 관련된 원래 형태는 다음과 같다.
<Route path="/about" component={About} />
<Route path="/missing" component={Missing} />
index.js에 적혀있는 주석에서도 말했지만 리액트 v6로 넘어오면서
component나 children은 못쓰게 됐고 대신 element를 써야한다.
그러므로 주석이 아닌 위의 본문에 적힌 부분처럼 element를 쓴다.
아울러 다음과 같은 형태도 이젠 안먹힌다.
<Route path="/">
  <Home/>
</Route>
그래서 전부 element가 적용된 형태로 저기와 같이 바꿔줄 필요가 있다.
마지막으로 path="*"의 경우 와일드카드(혹은 catch all)의 의미로 
그 위의 모든 경우가 해당되지 않았을 경우 마지막의 와일드카드의 경우가
위에서 잡히지 않고 내려온걸 Missing을 보여주며 받아주게 된다.
위의 여러 경우들에 대해 break가 빠진 switch 문과 같은 효과를 이는
기본적으로 가지게 되고 일치하는 발견된 첫번째 경우의 경로에 해당하는
컴포넌트를 보여주게 된다. 하지만 만약에 경로에서 "/post"가 일치하는
컴포넌트를 보고 싶은데 그보다 먼저 "/" 부분이 일치해버리는 경우가
발견되면 그리고 빠져 버리는 문제가 생긴다. 이를 방지하기 위해
exact라는 키워드를 사용한다.
 */