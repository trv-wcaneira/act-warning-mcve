import { useEffect, useState } from 'react';

function App() {
  const [fetchState, setFetchState] = useState({ fetching: true })

  const handleRetry = () => {
    setFetchState({ fetching: true })
  }

  useEffect(() => {
    const doTheFetch = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        if (res.status === 200) {
          const data = await res.json()
          setFetchState({ todo: data.title, fetching: false })
        }
        else {
          console.log('bad HTTP status', res.status)
          setFetchState({ failed: true })
        }
      } catch (e) {
        console.log('error thrown', e)
        setFetchState({ failed: true })
      }
    }

    if (fetchState.fetching) {
      doTheFetch()
    }
  }, [fetchState])

  if (fetchState.fetching) {
    return <p>Loading...</p>
  }

  if (fetchState.failed) {
    return <p>Failed! <button onClick={handleRetry}>Click here to try again</button></p>
  }

  return <p>{fetchState.todo}</p>
}

export default App;
