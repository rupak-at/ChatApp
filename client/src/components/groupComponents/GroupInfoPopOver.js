import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { MdAdminPanelSettings } from "react-icons/md";
import { Plus } from "lucide-react";
import AddMembers from "./AddMembers";


const GroupInfoPopOver = ({ selectGroup, chatId }) => {
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
      <PopoverContent className="w-80 bg-zinc-700  border-zinc-900">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="w-full border"></div>
            <div className="flex items-center justify-between">
                <h4 className="font-medium text-xl leading-none text-white ">
                {selectGroup?.groupName}
                </h4>
                <Button className="text-sm text-slate-200 bg-red-500 hover:bg-red-600 transition-all duration-300 px-3 py-1">
                Leave
                </Button>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <p className="text-lg text-zinc-300 font-semibold">Members</p>
                    <AddMembers chatId={chatId} />
                </div>
                <div>
                    {selectGroup?.participants.map((p) => (
                        <div key={p?._id} className="flex justify-between items-center p-3 border-b text-white">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <Image src={p?.avatar} height={20} width={20} alt={`image-${p._id}`} className="rounded-full h-12 w-12"/>
                                </div>
                                <div className="font-bold text-xl ">{p?.username}</div>
                            </div>
                            {selectGroup?.groupAdmin === p?._id && 
                            <MdAdminPanelSettings size={25} className="text-purple-500" />}
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
