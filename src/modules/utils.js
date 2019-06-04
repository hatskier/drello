export default  {
  generateId() {
    return Date.now().toString()
  },
  capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  },
  dictToListWithIds(dict) {
    let resList = []
    for (let id in dict) {
      resList.push(Object.assign({id}, dict[id]))
    }
    return resList
  }
}