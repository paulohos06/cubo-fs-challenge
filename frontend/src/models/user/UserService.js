const userService = axios => {
  const baseUrl = '/'

  const findAll = async () => {
    try {
      const users = await axios.get(baseUrl)
      return users.data.users
    } catch (err) {
      console.log('Error:', err)
      throw new Error('Unable to get all users')
    }
  }

  const find = async user => {
    const res = await axios.get(`${baseUrl}${user._id}`)
    return res.data.users
  }

  const add = async user => {
    if (!user._id) create(user)
    else update(user)
  }

  const create = async user => {
    try {
      return await axios.post(baseUrl, user)
    } catch (err) {
      console.log('Error:', err)
      throw new Error('Unable to insert this user!')
    }
  }

  const update = async user => {
    try {
      return await axios.put(`${baseUrl}${user._id}`, user)
    } catch (err) {
      console.log('Error:', err)
      throw new Error('Unable to update this user!')
    }
  }

  const remove = async user => {
    try {
      return await axios.delete(`${baseUrl}${user._id}`, user)
    } catch (err) {
      console.log('Error:', err)
      throw new Error('Unable to remove this user!')
    }
  }

  return {
    findAll,
    find,
    add,
    remove
  }
}

export default userService