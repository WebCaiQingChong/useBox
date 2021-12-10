export default function Hello(props: any) {
  console.log('hello')
  return <h1 onClick={props.onClick}>hello, {props.name} !</h1>
}
