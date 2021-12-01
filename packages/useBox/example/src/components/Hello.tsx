export default function Hello (props: any) {
  return <h1 onClick={props.onClick}>hello, {props.name} !</h1>
}