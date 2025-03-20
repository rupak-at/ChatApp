import axios from "axios";
import toast from "react-hot-toast";

const FriendCard = ({ username, avatar, isOnline, _id }) => {
  const sendRequest = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/request/sendRequest/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.data) {
        toast.success(res.data.message);
      }
      console.log(res.data);
    } catch (error) {
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={avatar || "/api/placeholder/40/40"}
            alt={username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
              isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          ></span>
        </div>
        <div>
          <h3 className="text-white font-medium">{username}</h3>
          <p className="text-gray-400 text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button
        onClick={() => sendRequest(_id)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-200"
      >
        Add Friend
      </button>
    </div>
  );
};

export default FriendCard;
