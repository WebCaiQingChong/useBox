import React, {useState} from 'react';
import Hello from './components/Hello'
import Content from './components/Content'
import './App.css';

function App() {
  const [opt, setOpt] = useState({
    name: 'qingchong',
    content: 'hello word'
  })
  return (
    <div className="App">
      {/* @ts-ignore */}
      <Hello  name={opt.name} onClick={(pre) => setOpt({...pre, name: 'haha'})}></Hello>
      {/* @ts-ignore */}
      <Content content={opt.content} onClick={() => setOpt({content: '222222'})}></Content>
    </div>
  );
}

export default App;
