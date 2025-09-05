import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Layout, Menu, Spin, Typography } from "antd";
import { LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../API/user";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/loaderSlice";
import { setUser } from "../Redux/userSlice";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

function ProtectedRoute({ children, allowedRoles }) {
  const LoggedUser = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authorized, setAuthorized] = useState(null);

  // Hydrate Redux from localStorage on mount
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

  // Fetch user from API and validate role
  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();
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
    return (
      <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Spin size="large" tip="Validating user..." />
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        <Title level={2} style={{ color: "#ff4d4f" }}>403 - Not Authorized</Title>
        <Paragraph>You do not have permission to view this page.</Paragraph>
      </div>
    );
  }

  // Authorized === true
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          background: "linear-gradient(90deg, #0d0d0d, #1a1a1a, #3a0ca3, #7209b7)", // 🎨 gradient
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        <h2
          style={{
            color: "#fff",
            margin: 0,
            fontWeight: "bold",
            letterSpacing: "1px",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          🎬 Book Our Show
        </h2>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            borderBottom: "none",
            background: "transparent", // transparent to let gradient show
          }}
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
      <Content style={{ padding: "24px", background: "#0f0f0f" }}>
        <div
          style={{
            background: "#cedcd8ff",
            padding: 24,
            borderRadius: 12,
            minHeight: "80vh",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            color: "#000000ff",
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}

export default ProtectedRoute;
