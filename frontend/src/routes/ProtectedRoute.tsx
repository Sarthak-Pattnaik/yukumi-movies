import {
  Navigate,
} from "react-router-dom";

import  { useAuthStore } from "../store/authStore";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({
  children,
}: Props) => {

  const {
    isAuthenticated,
    loading,
  } = useAuthStore();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" />
    );
  }

  return children;
};

export default ProtectedRoute;