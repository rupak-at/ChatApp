import axios from "axios";

const createGroup = async (name, members) => {
    try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/group/makeGroup`,
          { name, members },
          { withCredentials: true }
        );
        if (data){
            return 'Group Created Successfully';
        }
    } catch (error) {
        if (error.status) {
          console.log(error.response.data.message);
          return error.response.data.message;
        }
      }
};

export default createGroup;