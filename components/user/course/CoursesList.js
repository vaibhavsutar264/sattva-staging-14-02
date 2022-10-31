import React, { Component } from 'react';
import CourseListDetails from './CourseListDetails';
import CourseListDetailsLanguage from './CourseListDetailsLanguage';

class CoursesList extends Component {
  render() {
    return (
      <>
        <div className='row'>
          {this.props.courses.map((item, index) => {
            if (item.is_in_english == '2') {
              return (
                <CourseListDetailsLanguage
                  key={index}
                  course={item}
                  isPurchased={this.props.isPurchased}
                />
              );
            } else {
              return (
                <CourseListDetails
                  key={index}
                  course={item}
                  isPurchased={this.props.isPurchased}
                />
              );
            }
          })}
        </div>
      </>
    );
  }
}

export default CoursesList;
