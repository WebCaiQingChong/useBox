import {memo} from 'react'
// export default memo()
let cache = {}
export default function Hello (props: any) {
  console.log('hello')
  console.log('props', JSON.stringify(props))
  console.log('click', props)
  return <h1 onClick={props.onClick}>hello, {props.name} !</h1>
}