import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { useSession, signOut } from "next-auth/client";


function Header() {
  const [session] = useSession();
  return (
    <div className="flex items-center sticky top-0 z-50 px-4 py-2 shadow-md bg-white">
      <Button
        color="gray"
        buttonType="outline"
        size="regular"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="w-20 h-20 border-0"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="5xl" color="blue" />
      <h1 className="ml-2 text-gray-700 text-2xl">Docs</h1>
      <div className="flex flex-grow mx-5 md:mx-20 items-center bg-gray-100 px-5 py-2  rounded-lg text-gray-600 focus-within:shadow-md  ">
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="px-5 bg-transparent text-sm outline-none flex-grow"
        />
      </div>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="w-20 h-20 border-0"
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>
      <img
        onClick={signOut}
        loading="lazy"
        src={session?.user?.image}
        alt=""
        className="h-10 w-10 rounded-full cursor-pointer"
      />
    </div>
  );
}

export default Header;
