import "../Login.css";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../API/user";
import { jwtDecode } from "jwt-decode";

const { Title } = Typography;

const API_KEY = "51fc1a83636c535ec99bf2ef905e26ee";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Login() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const [messageApi, context] = message.useMessage();

  const onFinishLoginForm = async (values) => {
    try {
      const response = await loginUser(values);

      if (response.success) {
        messageApi.success("Logged In successfully!");
        localStorage.setItem("token", response.token);

        const decodedToken = jwtDecode(response.token);
        localStorage.setItem("user", JSON.stringify(decodedToken));

        if (response.role === "Admin") return navigate("/admin");
        if (response.role === "Partner") return navigate("/partner");

        navigate("/user");
      } else {
        messageApi.error("Invalid email or password!");
      }
    } catch (error) {
      messageApi.error("Something went wrong!");
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const posters = data.results
          .filter((m) => m.poster_path)
          .map((movie) => `${IMAGE_BASE_URL}${movie.poster_path}`);
        setImages(posters);
      })
      .catch((err) => console.error("Error fetching TMDB:", err));
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <div className="login-container">
      {context}
      {/* Left carousel */}
      <div className="carousel-column">
        {images.length > 0 && (
          <img
            src={images[currentImage]}
            alt="carousel-left"
            className="carousel-image"
          />
        )}
      </div>

      {/* Center login form */}
      <div className="login-center">
        <div className="login-box">
          <Title level={2} className="login-title">
            🎬 BookMyShow Login
          </Title>
          <Form layout="vertical" onFinish={onFinishLoginForm} autoComplete="off">
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="login-btn">
                Login
              </Button>
            </Form.Item>
          </Form>

          <p className="login-links">
            New user? <Link to="/register">Register</Link> |{" "}
            <Link to="/forget">Forgot Password?</Link>
          </p>
        </div>
      </div>

      {/* Right carousel */}
      <div className="carousel-column">
        {images.length > 0 && (
          <img
            src={images[(currentImage + 1) % images.length]}
            alt="carousel-right"
            className="carousel-image"
          />
        )}
      </div>
    </div>
  );
}
