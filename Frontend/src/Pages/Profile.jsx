import React, { useState, useEffect } from "react";
import { Card, Avatar, Tabs, List, Button, Form, Input, message, Modal } from "antd";
import { UserOutlined, SettingOutlined, VideoCameraOutlined,MailOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getAllBookings } from "../API/book";

const { TabPane } = Tabs;

const Profile = () => {
  const users = useSelector((state) => state.users);

  const [user, setUser] = useState({
    avatar: "https://tse2.mm.bing.net/th/id/OIP.LJq0q7abuN6zg3U3EiWj2QAAAA?pid=Api&P=0&h=180",
    name: users.user.name,
    email: users.user.email,
  });

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch bookings from API on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAllBookings();
        if (response && response.data) {
          setBookings(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const onFinish = async (values) => {
    setUser({ ...user, ...values });
    message.success({
      content: "Profile updated successfully!",
      duration: 2,
    });
  };

  const showTicket = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      {/* Profile Card */}
      <Card style={{ marginBottom: 20 }}>
        <Card.Meta
          avatar={<Avatar size={64} icon={<UserOutlined />} src={user.avatar} />}
          title={user.name}
          description={user.email}
        />
      </Card>

      {/* Tabs */}
      <Tabs defaultActiveKey="1">
        {/* My Bookings */}
        <TabPane
          tab={
            <span>
              <VideoCameraOutlined />
              My Bookings
            </span>
          }
          key="1"
        >
          <List
            itemLayout="horizontal"
            dataSource={bookings}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => showTicket(item)}>
                    View Ticket
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={item.show.movie?.movieName}
                  description={`Date: ${item.show.date.split("T")[0]} | Seats: ${item.seats?.join(", ")}`}
                />
              </List.Item>
            )}
          />

          {/* Ticket Modal */}
          <Modal
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={[
              <Button key="close" onClick={handleModalClose}>
                Close
              </Button>,
            ]}
            title="Booking Details"
          >
            {selectedBooking && (
              <Card>
                <p>
                  <strong>Movie:</strong> {selectedBooking.show.movie?.movieName}
                </p>
                <p>
                  <strong>Date:</strong> {selectedBooking.show.date.split("T")[0]}
                </p>
                <p>
                  <strong>Seats:</strong> {selectedBooking.seats?.join(", ")}
                </p>
                <p>
                  <strong>User:</strong> {user.name}
                </p>
              </Card>
            )}
          </Modal>
        </TabPane>

        {/* Settings */}
        <TabPane
          tab={
            <span>
              <SettingOutlined />
              Settings
            </span>
          }
          key="2"
        >
          <Form
            layout="vertical"
            initialValues={{ name: user.name, email: user.email }}
            onFinish={onFinish}
            style={{ maxWidth: 400 }}
          >
            <Form.Item label={<span style={{ color: "#000" }}>Name</span>} name="name">
              <Input prefix={<UserOutlined />} style={{ color: "#000" }} />
            </Form.Item>

            <Form.Item label={<span style={{ color: "#000" }}>Email</span>} name="email">
              <Input prefix={<MailOutlined />} style={{ color: "#000" }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
