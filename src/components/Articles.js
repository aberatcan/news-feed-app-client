import React from "react";
import { Card, Col, Row } from "antd";
const { Meta } = Card;

const Articles = ({ articles }) => {
  return articles ? (
    <div style={{ padding: "8px 0" }}>
      <Row gutter={16}>
        {articles.map((article) => (
          <Col span={6}>
            <Card
              hoverable
              actions={[
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>,
              ]}
              cover={
                <img
                  alt="example"
                  src={article.urlToImage}
                  width={"250px"}
                  height={"250px"}
                />
              }
              style={{ marginBottom: "8px" }}
            >
              <Meta title={article.title} description={article.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  ) : (
    <p>No Result</p>
  );
};

export default Articles;
