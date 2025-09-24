import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../Redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../API/movies";
import { message, Row, Col, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const User = () => {
  const user = useSelector((state) => state.users);
  const [movies, setMovies] = useState(null);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.movies);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={24} lg={12}>
          <Input
            placeholder="Type here to search for movies"
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
          <br />
          <br />
          <br />
        </Col>
      </Row>

      <Row
        className="justify-content-center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {movies &&
          movies
            .filter((movie) =>
              movie.movieName
                ?.toLowerCase()
                .includes(searchText.toLowerCase())
            )
            .map((movie) => (
              <Col
                className="gutter-row mb-5"
                key={movie._id}
                xs={24}   // full width on extra small screens
                sm={12}   // 2 per row on small screens
                md={8}    // 3 per row on medium screens
                lg={6}    // 4 per row on large screens
              >
                <div className="text-center">
                  <img
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${new Date()
                          .toISOString()
                          .split("T")[0]}`
                      );
                    }}
                    className="cursor-pointer object-cover"
                    src={movie.poster}
                    alt="Movie Poster"
                    width={200}
                    height={300}
                    style={{ borderRadius: "8px" }}
                  />
                  <h3
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${new Date()
                          .toISOString()
                          .split("T")[0]}`
                      );
                    }}
                    className="cursor-pointer"
                  >
                    {movie.movieName}
                  </h3>
                </div>
              </Col>
            ))}
      </Row>
    </>
  );
};

export default User;
