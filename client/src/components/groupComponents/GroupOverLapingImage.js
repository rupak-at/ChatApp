import Image from "next/image";

const OverlappingAvatars = ({ avatars }) => {
  return (
    <div className="flex -space-x-8">
      {avatars.slice(0, 3).map((avatar, index) => (
        <div key={index} className="relative h-10 w-10 rounded-full border-2 border-gray-800 overflow-hidden">
          <Image
            src={avatar}
            fill
            alt={`Avatar ${index + 1}`}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default OverlappingAvatars;