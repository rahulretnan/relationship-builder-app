import { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { checkRelation } from "../actions/index";
import { Row, Col, Layout, Form, Button, Select } from "antd";

const CheckRelation = () => {
  const { Option } = Select;
  const relations = useSelector((state) => state.relationCheck, shallowEqual);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const persons = useSelector((state) => state.persons, shallowEqual);
  const [fperson, setFperson] = useState();
  const dispatch = useDispatch();
  const handleChange = (id) => {
    setFperson(id);
  };

  const setChange = async () => {
    await setData(relations);
  };

  useEffect(() => {
    setChange();
  }, [relations]);

  const onFinish = async (values) => {
    await dispatch(checkRelation(values));
    setData(relations);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout className="layout">
      <Row style={{ marginBottom: "30px" }}>
        <Col span={24}>
          <h2>Check Relation</h2>
          <Form
            form={form}
            style={{ justifyContent: "center" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            align="right"
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
            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit">
                Check Relation
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          {data.map((element) => {
            if (element) {
              return <h2>{element}</h2>;
            } else {
              return <h1>No Relation Found</h1>;
            }
          })}
        </Col>
      </Row>
    </Layout>
  );
};

export default CheckRelation;
