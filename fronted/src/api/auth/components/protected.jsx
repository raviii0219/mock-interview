import { Navigate } from "react-router";

export default function Protected({ children }) {

    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}