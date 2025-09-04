import React, { useState } from "react";
import { Card, Avatar, Tabs, List, Button, Form, Input } from "antd";
import { UserOutlined, SettingOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getAllBookings } from "../API/book";

const { TabPane } = Tabs;

const Profile = () => {
  const [user, setUser] = useState({
    avatar: null,
  });

  const users = useSelector((state)=>state.users);

  const getallBooking = ()=>{
        
    const at =  getAllBookings();
    console.log(at);
  };

  const bookings = [
    { id: 1, movie: "Jawan", date: "2025-09-05", seats: ["A1", "A2"] },
    { id: 2, movie: "Leo", date: "2025-08-20", seats: ["B5"] },
    { id: 3, movie: "Pushpa 2", date: "2025-08-10", seats: ["C3", "C4"] },
  ];

  const onFinish =async (values) => {
        const at =await  getAllBookings();
        console.log(at.data);

    //setUser({ ...user, ...values });
  };

  return (
    <div style={{ maxWidth: 800, margin: "20px auto" }}>
      {/* Profile Card */}
      <Card style={{ marginBottom: 20 }}>
        <Card.Meta
          avatar={<Avatar size={64} icon={<UserOutlined />} src={user.avatar} />}
          title={users.user.name}
          description={users.user.email}
        />
      </Card>

      {/* Tabs for profile sections */}
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
                actions={[<Button type="link">View Ticket</Button>]}
              >
                <List.Item.Meta
                  title={item.movie}
                  description={`Date: ${item.date} | Seats: ${item.seats.join(", ")}`}
                />
              </List.Item>
            )}
          />
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Change the theme
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
