import Hello from './components/Hello'
import Content from './components/Content'
import useBox from '../../src/index'
import './App.css'

const opt = {
  state: {
    name: 'qingchong',
    content: 'hello world',
  },
  async setName() {
    // const name = await this.sleep()
    // @ts-ignore
    this.setState({
      name: 'haha',
    })
  },
  sleep () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('qingchong') 
      }, 3000)
    })
    
  },
  setContent() {
    // @ts-ignore
    this.setState({
      content: '2222',
    })
  },
}
function App(props: any) {
  const { events, state, loading } = useBox(opt, props)
  const { name, content } = state
  // @ts-ignore
  const { setName, setContent } = events
  return (
    <div className="App">
      <Hello name={name} onClick={setName}></Hello>
      <Content content={content} onClick={setContent}></Content>
      <div>nameLoading: {loading.setName ? 'loading' : 'wait'}</div>
    </div>
  )
}

export default App
