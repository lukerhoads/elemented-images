import React, { Component } from 'react'
import { MainContainer, Header, Creator } from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContainer>
          <Header />
          <Creator />
        </MainContainer>
      </div>
    )
  }
}

export default App;
