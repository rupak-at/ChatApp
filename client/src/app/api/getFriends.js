import axios from "axios";

const getFriends = async () => {
    try {
      const res = await axios.get("http://localhost:4000/friend", {
        withCredentials: true,
      });
    return res.data.Friends
    } catch (error) {
      if (error.status){
        console.log(error)
      }
      return []
    }
  };
export default getFriends;