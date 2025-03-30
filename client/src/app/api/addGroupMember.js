import axios from "axios";

const addGroupMember = async (groupID, memberID) => {
    try {
        const { data } = await axios.put(
          "http://localhost:4000/group/addMember",
          { groupID, memberID },
          { withCredentials: true }
        );
        if (data) {
          // return "Added SuccessFully"
          return data?.message
        }
      } catch (error) {
        if (error.status) {
          console.log(error.response.data.message);
          // return "Some Error Occurred";
          return error.response.data.message
        }
      }
}

export default addGroupMember