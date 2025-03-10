import Image from "next/image";
import React from "react";

const GroupList = ({ handleGroupSelect, searchGroup ,selectGroup}) => {
  const groups = [
    {
      groupId: "group-123",
      groupName: "Project Phoenix",
      members: [
        { userId: "user-456", displayName: "Alice Smith", role: "admin" },
        { userId: "user-789", displayName: "Bob Johnson", role: "member" },
        { userId: "user-101", displayName: "Charlie Brown", role: "member" },
      ],
      messages: [
        {
          messageId: "msg-abc",
          senderId: "user-456",
          content: "Meeting scheduled for tomorrow at 10 AM.",
          timestamp: "2023-10-27T10:00:00Z",
        },
        {
          messageId: "msg-def",
          senderId: "user-789",
          content: "Got it, thanks!",
          timestamp: "2023-10-27T10:05:00Z",
        },
      ],
      createdAt: "2023-10-26T15:30:00Z",
      updatedAt: "2023-10-27T10:05:00Z",
      groupIcon:
        "data:image/jpeg;base64,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",
    },
    {
      groupId: "group-456",
      groupName: "Book Club",
      members: [
        { userId: "user-202", displayName: "David Lee", role: "admin" },
        { userId: "user-303", displayName: "Eve Wilson", role: "member" },
        { userId: "user-404", displayName: "Frank Garcia", role: "member" },
        { userId: "user-505", displayName: "Grace Rodriguez", role: "member" },
      ],
      messages: [
        {
          messageId: "msg-ghi",
          senderId: "user-202",
          content:
            "This month's book is 'The Hitchhiker's Guide to the Galaxy'.",
          timestamp: "2023-10-26T18:00:00Z",
        },
        {
          messageId: "msg-jkl",
          senderId: "user-303",
          content: "Looking forward to it!",
          timestamp: "2023-10-26T18:15:00Z",
        },
        {
          messageId: "msg-mno",
          senderId: "user-404",
          content: "Great Choice!",
          timestamp: "2023-10-26T18:20:00Z",
        },
      ],
      createdAt: "2023-10-25T12:00:00Z",
      updatedAt: "2023-10-26T18:20:00Z",
      groupIcon:
        "data:image/jpeg;base64,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",
    },
    {
      groupId: "group-789",
      groupName: "Gaming Night",
      members: [
        { userId: "user-606", displayName: "Henry Martinez", role: "admin" },
        { userId: "user-707", displayName: "Ivy Anderson", role: "member" },
        { userId: "user-808", displayName: "Jack Thomas", role: "member" },
      ],
      messages: [
        {
          messageId: "msg-pqr",
          senderId: "user-606",
          content:
            "Tonight, we're playing Among Us and then some Rocket League.",
          timestamp: "2023-10-27T19:00:00Z",
        },
        {
          messageId: "msg-stu",
          senderId: "user-707",
          content: "Sounds good!",
          timestamp: "2023-10-27T19:05:00Z",
        },
      ],
      createdAt: "2023-10-27T10:00:00Z",
      updatedAt: "2023-10-27T19:05:00Z",
      groupIcon:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShR0YStcNN0Hmg9nWEwtXOXwUQIUO1jFLctkFPq62Ye0I5PkYkSVGmpew&s",
    },
  ];

  const searchedGroup = groups.filter((group) => {
    if (group.groupName.toLowerCase().includes(searchGroup.toLowerCase())) {
      return group;
    }
  });
  return (
<div className="bg-gray-900 w-96 h-screen font-sans shadow-lg border-r overflow-y-auto scrollbar-none">
  <div className="flex flex-col">
    {searchedGroup.map((group) => (
      <div
        onClick={() => handleGroupSelect(group)}
        key={group.groupId}
        className={`flex items-center gap-4 p-4 cursor-pointer transition-all ${
          selectGroup?.groupId === group?.groupId
            ? "bg-gray-800 border-l-4 border-purple-500"
            : "bg-gray-900 hover:bg-gray-800"
        }`}
      >
        {/* Friend's Image */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
            {group.groupIcon ? (
              <Image
                src={group.groupIcon}
                height={56}
                width={56}
                alt="Friend's Image"
                className="rounded-full object-cover h-16 w-16"
              />
            ) : (
              <span className="text-xl text-gray-300">👤</span>
            )}
          </div>
          {/* Active Status Indicator */}
          <span
            className={`h-3 w-3 border-2 border-gray-900 rounded-full absolute ${
              group.isActive ? "bg-green-500" : "bg-gray-500"
            } bottom-1 right-1`}
          ></span>
        </div>

        {/* Friend's Name */}
        <div className="flex flex-col gap-1">
          <div className="text-lg font-medium text-gray-100">
            {group.groupName}
          </div>
          {/* Optional: Last Message Preview */}
          <div className="text-sm text-gray-400 truncate max-w-[200px]">
            {group.lastMessage || "No messages yet"}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default GroupList;
