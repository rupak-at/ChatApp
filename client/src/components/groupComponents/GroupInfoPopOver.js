import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { MdAdminPanelSettings } from "react-icons/md";
import AddMembers from "./AddMembers";
import { Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import removeGroupMember from "@/app/api/removeGroupMember";
import toast from "react-hot-toast";
import leaveGroup from "@/app/api/leaveGroup";
import groupDeletion from "@/app/api/groupDeletion";
import getGroups from "@/app/api/getGroups";
import { setGroupList } from "@/lib/redux/features/groupListSlice";

const GroupInfoPopOver = ({ selectGroup, chatId }) => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const handleRemoveMember = (memberId) => {
    removeGroupMember({ groupID: chatId, memberID: memberId })
      .then((res) => {
        toast.success(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleLeaveGroup = (groupId) => {
    leaveGroup(groupId)
      .then((res) => {
        toast.success(res);
      })
      .catch((e) => toast.error(e));
  };

  const handleGroupDeletion = (groupId) => {

    groupDeletion(groupId).then((res) => {
      toast.success(res);
      getGroups().then((res) => dispatch(setGroupList(res)));
    }).catch((err) => toast.error(err));

  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-gray-800 border-none">
          {" "}
          <BsFillInfoCircleFill
            size={23}
            className="text-zinc-200  transition-all duration-200"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-gray-900  max-h-[80vw]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="w-full border border-purple-500"></div>
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-xl leading-none text-white ">
                {selectGroup?.groupName}
              </h4>
              {userInfo._id === selectGroup?.groupAdmin ? (
                <Button onClick={() => handleGroupDeletion(chatId)}>Delete Group</Button>
              ) : (
                <Button
                  onClick={() => handleLeaveGroup(chatId)}
                  className="text-sm text-slate-200 bg-red-500 hover:bg-red-600 transition-all duration-300 px-3 py-1"
                >
                  Leave
                </Button>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <p className="text-lg text-zinc-300 font-semibold">Members</p>
                <AddMembers chatId={chatId} />
              </div>
              <div className="h-[60vh] overflow-y-auto">
                {selectGroup?.participants.map((p) => (
                  <div
                    key={p?._id}
                    className="flex justify-between items-center p-3 border-b border-b-purple-400 text-white"
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-4 items-center">
                        <div>
                          <Image
                            src={p?.avatar}
                            height={20}
                            width={20}
                            alt={`image-${p._id}`}
                            className="rounded-full h-12 w-12"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-xl ">
                            {p?.username}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            {p?.email}
                          </div>
                        </div>
                      </div>
                      <div>
                        {selectGroup?.groupAdmin === userInfo?._id &&
                          selectGroup?.groupAdmin !== p?._id && (
                            <Button
                              onClick={() => {
                                handleRemoveMember(p?._id);
                              }}
                              className={
                                "bg-red-500 hover:bg-red-600 p-0 h-6 w-8"
                              }
                            >
                              <span>
                                <Minus />
                              </span>
                            </Button>
                          )}
                      </div>
                    </div>

                    <div>
                      {selectGroup?.groupAdmin === p?._id && (
                        <MdAdminPanelSettings
                          size={25}
                          className="text-purple-500"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GroupInfoPopOver;
