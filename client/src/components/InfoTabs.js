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

const UserUpdateDetails = () => {
  const router = useRouter();
  const [avatarFile, setAvatarFile] = useState(null);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
            <form onSubmit={handleSubmit(handleUser)} className="space-y-2">
              <div className="space-y-1">
                <Input
                  value={userInfo.email}
                  disabled
                  className={"outline-none focus:border-none"}
                />
              </div>
              <div className="space-y-1">
                <Input
                  {...register("username")}
                  defaultValue={userInfo.username}
                  placeholder={"Username"}
                  className={"outline-none focus:border-none"}
                />
              </div>
              <div className="space-y-1">
                <Input
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                  type="file"
                  id="avatar"
                  className="file:text-gray-400 file:w-fit file:p-2 border-none focus:outline-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={
                  "bg-indigo-950 text-slate-100 hover:text-slate-300 transition-all duration-200 hover:bg-indigo-950"
                }
              >
                {isSubmitting ? (
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
            <form onSubmit={handleSubmit(handlePassword)} className="space-y-2">
              <div className="space-y-1">
                <Input
                  {...register("oldPassword")}
                  type="password"
                  placeholder={"Current password"}
                />
              </div>
              <div className="space-y-1">
                <Input
                  {...register("newPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type="password"
                  placeholder={"New password"}
                />
                <div className="text-red-500 text-sm ml-1">
                  {errors.newPassword?.message}
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={
                  "bg-indigo-950 text-slate-100 hover:text-slate-300 transition-all duration-200 hover:bg-indigo-950"
                }
              >
                {isSubmitting ? (
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
