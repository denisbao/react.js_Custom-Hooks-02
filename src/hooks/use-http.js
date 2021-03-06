import { useState, useCallback } from 'react'


/**
 * CUSTOM HOOK that make a request to Firebase realtime database.
 */
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback (async (requestConfig, formatDataByComponent) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
         requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
         }
      )

      if (!response.ok) {
        throw new Error('Request failed!')
      }

      const data = await response.json()
      formatDataByComponent(data) // function provided by the component that calls this hook
      
    } catch (err) {
      setError(err.message || 'Something went wrong!')
    }
    setIsLoading(false)
  }, [])

  return {
     isLoading,
     error,
     sendRequest,
  }
}

export default useHttp
