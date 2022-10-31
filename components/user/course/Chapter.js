import React, { Component } from 'react';

class Chapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedModules: [],
     
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ completedModules: this.props.completedModules });
  }

   read = (item) => {
    // this.setState({})
    
   this.props.parentcallback(item);
  }

  render() {
    if (this.props.last) {
      var addId = 'courseRatingStar';
    } else {
      var addId = '';
    }
    return (
      <div className='row'>
        <div className='col-md-9'>
          <div className='row'>
            {this.props.courseDetails.videos.map((items, index) => {
              return (
                <div
                  key={'c_' + items.id}
                  className='col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6'
                  onClick={() => this.read(items.description)}
                >
                  <div
                    id='courseVIdeo'
                    className='hoverable card mt-0'
                    data-toggle='modal'
                    data-target='#cardVideoModal'
                    data-backdrop='static'
                    data-keyboard='false'
                    data-title={items.title}
                    data-description={items.description}
                    data-src={items.video}
                  >
                    <img
                      src={
                        items.thumbnail
                          ? items.thumbnail
                          : items.default_thumbnail
                      }
                      className='img-fluid'
                    />
                    <div className='card-content'>
                      <span className='card-title'>{items.title}</span>
                      <div className='courseVideoContent'>
                        <p>{items.description}</p>{' '}
                        <a href='javascript:void(0)' className='view-course'>
                          {this.props.is_in_english == '2'
                            ? 'Rodyti daugiau'
                            : 'View More'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='col-md-3'>
          <div className='chapterRight'>
            <ul className='offerList'>
              {this.props.courseDetails.handoutPdfs.map((items, index) => {
                return (
                  <li>
                    <a href={items.pdf} target='_blank'>
                      <div className='offerImg'>
                        <img src='/images/pdf.svg' className='img-fluid' />
                      </div>
                      <div className='offerContent'>
                        <h6>{items.title} : </h6>
                        <p>{items.description}</p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className='col-md-12 text-right py-4'>
          {this.props.completedModules &&
          this.props.completedModules.includes(
            this.props.courseDetails.id.toString()
          ) ? (
            <button type='' className='btn btn-sm btnGolden'>
              {this.props.is_in_english == '2' ? 'PABAIGTA' : 'COMPLETED'}
            </button>
          ) : (
            <button
              type=''
              className={'btn btn-sm'}
              id={addId}
              onClick={(e) =>
                this.props.markCompleted(this.props.courseDetails, e)
              }
            >
              {this.props.is_in_english == '2'
                ? 'Skyrius užbaigtas'
                : 'MARK AS COMPLETED'}
            </button>
          )}
          {this.props.last !== true && (
            <button type='' className='btn btn-sm ml-2 nextChapterBtn'>
              {this.props.is_in_english == '2'
                ? 'KITAS SKYRIUS'
                : 'NEXT CHAPTER'}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Chapter;
