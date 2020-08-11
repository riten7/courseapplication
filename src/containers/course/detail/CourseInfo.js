import React from 'react';
import { Card, Rate, Row, Col } from 'antd';

import { formatDate } from '../../../utils/utility';

const CourseInfo = ({ course }) => {
  return (
    <Card className="courseDetail-info">
      <Row>
        <Col span={8}>
          <img src={require(`../../../images/processed.jpeg`)} className="image" alt={course.title} />
        </Col>
        <Col span={14}>
          <h2>{course.name || ''}</h2>
          <p><strong>Author: </strong>{course.author || ''}</p>
          <p><strong>Start Date: </strong> {formatDate(course.date) || ''} </p>
          <p><strong>Course Type: </strong>{course.type || ''}</p>
          <p><strong>Course Level: </strong> <Rate className='rate' value={parseInt(course.level) || 0} /></p>
          <p><strong>Description: </strong>
            {course.description || ''}</p>
        </Col>

      </Row>

    </Card>
  )
};

export default CourseInfo;