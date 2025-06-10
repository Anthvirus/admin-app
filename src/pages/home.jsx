import { Link } from "react-router-dom";
import ServiceImage from "../assets/services.jpg";
import NaconLogo from "../assets/Nacon.png";

export default function HomePage() {
  return (
    <>
      <div className="w-full flex max-h-full">
        <img src={ServiceImage} alt="" className="max-w-2/3 min-h-full" />
        <div className="flex items-center w-full flex-col bg-[var(--Accent)] text-[var(--Primary)]">
          <img src={NaconLogo} alt="" className=" size-56" />
          <h1 className="text-2xl my-12 font-semibold">Welcome, please select a view</h1>
          <div className="flex flex-col gap-6 items-center">
            <Link to="/overview" className="flex justify-center bg-[var(--Secondary)] text-[var(--Accent)] delay-[.125s] duration-300 items-center p-12 rounded-xl shadow-xl hover:scale-105 cursor-pointer">
              <p className="text-2xl font-bold">Overview Mode</p>
            </Link>
            <Link to="/login" className="bg-[var(--Secondary)] text-[var(--Accent)] p-16 rounded-xl shadow-xl justify-center delay-[.125s] duration-300 items-center flex hover:scale-105 cursor-pointer">
              <p className="text-2xl font-bold">Admin Mode</p>
            </Link>
                        <Link to="/admin" className="bg-[var(--Secondary)] text-[var(--Accent)] p-16 rounded-xl shadow-xl justify-center delay-[.125s] duration-300 items-center flex hover:scale-105 cursor-pointer">
              <p className="text-2xl font-bold">Admin Page</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
