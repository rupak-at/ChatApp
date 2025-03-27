import axios from "axios";

const createGroup = async (name, members) => {
    try {
        const { data } = await axios.post(
          "http://localhost:4000/group/makeGroup",
          { name, members },
          { withCredentials: true }
        );
        if (data){
            return 'Group Created Successfully';
        }
    } catch (error) {
        if (error.status) {
          console.log(error.response.data.message);
          return "Some Error Occurred";
        }
      }
};

export default createGroup;