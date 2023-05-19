import React from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import InfiniteScroll from './infiniteScroll'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <InfiniteScroll/> 
      </header>
    </div>
  )
}

export default App