import axios from "axios";

const addGroupMember = async (groupID, memberID) => {
    try {
        const { data } = await axios.put(
          "http://localhost:4000/group/addMember",
          { groupID, memberID },
          { withCredentials: true }
        );
        if (data) {
          return "Added SuccessFully"
        }
      } catch (error) {
        if (error.status) {
          console.log(error.response.data.message);
          return "Some Error Occurred";
        }
      }
}

export default addGroupMember