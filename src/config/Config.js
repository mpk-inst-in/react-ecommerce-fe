
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const TIMEOUT = process.env.REACT_APP_TIMEOUT


if (!API_BASE_URL) {

  throw new Error(".env is missing the definition of REACT_APP_API_BASE_URL environment variable")
}


if (!TIMEOUT) {

  throw new Error(".env is missing the definition of REACT_APP_TIMEOUT environment variable")
}


export { API_BASE_URL, TIMEOUT }
