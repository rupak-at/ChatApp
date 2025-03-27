import axios from "axios";

const removeGroupMember = async({groupID, memberID}) => {
  try {

    const {data} = await axios.post("http://localhost:4000/group/removeMember",{
        groupID, memberID
    }, {withCredentials: true});
    if (data) {
      return "Removed SuccessFully"
    }
  } catch (error) {
    if (error.status) {
      console.log(error.response.data.message);
      return "Some Error Occurred";
    }
  }
}

export default removeGroupMember