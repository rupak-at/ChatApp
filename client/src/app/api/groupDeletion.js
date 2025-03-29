import axios from "axios"

const groupDeletion =  async (groupId) => {
  try {
    const {data} = await axios.delete(`http://localhost:4000/group/deleteGroup/${groupId}`,{withCredentials: true});

    if (data) {
        return data?.message
    }
  } catch (error) {
    if (error.status) {
        return error.response.data.message
    }
  }
}

export default groupDeletion;