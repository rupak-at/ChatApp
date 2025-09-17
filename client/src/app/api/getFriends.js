import axios from "axios";

const getFriends = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/friend`, {
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