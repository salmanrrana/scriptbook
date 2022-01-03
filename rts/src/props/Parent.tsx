import { ChildAsFC } from './Child'

const Parent = () => {
  return <ChildAsFC color="Blue" onClick={() => console.log('clicked')}>
    hello
  </ChildAsFC>
}

export default Parent;
