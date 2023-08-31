import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './store';

/* This specifies that App component will respond
      to the root(/) route for our application.
      Now everything about our application will be inside
      of react router, and we can use everything associated
      with react router including some hooks that come with
      the react router dom package*/
const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </Router>
    </StoreProvider>
  </React.StrictMode>
);
/*
React Router V6가 정식 릴리즈 되면서 Route에 children이나 component가
사라지고 대신 element를 사용해야 하며, Route의 경우도 그냥은 못쓰고
Routes로 감싸줘야 한다. 그리고 상위에 위치하는 Route에서 path에 "*"나 "/*"가 아닐 경우
그러니까 예를들어 *가 없이 "/"만 있는 경우 더 이상 그 하위는 렌더되지 않는다. 때문에 하위에
렌더할 게 더 있다면 반드시 상위의 Route에서 path에 *가 반드시 포함되게 하자.
문제는 이걸 뻔히 알면서도 위의 경우처럼 제일 상위에 위치하는 App의 경우 별도의 js파일에
정의해 놓으면서 이런 부분을 까먹고 그 path를 그냥 "/"으로 해둬서 다른 js파일에 정의해놓은
다른 하위 루트들 대부분이 아무리 하위 주소를 넣어도 렌더가 안되는 경우가 나오고 만다.
결국 아래와 같은 원본소스가 있다면 이를 동작케
하기 위해선 위와 같은 형태로 변형이 필요하다.
<Router>
  <Route path="/" component={App} />
</Router>
참고로 위의 Router는 BrowserRouter의 별칭을 지정했을 뿐이라는 걸
잊지말자.
*/

/*
리액트는 어찌됐건 간에 기본적으로 루트가 되는 하나의 div 안에
일차적으로 감싸져 있는 구조를 취한다. 그리고 대개는 이를 간과하고
그 최외곽 컨테이너의 역할을 하는 div의 너비를 설정하는 그 어떤
조치도 구체적으로 하지 않기 때문에 아무리 width: 100%로 저마다
컴포넌트들의 너비를 설정해뒀다고 하더라도 내부 컨텐츠의 종류에 
따라서 전체 앱의 너비가 조금씩 늘어났다가 줄어드는 변화를 보이게
된다.
그러므로 예를 들어 index.css에서 body와 .App클래스 사이에 추가적인
조치를 취해주는 것이 바람직하다. 결국 아래와 같이
#root {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
root 아이디에 대해 flex-grow: 1을 부여해 가용한 너비를 최대한 활
용해 넓어지도록 한다. justify나 align을 아무리 body에다
적용하고 조정을 해본다 한들 body와 root 사이에는 빈 공간이 남는다.
그보다는 위의 경우처럼 root 내에서 조정을 해주는게 효과가 있다.
*/
