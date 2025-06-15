import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button.jsx";
import { UrlState } from "../context.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { LinkIcon, LogOut } from "lucide-react";
import useFetch from "../hooks/use-fetch.jsx";
import { logout } from "../db/apiAuth.js";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  console.log("User metadata:", user?.user_metadata);
  const { loading, fn: fnLogout } = useFetch(logout);

  return (
    <>
      <header className="w-full bg-transparent py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              className="h-20 md:h-24 object-contain"
              alt="Sniprr Logo"
            />
          </Link>
          <div>
            {!user ? (
              <Button
                className="cursor-pointer"
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full overflow-hidden">
                  <Avatar>
                    <AvatarImage
                      src={user?.user_metadata?.profile_pic}
                      className="object-contain"
                    />
                    <AvatarFallback>
                      <img
                        src="https://github.com/shadcn.png"
                        alt="Image"
                        className=" border-2 border-blue-400 object-cover hover:scale-105 rounded-4xl"
                      />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user?.user_metadata?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/dashboard" className=" flex">
                      <LinkIcon className=" mr-2 h-4 w-4" />
                      <span>My Links</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span
                      onClick={() => {
                        fnLogout().then(() => {
                          fetchUser();
                          navigate("/");
                        });
                      }}
                    >
                      Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
