import axios from "axios";

const getGroups = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/group`, {
        withCredentials: true,
      });
      return data?.groups
    } catch (error) {
        if (error.status){
            console.log(error.response.data.message);
        }
      return []
    }
  };
export default getGroups;