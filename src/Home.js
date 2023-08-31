import React from 'react'
import Feed from './Feed'
//import { useContext } from 'react';
//import DataContext from './context/DataContext';
import { useStoreState } from 'easy-peasy';

function Home({ isLoading, fetchError }) {
  const searchResults = useStoreState((state) => state.searchResults);
  console.log('home');
  return (
    <main className='Home'>
        {isLoading && 
          <p className='statusMsg'>Loading posts...</p>}
        {fetchError &&
          <p className='statusMsg'
            style={{color: "red"}}>{fetchError}</p>}
        {!isLoading && !fetchError && (
          searchResults.length 
            ? <Feed posts={searchResults} /> 
            : <p className='statusMsg'>No posts to display.</p>)}
    </main>
  );
}

export default Home;

/*
return (
    <main className='Home'>
        {posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p style={{ marginTop: "2rem" }}>
            No posts to display.
          </p>
        )}
    </main>
  ); 
*/