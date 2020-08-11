import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const CourseListItem = ({ courseList }) => {
  const { Meta } = Card;

  return (
   <>
      {courseList.map(item => 
       <div className="courseItem">
        <Link to={{ pathname: `/course/${item.id}` }}>
          <Card key={item.id} hoverable
            cover={<img src={require(`../../images/processed.jpeg`)} className="card-img-top" alt={item.title} />}>
            <Meta title={item.name} description={item.type} />
          </Card>
        </Link>
        </div>
      )}
    </>
  );
}
export default CourseListItem;