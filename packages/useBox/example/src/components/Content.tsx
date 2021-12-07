export default function Content (props: any) {
  console.log('content')
  return <p onClick={props.onClick}>content: {props.content}</p>
}