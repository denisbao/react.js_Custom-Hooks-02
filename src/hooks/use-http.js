import { useState, useCallback } from 'react'


/**
 * @param {object} requestConfig object {url, method, headers, body} for the http request
 * @param {() => {}} applyData function that will format the data returned from the request
 * @returns object containing isLoading, error and sendRequest
 */
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback (async (requestConfig, applyData) => {
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
      console.log(data)
      applyData(data) // function provided by the component that calls this hook
      
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
