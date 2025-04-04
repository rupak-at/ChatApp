import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { FaImage } from "react-icons/fa6";
import Image from "next/image";

const UserUpdateDetails = () => {
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewURl, setPreviewUrl] = useState(null);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  //different userForm for account and password so that they can be validated separately
  const {
    register: registerAccount,
    handleSubmit: handleAccountSubmit,
    formState: { errors: errorsAccount, isSubmitting: isSubmittingAccount },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: errorsPassword, isSubmitting: isSubmittingPassword },
  } = useForm();

  const handleUser = async (data) => {
    const { username } = data;
    try {
      const formData = new FormData();

      if (userInfo.username !== username) {
        await axios.post(
          "http://localhost:4000/updateUserName",
          { username },
          { withCredentials: true }
        );
      }

      if (avatarFile) {
        formData.append("avatar", avatarFile);
        await axios.post("http://localhost:4000/updateAvatar", formData, {
          withCredentials: true,
        });
      }
      toast.success("Profile Updated Successfully");

      await axios.post(
        "http://localhost:4000/logout",
        {},
        { withCredentials: true }
      );

      router.push("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handlePassword = async (data) => {
    try {
      await axios.post("http://localhost:4000/updatePassword", data, {
        withCredentials: true,
      });
      toast.success("Password Updated Successfully");
      await axios.post(
        "http://localhost:4000/logout",
        {},
        { withCredentials: true }
      );
      router.push("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Tabs defaultValue="account" className="w-[400px] ">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className={"bg-gray-800 text-slate-100 border-none rounded-none"}>
          <CardHeader>
            <CardTitle className={"text-2xl"}>Account</CardTitle>
            <CardDescription className={"text-sm text-gray-400"}>
              Make changes to your account here. Click save when you're done and
              you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleAccountSubmit(handleUser)}
              className="space-y-2"
            >
              <div className="space-y-1">
                <Input
                  value={userInfo.email}
                  disabled
                  className={"outline-none focus:border-none"}
                />
              </div>
              <div className="space-y-1">
                <Input
                  {...registerAccount("username")}
                  defaultValue={userInfo.username}
                  placeholder={"Username"}
                  className={"outline-none focus:border-none"}
                />
              </div>
              <div className="space-y-1">
                    <div className="flex flex-col ">
                       <label htmlFor="avatar" className="relative cursor-pointer group">
                         <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-purple-500 flex items-center justify-center bg-gray-200 transition hover:opacity-90">
                           {previewURl ? (
                             <Image
                               height={96}
                               width={96}
                               src={previewURl || null}
                               alt="Avatar Preview"
                               className="h-full w-full object-cover"
                             />
                           ) : (
                             <FaImage className="text-gray-500 text-3xl" />
                           )}
                         </div>
                         <input
                           type="file"
                           id="avatar"
                           accept="image/*"
                           className="hidden"
                           onChange={(e) => {
                             const file = e.target.files[0];
                             setAvatarFile(file);
                             if (file) {
                               setPreviewUrl(URL.createObjectURL(file));
                             }
                           }}
                         />
                       </label>
                     </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmittingAccount}
                className={
                  "bg-indigo-950 text-slate-100 hover:text-slate-300 transition-all duration-200 hover:bg-indigo-950"
                }
              >
                {isSubmittingAccount ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className={"bg-gray-800 text-slate-100 border-none rounded-none"}>
          <CardHeader>
            <CardTitle className={"text-2xl"}>Password</CardTitle>
            <CardDescription className={"text-sm text-gray-400"}>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handlePasswordSubmit(handlePassword)}
              className="space-y-2"
            >
              <div className="space-y-1">
                <Input
                  {...registerPassword("oldPassword")}
                  type="password"
                  placeholder={"Current password"}
                />
              </div>
              <div className="space-y-1">
                <Input
                  {...registerPassword("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  placeholder={"New password"}
                />
                <div className="text-red-500 text-sm ml-1">
                  {errorsPassword.newPassword?.message}
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmittingPassword}
                className={
                  "bg-indigo-950 text-slate-100 hover:text-slate-300 transition-all duration-200 hover:bg-indigo-950"
                }
              >
                {isSubmittingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default UserUpdateDetails;
