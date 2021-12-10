import Hello from './components/Hello'
import Content from './components/Content'
import BlackBox from '../../src/index'
import './App.css'

export default BlackBox(
  {
    state: {
      name: 'qingchong',
      nick: undefined,
      content: 'hello world',
    },
    async setName() {
      const name = await this.sleep()
      this.setState({
        name,
      })
    },
    sleep(): Promise<string> {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('qingchong')
        }, 3000)
      })
    },
    setContent() {
      this.setState({
        content: '2222',
      })
    },
    // setState() {
    //   return false
    // },
  },
  function App(data) {
    const { events, state, loading } = data
    const { name, content } = state
    const { setName, setContent } = events
    return (
      <div className="App">
        <Hello name={name} onClick={setName}></Hello>
        <Content content={content} onClick={setContent}></Content>
        <div>nameLoading: {loading.setName ? 'loading' : 'wait'}</div>
      </div>
    )
  },
)
