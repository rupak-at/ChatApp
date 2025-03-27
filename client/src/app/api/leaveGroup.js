import axios from "axios";

const leaveGroup = async (groupID) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/group/leaveGroup/${groupID}`,
      { withCredentials: true }
    );

    if (data) {
      return "Left SuccessFully";
    }
  } catch (error) {
    if (error.status) {
      console.log(error.response.data.message);
      return error.response.data.message;
    }
  }
};

export default leaveGroup;
