import { useState } from 'react'
import Campaign from './features/campaigns/Campaign'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      Assignment
      <Campaign />
    </div>
  )
}

export default App
