import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

// 다른 여러 컴포넌트들에 데이터를 제공하는 역할
export const DataProvider = ({ children }) => {
    // 위의 children은 DataProvider 안에 있는 컴포넌트들을
    // 말하는 것이며, 그리고 데이터는 DataProvider 내에 있는
    // 그 children에 가용하게 될 것이다.
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data]);
      
    useEffect(() => {
        const filteredResults = posts.filter(post => 
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase())
            );
        setSearchResults(filteredResults.reverse());
    },[posts, search]);

    return (
        // 지금까진 전달인자로 전달해왔던 프롭이었던 것들을
        // DataContext.Provider를 통해 전달할 수 있게 되는 것이다.
        // 그리고 DataProvider는 이 DataContext.Provider에
        // 다른 여러 컴포넌트들에 데이터를 useContext 훅을 통한
        // 요청으로 요구하게 되는 것이다.
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            posts, setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;