import React from 'react';
import Hello from './components/Hello'
import Content from './components/Content'
import useBox from 'src/index'
import './App.css';


const opt = {
  state: {
    name: 'qingchong',
    content: 'hello world'
  },
  setName () {
    console.log(this)
    // @ts-ignore
    this.setState({
      name: 'haha'
    })
  },
  setContent () {
    // @ts-ignore
    this.setState({
      content: '2222'
    })
  }
}
function App(props: any) {
  console.log(useBox)
  const {events, state} = useBox(opt, props)
  const {name, content} = state
  // @ts-ignore
  const {setName, setContent} = events
  return (
    <div className="App">
      <Hello  name={name} onClick={setName}></Hello>
      <Content content={content} onClick={setContent}></Content>
    </div>
  );
}

export default App;
