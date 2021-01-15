import { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { createRelation } from "../actions/index";
import { Row, Col, Layout, Form, Button, Table, Select } from "antd";

const SetRelation = () => {
  const { Option } = Select;
  const relations = useSelector((state) => state.relations, shallowEqual);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const persons = useSelector((state) => state.persons, shallowEqual);
  const tags = useSelector((state) => state.tags, shallowEqual);
  const [fperson, setFperson] = useState();
  const [form] = Form.useForm();
  const setChange = async () => {
    await setData(relations);
  };
  useEffect(() => {
    setChange();
  }, [relations]);

  const handleChange = (id) => {
    setFperson(id);
  };

  const onFinish = async (values) => {
    await dispatch(createRelation(values));
    setData(relations);
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
      title: "First Person",
      dataIndex: "fperson",
      key: "fperson",
      align: "center",
    },
    {
      title: "Second Person",
      dataIndex: "sperson",
      key: "sperson",
      align: "center",
    },
    {
      title: "Relation",
      dataIndex: "relation",
      key: "relation",
      align: "center",
    },
  ];

  return (
    <Layout className="layout">
      <Row style={{ marginBottom: "30px" }}>
        <Col span={24}>
          <h2>Set Relation</h2>
          <Form
            style={{ justifyContent: "center" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            align="right"
            form={form}
          >
            <Form.Item
              label="First Person :"
              name="fperson"
              rules={[
                { required: true, message: "Please input the First person!" },
              ]}
            >
              <Select
                defaultValue="Select a person"
                style={{ width: "63%", textAlign: "left" }}
                onChange={(value) => {
                  handleChange(value);
                }}
              >
                {persons.map((person, k) => {
                  return <Option value={person._id}>{person.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Second Person :"
              name="sperson"
              rules={[
                { required: true, message: "Please input the Second person!" },
              ]}
            >
              <Select
                defaultValue="Select a another person"
                style={{ width: "64%", textAlign: "left" }}
              >
                {persons.map((person, k) => {
                  return (
                    <Option
                      value={person._id}
                      disabled={
                        String(fperson) == String(person._id) ? true : false
                      }
                    >
                      {person.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Set Realtion with First Person :"
              name="relation"
              rules={[{ required: true, message: "Please input a relation!" }]}
            >
              <Select
                defaultValue="Select a tag"
                style={{ width: "70%", textAlign: "left" }}
              >
                {tags.map((tag, k) => {
                  return <Option value={tag._id}>{tag.tag}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit">
                Set Relation
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

export default SetRelation;
