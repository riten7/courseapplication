import React from 'react';
import { Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { PLACEHOLDER_IMG } from '../actions/Constant';

const CourseListItem = ({ course }) => {
  const { Meta } = Card;
  return (
    <>
      <Col key={course._id} className="gutter-row" span={4}>
        <Link to={{ pathname: `/course/${course.id}` }}>
          <Card hoverable
            style={{ width: 240 }}
            cover={<img src={PLACEHOLDER_IMG} className="card-img-top" alt={course.title} />}>
            <Meta title={course.title} description={course.type} />
          </Card>
        </Link>
      </Col>
    </>
  );
}
export default CourseListItem;