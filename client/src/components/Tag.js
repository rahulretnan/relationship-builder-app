import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTag, updateTag } from "../actions/index";
import {
  Row,
  Col,
  Layout,
  Form,
  Input,
  Button,
  Table,
  Space,
  Modal,
} from "antd";
import { FormOutlined } from "@ant-design/icons";

const Tags = () => {
  const tags = useSelector((state) => state.tags);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    tag: "",
  });
  const [id, setId] = useState("");
  const setChange = async () => {
    await setData(tags);
  };
  useEffect(() => {
    setChange();
  }, [tags]);

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(updateTag(id, modalData));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    await dispatch(createTag(values));
    setData(tags);
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
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <FormOutlined
            onClick={() => {
              setModalData({ ...modalData, tag: record.tag });
              setId(record._id);
              setIsModalVisible(true);
            }}
            style={{ color: "#33cc33", fontSize: "20px", padding: "0px 10px" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Row style={{ marginBottom: "30px" }}>
        <Col span={24}>
          <h2>Tags</h2>
          <Form
            style={{ justifyContent: "center" }}
            layout="inline"
            name="basic"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              style={{ width: "60%" }}
              label="Tag"
              name="tag"
              rules={[{ required: true, message: "Please input a tag!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Tag
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
      <Modal
        title={"Edit " + modalData.tag + " tag"}
        visible={isModalVisible}
        okText="Update"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label htmlFor="tag">Tag :</label>
        <input
          id="tag"
          name="tag"
          value={modalData.tag}
          onChange={(e) => setModalData({ ...modalData, tag: e.target.value })}
          type="text"
        />
      </Modal>
    </Layout>
  );
};

export default Tags;
