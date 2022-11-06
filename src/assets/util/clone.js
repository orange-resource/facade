const clone = {
  deep (data) {
    return JSON.parse(JSON.stringify(data))
  }
}

export default clone
