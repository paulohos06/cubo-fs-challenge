const userService = axios => {
  const baseUrl = '/'

  const getAll = async () => {
    try {
      const users = await axios.get(baseUrl)
      return users.data
    } catch (err) {
      console.log('Server error:', err)
      throw new Error('Unable to get users!')
    }
  }
  
  const add = async user => {
    try {
      return await axios.post(baseUrl, user)
    } catch (err) {
      console.log('Server error:', err)
      throw new Error('Unable to insert this user!')
    }
  }

  const remove = async user => {
    try {
      return await axios.delete(`${baseUrl}${user._id}`, user)
    } catch (err) {
      console.log('Server error:', err)
      throw new Error('Unable to remove this user!')
    }
  }

  return {
    getAll,
    add,
    remove
  }
}

export default userService