const responseHandler = res => {
  if (!res.ok) {
    return res.json().then(() => {
      throw Error(`${res.status}: ${res.statusText}`)
    })
  }
  return res.json()
}

export { responseHandler }
