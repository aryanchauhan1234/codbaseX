// import { Card, CardContent } from "@/components/ui/card";
import { FaCodeforces, FaLink } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const UserCard = ({ user }) => {
  const {
    name,
    handle,
    profilePic,
    codeforces,
    leetcode,
    tags,
  } = user;

  return (
    <Card className="max-w-sm rounded-2xl shadow-xl p-4 bg-white">
      <div className="flex flex-col items-center text-center">
        <img
          src={profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-black object-cover"
        />
        <h2 className="text-xl font-bold mt-2">{name}</h2>
        <p className="text-sm text-gray-500">@{handle}</p>

        <div className="grid grid-cols-2 gap-4 mt-4 w-full">
          <div className="border p-3 rounded-xl text-center bg-gray-50">
            <h4 className="text-md font-semibold text-[#1f8acb] flex items-center justify-center gap-1">
              <FaCodeforces /> Codeforces
            </h4>
            <p className="text-sm">Rating: <strong>{codeforces.rating}</strong></p>
            <p className="text-sm">Rank: <strong>{codeforces.rank}</strong></p>
            <a
              href={codeforces.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline flex items-center justify-center gap-1 mt-1"
            >
              <FaLink /> View Profile
            </a>
          </div>

          <div className="border p-3 rounded-xl text-center bg-gray-50">
            <h4 className="text-md font-semibold text-[#f89f1b] flex items-center justify-center gap-1">
              <SiLeetcode /> LeetCode
            </h4>
            <p className="text-sm">Rating: <strong>{leetcode.rating}</strong></p>
            <p className="text-sm">Global Rank: <strong>{leetcode.rank}</strong></p>
            <a
              href={leetcode.profile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline flex items-center justify-center gap-1 mt-1"
            >
              <FaLink /> View Profile
            </a>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-200 text-sm rounded-full text-gray-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
