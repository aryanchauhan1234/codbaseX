import { useState } from "react";
import { useCfStorestemp } from "../store/useCfStorestemp";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const FriendInput = ({ comparisonRef }) => {
  const [input, setInput] = useState("");
  const [friends, setFriends] = useState([]);
  const addFriendsToDB = useCfStorestemp((state) => state.addFriends);

  const handleAddFriend = () => {
    const trimmed = input.trim();
    if (trimmed && !friends.includes(trimmed)) {
      setFriends([...friends, trimmed]);
      setInput("");
    }
  };

  const handleRemoveFriend = (friend) => {
    setFriends(friends.filter((f) => f !== friend));
  };

  const handleSubmit = async () => {
    if (friends.length === 0) {
      toast.error("Add at least one friend");
      return;
    }

    const success = await addFriendsToDB(friends);
    if (success) {
      toast.success("Friends saved!");
      setFriends([]);

      localStorage.setItem("scrollToComparison", "true");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } else {
      toast.error("Error saving friends");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl p-8 rounded-3xl shadow-lg bg-white border border-orange-200">
        <h2 className="text-3xl font-extrabold text-orange-800 mb-6 text-center">
          👥 Add Codeforces Friends
        </h2>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter CF handle"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddFriend()}
            className="flex-1 border border-orange-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50 placeholder:text-orange-500"
          />
          <button
            onClick={handleAddFriend}
            className="bg-orange-400 text-white px-5 py-2 rounded-xl hover:bg-orange-600 transition-all"
          >
            Add
          </button>
        </div>

        {friends.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {friends.map((f) => (
              <div
                key={f}
                className="bg-orange-100 border border-orange-300 text-sm px-3 py-1 rounded-full flex items-center shadow-sm text-orange-800"
              >
                {f}
                <X
                  className="ml-2 w-4 h-4 cursor-pointer hover:text-red-600 transition"
                  onClick={() => handleRemoveFriend(f)}
                />
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600 transition-all"
        >
          Save Friends
        </button>
      </div>
    </div>
  );
};

export default FriendInput;
