import { Card, Button, Calendar, List } from "antd";
import { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const tableWrapper = document.querySelector(".table-container");
    if (tableWrapper) {
      tableWrapper.style.overflowX = "hidden";
    }
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <Card
            title="ภาพรวมการอบรม"
            className="rounded-md shadow-md"
            extra={<Button type="primary">ดูทั้งหมด</Button>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-gray-100">
                <p className="text-center text-lg">หลักสูตรล่าสุด</p>
                <p className="text-center text-2xl font-bold">00</p>
              </Card>
              <Card className="bg-gray-100">
                <p className="text-center text-lg">หน้าการอบรม</p>
                <p className="text-center text-2xl font-bold">00</p>
              </Card>
              <Card className="bg-gray-100">
                <p className="text-center text-lg">ยังไม่ทำ</p>
                <p className="text-center text-2xl font-bold">00</p>
              </Card>
            </div>
          </Card>

          {/* หลักสูตรแนะนำ */}
          <Card
            title="หลักสูตรแนะนำ"
            className="rounded-md shadow-md"
            extra={<Button type="primary" onClick={()=>navigate("/courses")}>หลักสูตรทั้งหมด</Button>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-gray-50">หลักสูตร 1</Card>
              <Card className="bg-gray-50">หลักสูตร 2</Card>
              <Card className="bg-gray-50">หลักสูตร 3</Card>
            </div>
          </Card>
        </div>

        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <Card title="ปฏิทิน" className="rounded-md shadow-md">
            <Calendar
              fullscreen={false}
              headerRender={({ value, onChange }) => {
                return (
                  <div className="flex items-center justify-between p-2">
                    <Button
                      onClick={() =>
                        onChange(value.clone().subtract(1, "month"))
                      }
                      icon={<LeftOutlined />}
                    />
                    <div className="text-lg font-semibold">
                      {value.format("MMMM YYYY")}
                    </div>
                    <Button
                      onClick={() => onChange(value.clone().add(1, "month"))}
                      icon={<RightOutlined />}
                    />
                  </div>
                );
              }}
            />
          </Card>

          <Card title="กำหนดการวันนี้" className="rounded-md shadow-md">
            <List
              dataSource={[
                "09:00 - 10:00 อบรม A",
                "10:30 - 12:00 อบรม B",
                "13:00 - 15:00 อบรม C",
              ]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
