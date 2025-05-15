import { useState } from 'react'
import ChatCode from './ChatCode'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ChatCode/>
    </>
  );
}

export default App
