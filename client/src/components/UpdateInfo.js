import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserUpdateDetails from "./InfoTabs";

const UpdateInfo = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={
            "bg-indigo-950 text-slate-100  hover:text-slate-200 hover:bg-indigo-950"
          }
        >
          Edit Info
        </Button>
      </SheetTrigger>
      <  SheetTitle/>
      <SheetContent className={"bg-gray-900 text-white font-sans"}>
        <UserUpdateDetails />
        <SheetDescription/>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateInfo;
