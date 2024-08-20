import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../service/authservice";
import { logout } from "../../slice/authSlice";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Write",
      slug: "/addpost",
      active: authStatus,
    },
  ];

  const handleLogoutClick = async () => {
    try {
      const logoutService = await authService.logout();
      if (logoutService) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      throw (error.message)
    }
  };
  return (
    <header className="">
      <div className="navbar border-b-2 border-slate-700 text-white bg-base-100 flex w-full justify-between px-[80px]">
        <Link className="btn btn-ghost text-xl">MyBlog</Link>

        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.slug}>
                  <Link to={item.slug}>{item.name}</Link>
                </li>
              ) : null
            )}
          </ul>
        </div>
        {authStatus && (
          <div onClick={handleLogoutClick} className="navbar-end">
            <Link className="/">Log Out</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
