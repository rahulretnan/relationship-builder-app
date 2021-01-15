import { Row, Col, Layout } from "antd";
const Home = () => {
  return (
    <Layout className="layout">
      <Row gutter={16}>
        <Col
          span={12}
          onClick={() => {
            window.location = "/people";
          }}
          className=" box"
        >
          <h2>People</h2>
        </Col>
        <Col
          span={12}
          onClick={() => {
            window.location = "/tag";
          }}
          className=" box"
        >
          <h2>Tag</h2>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col
          span={12}
          onClick={() => {
            window.location = "/setRelation";
          }}
          className="box"
        >
          <h2>Set Relation</h2>
        </Col>
        <Col
          span={12}
          onClick={() => {
            window.location = "/checkRelation";
          }}
          className="box"
        >
          <h2>Check Relation</h2>
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
