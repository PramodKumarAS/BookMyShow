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

function ProtectedRoute({ children, allowedRoles }) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null); // null = loading

  // Mock user for menu, better to get from state or localStorage parsed user
  // You can improve this to get from localStorage as below
  let user;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const navItems = [
    {
      label: `Pramod`,
      key: "user-menu",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                if (user?.isAdmin) {
                  navigate("/admin");
                } else if (user?.isPartner) {
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
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      setAuthorized(false);
      return;
    }

    let parsedUser = null;
    try {
      parsedUser = JSON.parse(userStr);
    } catch (e) {
      console.error("Failed to parse user from localStorage", userStr);
      localStorage.removeItem("user");
      setAuthorized(false);
      return;
    }

    if (!allowedRoles.includes(parsedUser.role)) {
      setAuthorized(false);
      return;
    }

    // user is authorized
    setAuthorized(true);
  }, [allowedRoles]);   

  if (authorized === null) {
    // loading state, you can return a spinner here
    return null;
  }

  if (authorized === false) {
    // Instead of redirecting, just show a message on UI
    return (
        <div style={{ padding: 24, textAlign: 'center', marginTop: 50 }}>
        <h1>403 - Not Authorized</h1>
        <p>You do not have permission to view this page.</p>
        </div>
    );
  }

  // authorized === true: render children inside layout
  return (
    <div style={{ width: "100%", margin: 0, padding: 0 }}>
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
          <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
            Book Our Show
          </h3>
          <Menu
            theme="dark"
            mode="horizontal"
            items={navItems}
            style={{ minWidth: "400px" }}
          />
        </Header>
        <div
          style={{ padding: 24, height: "90vh", width: "100%", background: "#fff" }}
        >
          {children}
        </div>
      </Layout>
    </div>
  );
}

export default ProtectedRoute;
