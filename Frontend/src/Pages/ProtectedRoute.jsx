import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { message, Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../API/user";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/loaderSlice";
import { setUser } from "../Redux/userSlice";

function ProtectedRoute({ children, allowedRoles }) {
  const LoggedUser = useSelector((state) => state.users.user); // pick user directly
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authorized, setAuthorized] = useState(null);

  // 🔹 Hydrate Redux from localStorage on mount
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const parsedUser = JSON.parse(userStr);
        dispatch(setUser(parsedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  // 🔹 Fetch user from API and validate role
  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();

      //localStorage.setItem("user", JSON.stringify(response.user)); // keep storage in sync
      dispatch(setUser(response.user));

      if (allowedRoles.includes(response.user.role)) {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    } catch (error) {
      dispatch(setUser(null));
      localStorage.removeItem("user");
      setAuthorized(false);
      message.error(error.message);
      navigate("/login");
    } finally {
      dispatch(hideLoading());
    }
  };

  // 🔹 Run validation only on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthorized(false);
      navigate("/login");
      return;
    }
    getValidUser();
  }, [allowedRoles]);

  if (authorized === null) {
    return <div>Loading...</div>; // spinner
  }

  if (authorized === false) {
    return (
      <div style={{ padding: 24, textAlign: "center", marginTop: 50 }}>
        <h1>403 - Not Authorized</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  // Authorized === true
  return (
    <Layout>
      <Header
        className="d-flex justify-content-between"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <h3 className="demo-logo text-white m-0">Book Our Show</h3>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ minWidth: "400px" }}
          items={[
            {
              label: `${LoggedUser?.name || ""}`,
              key: "user-menu",
              icon: <UserOutlined />,
              children: [
                {
                  label: (
                    <span
                      onClick={() => {
                        if (LoggedUser?.isAdmin) {
                          navigate("/admin");
                        } else if (LoggedUser?.isPartner) {
                          navigate("/partner");
                        } else {
                          navigate("/profile");
                        }
                      }}
                    >
                      My Profile
                    </span>
                  ),
                  key: "profile",
                  icon: <ProfileOutlined />,
                },
                {
                  label: (
                    <Link
                      to="/login"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        dispatch(setUser(null));
                      }}
                    >
                      Log Out
                    </Link>
                  ),
                  key: "logout",
                  icon: <LogoutOutlined />,
                },
              ],
            },
          ]}
        />
      </Header>
      <div style={{ padding: 24, height: "90vh", background: "#fff" }}>
        {children}
      </div>
    </Layout>
  );
}

export default ProtectedRoute;