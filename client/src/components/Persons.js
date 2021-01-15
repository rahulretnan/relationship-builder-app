import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPerson } from "../actions/index";
import { Row, Col, Layout, Form, Input, Button, Table } from "antd";

const Persons = () => {
  const persons = useSelector((state) => state.persons);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const setChange = async () => {
    await setData(persons);
  };

  useEffect(() => {
    setChange();
  }, [persons]);

  const onFinish = async (values) => {
    await dispatch(createPerson(values));
    setData(persons);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "Sl.No",
      dataIndex: "key",
      key: "key",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
  ];

  return (
    <Layout className="layout">
      <Row style={{ marginBottom: "30px" }}>
        <Col span={24}>
          <h2>Person</h2>
          <Form
            form={form}
            style={{ justifyContent: "center" }}
            layout="inline"
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              style={{ width: "60%" }}
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input a name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Person
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            bordered
            pagination={{ pageSize: 10 }}
            columns={columns}
            dataSource={data}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Persons;
