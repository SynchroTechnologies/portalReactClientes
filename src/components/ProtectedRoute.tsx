import { Link, Navigate, Outlet } from "react-router-dom";

export const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <nav>
        <Link to="/settings">Settings</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
};
function useAuth(): { user: any } {
  throw new Error("Function not implemented.");
}
