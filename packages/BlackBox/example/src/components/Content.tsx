export default function Content(props: any) {
  console.log('Content')
  return <p onClick={props.onClick}>content: {props.content}</p>
}
