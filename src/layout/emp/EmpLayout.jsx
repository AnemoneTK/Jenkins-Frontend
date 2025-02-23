import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
// icon ทั้งหมด

const { Content } = Layout;
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";

import { useUser } from "../../contexts/UserContext";

export default function EmpLayout({ children }) {
  const URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const {
    token: { borderRadiusLG },
    // token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  // const [collapsedWidth, setCollapsedWidth] = useState(80);

  const { userData, setUserData } = useUser();

  useEffect(() => {
    if (!userData) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.post(
        `${URL}/auth/auth`,
        { role: "employee" },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setUserData(response.data.userData);
      }
    } catch (error) {
      const errorResponse = error.response;
      console.log("errorResponse", errorResponse);
      Swal.fire({
        title: `${errorResponse.data.message}`,
        text: `${errorResponse.data.detail}`,
        icon: `${errorResponse.status === 500 ? "error" : "warning"}`,
        confirmButtonText: "ตกลง",
      }).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      <Layout
        style={{ minHeight: "100vh", minWidth: "100dvw" }}
        className="flex flex-col "
      >
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout style={{ display: "flex", flexDirection: "row" }}>
          {/* <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            breakpoint="lg"
            collapsedWidth={collapsedWidth}
            trigger={null}
            width={200}
            style={{
              background: colorBgContainer,
            }}
          >
            <div className="flex-column items-start h-full ">
              <div className=" h-2/4  overflow-y-auto">
                <Menu
                  theme="light"
                  mode="inline"
                  items={items}
                  selectedKeys={[selectedKey]}
                />
              </div>
            </div>
          </Sider> */}
          <div className="flex flex-col ">
            <Content
              style={{
                // background: colorBgContainer,
                borderRadius: borderRadiusLG,
                flex: 1,
                overflowY: "auto",
              }}
              className=" p-[24px] md:px-[60px] w-screen bg-bg"
            >
              {children}
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  );
}

EmpLayout.propTypes = {
  children: PropTypes.node,
};
