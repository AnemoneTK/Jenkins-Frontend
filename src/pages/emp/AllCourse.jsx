import { useEffect, useState } from "react";
import { Card, Button, Input, Row, Col, message, Tag } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import callApi from "../../utils/axios";
import RegisterModal from "../../components/RegisterModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function AllCourse() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [courses, setCourses] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseID, setCourseID] = useState(null);

  useEffect(() => {
    if (!isModalVisible) {
      getCourses();
    }
  }, [isModalVisible]);
  useEffect(() => {
    console.log("courses", courses);
  }, [courses]);

  const getCourses = async () => {
    try {
      const response = await callApi({
        path: "/api/course/get_course",
        method: "post",
        value: {},
      });

      // ตรวจสอบว่า response มีข้อมูลหรือไม่
      if (response && response.data) {
        setCourses(response.data);
      } else {
        message.error("ไม่สามารถดึงข้อมูลหลักสูตรได้");
      }
    } catch (error) {
      console.log("error", error);
      message.error("เกิดข้อผิดพลาดในการดึงข้อมูลหลักสูตร");
      if (error.statusCode === 401) {
        Swal.fire({
          title: `${error.message}`,
          icon: `${error.icon}`,
          confirmButtonText: "ตกลง",
        }).then(() => {
          navigate("/");
        });
      }
    }
  };

  // ฟังก์ชันเปิด Modal
  const openModal = (id) => {
    setCourseID(id);
    setIsModalVisible(true);
  };

  // ฟังก์ชันปิด Modal
  const closeModal = () => {
    setIsModalVisible(false);
    setCourseID(null);
  };

  // ฟังก์ชันค้นหาหลักสูตร
  const filteredCourses = courses?.data?.filter((course) =>
    course.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="p-4 max-w-full ">
        {/* Back Button */}
        <div className="flex items-center mb-7 relative">
          <Button
            icon={<LeftOutlined />}
            size="large"
            className="mr-4 border-none absolute left-0"
            onClick={() => window.history.back()} // Go back functionality
          >
            ย้อนกลับ
          </Button>
          <h1 className="text-2xl font-bold text-center w-full">
            หลักสูตรทั้งหมด
          </h1>
        </div>

        {/* Search Bar */}
        <Input
          className="mb-4"
          placeholder="ค้นหาหลักสูตร"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Courses List */}
        <div className="bg-white shadow-md py-5 px-2 flex justify-around overflow-y-auto max-h-[75dvh] custom-scrollbar">
          <Row gutter={[16, 16]} className="w-full">
            {filteredCourses?.map((course, index) => (
              <Col xs={24} sm={24} md={12} lg={6} key={index}>
                <Card
                  title={<div className=" text-wrap">{course.title}</div>}
                  bordered={false}
                  className="shadow-md w-full border p-0"
                  extra={
                    <Tag color={course.availabilityStatus ? "cyan" : "red"}>
                      {course.availabilityStatus ? "ว่าง" : "เต็ม"}
                    </Tag>
                  }
                >
                  {course.banner && (
                    <div className="relative mb-4 border border-black  border-opacity-30  rounded-md">
                      <img
                        src={course.banner}
                        alt="Course Banner"
                        className="w-full h-1/5 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-5 text-sm text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {course?.tag?.map((item, index) => (
                        <Tag key={index}>{item.name}</Tag>
                      ))}
                    </div>
                    <span>{course.type}</span>
                    <span>{course.participants}</span>
                  </div>
                  <div className="mt-2 text-gray-500">{course.duration}</div>
                  <Button
                    size="small"
                    type="primary"
                    className="w-full"
                    onClick={() => openModal(course._id)}
                  >
                    ดูรายละเอียด
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Register Modal */}
      <RegisterModal
        visible={isModalVisible}
        onClose={closeModal}
        courseID={courseID}
      />
    </div>
  );
}
