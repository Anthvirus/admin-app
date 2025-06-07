import { Link } from "react-router-dom";
import ServiceImage from "../assets/services.jpg";
import NaconLogo from "../assets/Nacon.png";

export default function HomePage() {
  return (
    <>
      <div className="w-full flex">
        <img src={ServiceImage} alt="" className="max-w-5/6 h-full" />
        <div className="flex items-center w-full flex-col bg-[var(--Accent)] text-[var(--Primary)]">
          <img src={NaconLogo} alt="" className=" size-56" />
          <h1 className="text-2xl my-12 font-semibold">Welcome, please select a view</h1>
          <div className="flex flex-col gap-6">
            <Link to="/overview" className="flex justify-center bg-[var(--Secondary)] text-[var(--Accent)] delay-[.125s] duration-300 items-center w-96 h-48 rounded-xl shadow-xl hover:scale-105 cursor-pointer">
              <p className="text-xl font-bold">Overview Mode</p>
            </Link>
            <Link to="/login" className="w-96 bg-[var(--Secondary)] text-[var(--Accent)] h-48 rounded-xl shadow-xl justify-center delay-[.125s] duration-300 items-center flex hover:scale-105 cursor-pointer">
              <p className="text-xl font-bold">Admin Mode</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
