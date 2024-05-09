import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import { FaStar } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { Login } from "../Pages/Login";

const avtar =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGDohX4qAelLzi3t8vCfqccDFxifY-huxkmRrgnSRoig&s";

export default function Navbar() {
  const { isLoggedIn, user, getWatchlist } = CryptoState();
  const [watchList, setWatchlist] = useState([]);
  let imgUrl = user?.photoURL || avtar;

  if(user?.photoURL === null){
    imgUrl = avtar;
  }
  if (isLoggedIn) {
    getWatchlist().then((data) => {
      if (data) {
        setWatchlist(data);
      }
    });
  }

  return (
    <>
      <div className="navbar bg-neutral h-10 border-b">
        <div className="flex-1">
          <Link to="/" className=" flex justify-center items-center">
            <img src={logo} className="w-40" alt="" />
          </Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <FaStar size={25} />
                <span className="badge badge-sm indicator-item">
                  {watchList && watchList.length}{" "}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {watchList && watchList.length} Items
                </span>
                <ul>
                  {watchList &&
                    watchList.map((item) => (
                      <li key={item}>
                        <div className="badge badge-primary my-1">{item}</div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          {isLoggedIn ? (
            <div className="drawer drawer-end z-50">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label htmlFor="my-drawer-4" className=" drawer-button">
                  {" "}
                  <div className="w-10 rounded-full">
                    <img
                      className="rounded-full"
                      src={imgUrl}
                    />
                  </div>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu p-4 w-[70vw] md:w-80 min-h-full bg-base-200 text-base-content">
                  {/* Sidebar content here */}
                  <div className="pt-5">
                    <div className="flex items-center flex-col gap-y-2 ">
                      <img
                        className="rounded-full w-24 border-2"
                        src={imgUrl}
                      />
                      <h3 className=" font-gil  text-xl">{user?.displayName}</h3>
                      <h3>{user?.email} </h3>
                    </div>
                  </div>
                  <li className="text-sm">
                  
                  </li>
                
                  <Logout />
                </ul>
                
              </div>
            </div>
          ) : (
            <a className=" mx-3">
              <Login />
            </a>
          )}
        </div>
      </div>
    </>
  );
}

// Logout Button  Component
const Logout = () => {
  const { firebaseAuth, setIsLogin } = CryptoState();
  function signOutHandel() {
    signOut(firebaseAuth)
      .then(() => {
        setIsLogin(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
 
        Logout
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are Your Sure Logout!</h3>
          <p className="py-4">
            If Your Account is Logout, You will not be able to access your
            account then you have to login again.
          </p>
          <div className="modal-action">
            <form method="dialog ">
              <button className="btn mx-4">Close</button>
              <button onClick={signOutHandel} className="btn bg-red-500">Logout</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
