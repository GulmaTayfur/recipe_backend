import { NavLink } from "react-router-dom";
import { links } from "../constants";
NavLink;

const Sidebar = () => {
  return (
    <aside className="flex flex-col h-screen justify-between items-center p-3 max-md:p-2 max-md:gap-20 lg:p-10 max-md:justify-normal">
      <img
        className="w-[150px] max-md:w-[90px]"
        src="/recipe_logo.jpg"
        alt="logo"
      />
      <div className="flex flex-col gap-20">
        {links.map((item) => (
          <NavLink
            key={item.title}
            className={"flex gap-4 items-center text-lg text-gray-400"}
            to={item.path}
          >
            <span className="max-md:text-2xl">{item.icon}</span>
            <span className="max-md:hidden">{item.title}</span>
          </NavLink>
        ))}
      </div>
      <div className="flex flex-col gap-2 max-md:hidden">
        <p className="font-semibold ">Günlük Haberleri Al</p>
        <button className="bg-red-500 p-2 rounded-lg text-white hpver:bg-red-400">
          Abone Ol
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
