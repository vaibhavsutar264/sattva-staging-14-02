import React, { Component } from 'react';
import Link from 'next/link';
import { InfiniteScroll } from 'react-simple-infinite-scroll';
import VideoServices from '../../services/videoServices';
import VideoDetails from '../../components/user/VideoDetails';
import Layout from '../../components/user/Layout';

class PranayamaLab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleId: 5,
      limit: 40,
      cursor: 0,
      videos: [],
      hasMore: true,
      isloading: true,
    };
  }
  loadMore = () => {
    this.setState({ isloading: true });
    VideoServices.fetchStyleVideos(
      this.state.styleId,
      this.state.limit,
      this.state.cursor,
      this.state.videos
    ).then((res) => {
      const allVideos = [...this.state.videos, ...res.data.videos];
      this.setState({
        cursor: res.data.cursor,
        hasMore: res.data.hasMore,
        videos: allVideos,
        isloading: false,
      });
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    VideoServices.fetchStyleVideos(
      this.state.styleId,
      this.state.limit,
      0
    ).then((res) => {
      this.setState({
        cursor: res.data.cursor,
        hasMore: res.data.hasMore,
        videos: res.data.videos,
        isloading: false,
      });
    });
  }
  render() {
    const { isloading } = this.state;
    return (
      <>
        <Layout loading={isloading}>
          <main className='admin-content'>
            <div className='sec sec-style'>
              <div className='container'>
                <div className='class-block mt-0'>
                  <div className='row'>
                    <div className='col-md-6 col'>
                      <h4>Pranayama Lab</h4>
                    </div>
                    <div className='col-md-6 col text-right'>
                      <Link href='/user/explore'>
                        <a className='btn btn-sm'>Back</a>
                      </Link>
                    </div>
                  </div>
                  <InfiniteScroll
                    throttle={100}
                    threshold={300}
                    isLoading={isloading}
                    hasMore={this.state.hasMore}
                    onLoadMore={this.loadMore}
                  >
                    <div className='row'>
                      {this.state.videos.map((item, index) => {
                        return <VideoDetails item={item} key={item.id} />;
                      })}
                    </div>
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </main>
        </Layout>
      </>
    );
  }
}

export default PranayamaLab;
