import axios from "axios";

const addGroupMember = async (groupID, memberID) => {
    try {
        const { data } = await axios.put(
          `${process.env.NEXT_PUBLIC_URL}/group/addMember`,
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