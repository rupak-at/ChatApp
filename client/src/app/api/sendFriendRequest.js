import axios from "axios";

const sendFriendRequest =async (id) => {
    try {
        const res = await axios.post(
          `http://localhost:4000/request/sendRequest/${id}`,
          {},
          { withCredentials: true }
        );

        if (res.data) {
          return res.data.message;
        }
      } catch (error) {
        if (error.response.status === 409) {
          return(error.response.data.message);
        } else {
          console.error(error);
          return error.response.data.message;
        }
      }
}

export default sendFriendRequest