import React, { Component } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import SimpleReactValidator from 'simple-react-validator';
import { InfiniteScroll } from 'react-simple-infinite-scroll';
import { Multiselect } from 'multiselect-react-dropdown';
import {
  apiRoute,
  getApiHeader,
  getUserId,
  getLocalStorageAuth,
} from '../../utils/helpers';
import VideoServices from '../../services/videoServices';
import VideoDetails from '../../components/user/VideoDetails';
import Layout from '../../components/user/Layout';
import { SearchContext } from './ContextSearch';

export default class SearchComponent extends Component {
  static contextType = SearchContext;

  constructor(props) {
    super(props);
    this.multiselectRef = React.createRef();
    this.state = {
      videos: [],
      teachers: [],
      styleType: [],
      intentions: [],
      styles: [],
      searchInput: '',
      duration: '',
      durationStart: '',
      selectedTeacher: '',
      selectedStyle: '',
      selectedStyleType: '',
      selectedTeacherText: '',
      selectedStyleText: '',
      selectedStyleTypeText: '',
      selectedIntention: [],
      selectedIntentionType: [],
      searchInputOptions: [],
      showFilterForm: false,
      showStyle: false,
      accessDetails: {},
      teacherExclusive: false,
      loading: true,
      hasMore: true,
      cursor: 0,
      totalCount: 0,
    };
    this.searchValidation = new SimpleReactValidator();
    this.onChange = this.onChange.bind(this);
    this.toggleFilterForm = this.toggleFilterForm.bind(this);
    this.handleSearchForm = this.handleSearchForm.bind(this);
  }
  fetchSearchVideos = (data, videos) => {
    this.setState({ loading: true });
    VideoServices.fetchSearchVideos(data).then((res) => {
      let allVideos = [...videos, ...res.data.videos];
      this.setState({
        videos: allVideos,
        loading: false,
        cursor: res.data.cursor,
        hasMore: res.data.hasMore,
        totalCount: res.data.totalCount,
      });
    });
  };
  componentDidMount() {
    // let {si,st} = this.context;
    let { si, cFstyle, cFstyle2, cFilterForm, cFteacher, cFduration, cFintentions, cFstyleId, cFteacherId, cFstyleId2, cShowStyle, cFintentionsId } = this.context;
    window.scrollTo(0, 0);

    const requestOptions = {
      headers: getApiHeader(true),
    };

    axios
      .get(apiRoute('user-dashboard/get-all-video-teacher'), requestOptions)
      .then((res) => {
        this.setState({ teachers: res.data });
      });
    axios
      .get(apiRoute('user-dashboard/get-all-videos-style'), requestOptions)
      .then((res) => {
        this.setState({ styleType: res.data });
      });
    axios
      .get(apiRoute('user-dashboard/get-all-videos-intention'), requestOptions)
      .then((res) => {
        this.setState({ intentions: res.data });
      });
    if (this.props.exclusive !== undefined) {
      var isteacherExclusive = true;
    } else {
      var isteacherExclusive = false;
    }
    if (this.props.style !== undefined) {
      this.setState({
        selectedStyleType: this.props.style,
        showFilterForm: true,
        showStyle: true,
      });
      const details = {
        searchInput: '',
        duration: '',
        durationStart: '',
        teacher: '',
        styleType: this.props.style,
        // styleType: cFstyleId,
        intentionType: [],
        style: cFstyleId2,
        // style: '',
        teacherExclusive: false,
        limit: 40,
        skip: 0,
      };
      const stateValues = this.state;
      stateValues.selectedStyleType = this.props.style;
      stateValues.showFilterForm = true;
      stateValues.showStyle = true;

      axios
        .get(
          apiRoute('user-dashboard/get-styles/' + this.props.style),
          requestOptions
        )
        .then((res) => {
          this.setState({ styles: res.data });
          stateValues.styles = res.data;
        });

      this.fetchSearchVideos(details, [], stateValues);
    } else {
      this.setState({
        teacherExclusive: isteacherExclusive,
      });
      if (this.state.videos.length == 0) {
        let { si, st } = this.context;

        const details = {
          searchInput: si,
          duration: this.state.duration,
          durationStart: this.state.durationStart,
          // teacher: this.state.selectedTeacher,
          // styleType: this.state.selectedStyleType,
          // intentionType: this.state.selectedIntention,
          // style: this.state.selectedStyle,
          teacher: cFteacherId,
          styleType: cFstyleId,
          intentionType: cFintentionsId,
          style: cFstyleId2,
          teacherExclusive: isteacherExclusive,
          limit: 40,
          skip: 0,
        };
        this.fetchSearchVideos(details, []);
      }
    }
    const auth = getLocalStorageAuth();
    if (auth) {
      const userId = auth.userDetails.id;
      axios
        .get(apiRoute('get-teacher-access/' + btoa(userId)), requestOptions)
        .then((res) => {
          this.setState({ accessDetails: res.data });
        });
    }
  }
  filterData = () => {
    const requestOptions = {
      headers: getApiHeader(true),
    };
    let { si, cFstyle, cFstyle2, cFilterForm, cFteacher, cFduration, cFintentions, cFstyleId, cFteacherId, cFstyleId2, cFdurationStart, cFintentionsId } = this.context;
    // let {si,st} = this.context;
    const details = {
      searchInput: si,
      // duration: this.state.duration,
      // durationStart: this.state.durationStart,
      // teacher: this.state.selectedTeacher,
      // styleType: this.state.selectedStyleType,
      // intentionType: this.state.selectedIntention,
      // style: this.state.selectedStyle,
      duration: cFduration,
      durationStart: cFdurationStart,
      teacher: cFteacherId,
      styleType: cFstyleId,
      intentionType: cFintentionsId,
      style: cFstyleId2,
      teacherExclusive: this.state.teacherExclusive,
      limit: 40,
      skip: 0,
    };
    this.fetchSearchVideos(details, [], this.state);
  };

  onSelect = (selectedList, selectedItem) => {
    let { changeFintentions, changeFintentionsId } = this.context;
    const selectedIds = [];
    selectedList.forEach((e) => {
      selectedIds.push(e.id);
    });
    this.setState({
      selectedIntention: selectedIds,
      selectedIntentionType: selectedList,
    });
    changeFintentions(selectedList);
    changeFintentionsId(selectedIds);
    setTimeout(() => {
      this.filterData();
    }, 5);
  };

  onRemove = (selectedList, removedItem) => {
    let { changeFintentions, changeFintentionsId } = this.context;
    const selectedIds = [];
    selectedList.forEach((e) => {
      selectedIds.push(e.id);
    });
    var index = selectedIds.indexOf(removedItem);
    if (index > -1) {
      selectedIds.splice(index, 1);
    }
    this.setState({ selectedIntention: selectedIds });
    changeFintentionsId(selectedIds);
    changeFintentions(selectedIds);
    setTimeout(() => {
      this.filterData();
    }, 5);
  };

  onChange(e) {
    let { changeFstyle, changeFstyle2, changeFteacher, changeFstyleId, changeFteacherId, cFstyleId, changeFstyleId2, changeShowStyle, changeStylesData } = this.context;
    // let {setStyle,setTeacher,setDuration,setIntentions} = this.context;

    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const selectedName = optionElement.getAttribute('itemName');

    this.setState({ [e.target.name]: e.target.value });

    setTimeout(() => {
      this.filterData();
    }, 5);

    if (e.target.name === 'selectedStyleType') {
      if (e.target.value !== '') {
        this.setState({
          showStyle: true,
          selectedStyle: '',
          selectedStyleTypeText: selectedName,
        });
        changeFstyle(selectedName)
        changeFstyleId(e.target.value);
        changeShowStyle(true);
        changeFstyleId2('');
        const requestOptions = {
          headers: getApiHeader(true),
        };
        axios
          .get(
            apiRoute('user-dashboard/get-styles/' + e.target.value),
            requestOptions
          )
          .then((res) => {
            this.setState({ styles: res.data });
            changeStylesData(res.data);
          });
      } else {
        this.setState({
          showStyle: false,
          styles: [],
          selectedStyle: '',
          selectedStyleTypeText: '',
        });
      }
    }
    if (e.target.name === 'selectedStyle') {
      if (e.target.value !== '') {
        this.setState({ selectedStyleText: selectedName });
        // setStyle(selectedName);
        changeFstyle2(selectedName);
        changeFstyleId2(e.target.value);
        console.log(e.target.value);
      } else {
        this.setState({ selectedStyleText: '' });
      }
    }
    if (e.target.name === 'selectedTeacher') {
      if (e.target.value !== '') {
        this.setState({ selectedTeacherText: selectedName });
        changeFteacher(selectedName)
        changeFteacherId(e.target.value);
      } else {
        this.setState({ selectedTeacherText: '' });
        changeFteacher('');
      }
    }
  }

  handleSearchForm(e) {
    e.preventDefault();
    if (!this.searchValidation.allValid()) {
      this.searchValidation.showMessages();
      this.forceUpdate();
      return false;
    }
    this.setState({ searchInputOptions: [] });
    this.filterData();
  }

  toggleFilterForm() {
    let { changeFilterForm } = this.context;
    this.setState({ showFilterForm: !this.state.showFilterForm });
    changeFilterForm(!this.state.showFilterForm);
  }

  changeFinterInput = (e) => {
    let { si, st } = this.context;
    st(e.target.value);

    // this.setState({ searchInput: e.target.value });
    if (e.target.value == '') {
      setTimeout(() => {
        this.filterData();
      }, 10);
    }
  };

  handleSearchOptiopnClick = (e) => {
    let { si, st } = this.context;
    st(e.target.innerHTML);
    this.setState({ searchInputOptions: [] });
  };

  clearAllFilter = (e) => {
    // let {si,st} = this.context;
    let { changeFteacher, st, changeFstyle, changeFstyle2, changeFintentions, changeFduration, changeFstyleId, changeFteacherId } = this.context;
    st('');
    changeFteacher('');
    changeFstyle2('');
    changeFstyle('');
    changeFintentions('');
    changeFduration('');
    changeFstyleId('');
    changeFteacherId('');
    this.setState({
      searchInput: '',
      duration: '',
      durationStart: '',
      selectedTeacher: '',
      selectedStyleType: '',
      selectedTeacherText: '',
      selectedStyleText: '',
      selectedStyleTypeText: '',
      selectedIntention: [],
      selectedStyle: '',
      selectedIntentionType: [],
    });
    if (this.state.selectedIntention.length > 0) {
      this.multiselectRef.current.resetSelectedValues();
    }
    setTimeout(() => {
      this.filterData();
    }, 5);
  };

  loadMore = () => {
    let { si, st } = this.context;

    const details = {
      searchInput: si,
      duration: this.state.duration,
      durationStart: this.state.durationStart,
      teacher: this.state.selectedTeacher,
      styleType: this.state.selectedStyleType,
      intentionType: this.state.selectedIntention,
      style: this.state.selectedStyle,
      teacherExclusive: this.state.teacherExclusive,
      limit: 40,
      skip: this.state.cursor,
    };
    this.fetchSearchVideos(details, this.state.videos);
  };

  onDurationChange = (e) => {
    let { changeFduration, changeFdurationStart } = this.context;
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const durationStart = optionElement.getAttribute('fromVal');
    this.setState({ duration: e.target.value });
    changeFduration(e.target.value);
    changeFdurationStart(durationStart);
    this.setState({ durationStart: durationStart });
    setTimeout(() => {
      this.filterData();
    }, 8);
  };

  removeStyle = (e) => {
    let { changeFstyle2 } = this.context;
    this.setState({ selectedStyle: '', selectedStyleText: '' });
    changeFstyle2('');
    setTimeout(() => {
      this.filterData();
    }, 8);
  };

  removeStyleType = (e) => {
    let { changeFstyle, changeFstyleId, changeShowStyle } = this.context;
    this.setState({ selectedStyleType: '', selectedStyleTypeText: '' });
    changeFstyle('');
    changeFstyleId('');
    changeShowStyle(false);
    setTimeout(() => {
      this.filterData();
    }, 8);
  };

  removeTeacther = (e) => {
    let { changeFteacher, changeFteacherId } = this.context;
    this.setState({ selectedTeacher: '', selectedTeacherText: '' });
    changeFteacher('');
    changeFteacherId('');
    setTimeout(() => {
      this.filterData();
    }, 8);
  };

  teacherExclusiveVideos = (e) => {
    this.setState({
      teacherExclusive: !this.state.teacherExclusive,
    });
    setTimeout(() => {
      this.filterData();
    }, 8);
  };
  render() {
    let { si, cFstyle, cFstyle2, cFilterForm, cFteacher, cFduration, cFintentions, cFstyleId, cFteacherId, cFstyleId2, cShowStyle, cStylesData, cFintentionsId } = this.context;
    // let {si,style,teacher,duration,intentions} = this.context;

    return (
      <Layout loading={this.state.loading}>
        <main className='admin-content'>
          <section
            className='inner-banner'
            style={{
              background: 'url(/../images/bg-connect.jpg)',
              backgroundSize: 'cover',
              minHeight: '500px',
            }}
          >
            <div className='container text-center text-white'>
              <h1>
                Search all our yoga classes, styles, intentions, teachers, and
                more.
              </h1>
            </div>
          </section>
          <section className='sec pt-4'>
            <div className='container'>
              <div className='sec-seaches'>
                <div className='searchbar d-flex'>
                  <form
                    onSubmit={this.handleSearchForm}
                    className='searchbar-bar d-flex'
                  >
                    <div className='searchbar-form'>
                      <input
                        type='text'
                        placeholder='Search here..'
                        autoComplete='off'
                        name='searchInput'
                        value={si}
                        onChange={this.changeFinterInput}
                      />
                      <button className='btn btn-sm' type='submit'>
                        Search here
                      </button>
                    </div>
                  </form>
                  <div className='btn-searchs'>
                    <button
                      className='btn-floating btn-sm btn-filter'
                      onClick={this.toggleFilterForm}
                    >
                      <i className='fas fa-filter' />
                    </button>
                    <button
                      className='btn-floating btn-sm btn-filter ml-3'
                      type='button'
                      onClick={this.clearAllFilter}
                      data-html={true}
                      data-for='custom-color-no-arrow'
                      data-tip='Clear all filters'
                    >
                      <i class='fas fa-times'></i>
                    </button>
                    <ReactTooltip
                      id='custom-color-no-arrow'
                      className='react-tooltip'
                      delayHide={1000}
                      textColor='#FFF'
                      backgroundColor='#000'
                      effect='solid'
                    />
                  </div>
                  {/* <button className="btn btn-sm explore_surprise ml-2" data-toggle="modal" data-target="#surprise">Surprise Me</button> */}
                </div>
                {cFilterForm && (
                  <div className='search-filter-wrap'>
                    <div className='row'>
                      <div className='input-field col-md-3'>
                        <select
                          name='selectedStyleType'
                          onChange={this.onChange}
                          value={cFstyleId}
                        >
                          <option value=''>Style</option>
                          {this.state.styleType.map((item, index) => {
                            return (
                              <option
                                itemName={item.type}
                                value={item.id}
                                selected={
                                  cFstyleId == item.id
                                    ? 'selected'
                                    : ''
                                }
                              >
                                {item.type}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {cShowStyle && (
                        <div className='input-field col-md-3'>
                          <select name='selectedStyle' onChange={this.onChange} value={cFstyleId2} >
                            <option value=''>Select Style</option>
                            {cStylesData.map((item, index) => {
                              return (
                                <option
                                  itemName={item.name}
                                  value={item.id}
                                  selected={
                                    cFstyleId2 == item.id
                                      ? 'selected'
                                      : ''
                                  }
                                >
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      )}
                      <div className='input-field col-md-3'>
                        <select name='selectedTeacher' onChange={this.onChange} value={cFteacherId}>
                          <option value='' selected>
                            Select Teacher
                          </option>
                          {this.state.teachers.map((item, index) => {
                            return (
                              <option
                                itemName={item.name}
                                value={item.id}
                                selected={
                                  cFteacherId == item.id
                                    ? 'selected'
                                    : ''
                                }
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className='input-field col-md-3'>
                        <select
                          name='duration'
                          value={cFduration}
                          onChange={this.onDurationChange}
                        >
                          <option value='' selected>
                            Duration
                          </option>
                          <option fromVal={5400} value={7200}>
                            2 Hours
                          </option>
                          <option fromVal={4500} value={5400}>
                            90 Minutes
                          </option>
                          <option fromVal={3600} value={4500}>
                            75 Minutes
                          </option>
                          <option fromVal={2700} value={3600}>
                            60 Minutes
                          </option>
                          <option fromVal={1800} value={2700}>
                            45 Minutes
                          </option>
                          <option fromVal={1200} value={1800}>
                            30 Minutes
                          </option>
                          <option fromVal={900} value={1200}>
                            20 Minutes
                          </option>
                          <option fromVal={600} value={900}>
                            15 Minutes
                          </option>
                          <option fromVal={300} value={600}>
                            10 Minutes
                          </option>
                          <option fromVal={0} value={300}>
                            5 Minutes
                          </option>
                        </select>
                      </div>

                      <div className='col-md-12'>
                        {this.state.intentions.length > 0 ? (
                          <Multiselect
                            options={this.state.intentions}
                            onSelect={this.onSelect}
                            onRemove={this.onRemove}
                            selectedValues={cFintentions}
                            displayValue='name'
                            placeholder='Select Intentions'
                          />
                        ) : null}
                      </div>
                      <div className='col-md-12'>
                        {Object.keys(this.state.accessDetails).length > 0 &&
                          this.state.accessDetails.status == 1 &&
                          this.state.teacherExclusive == true ? (
                          <div className='text-right syaButton'>
                            <button
                              className='btn btn-sm btnGolden'
                              type='button'
                              onClick={this.teacherExclusiveVideos}
                            >
                              Sattva Yoga Academy
                            </button>
                          </div>
                        ) : (
                          ''
                        )}
                        {Object.keys(this.state.accessDetails).length > 0 &&
                          this.state.accessDetails.status == 1 &&
                          this.state.teacherExclusive == false ? (
                          <div className='text-right syaButton'>
                            <button
                              className='btn btn-sm'
                              type='button'
                              onClick={this.teacherExclusiveVideos}
                            >
                              Sattva Yoga Academy
                            </button>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className='chipList'>
                      {cFstyle !== '' ? (
                        <span class='chip'>
                          {cFstyle}{' '}
                          <i
                            class='fa fa-times-circle-o'
                            aria-hidden='true'
                            onClick={this.removeStyleType}
                          ></i>
                        </span>
                      ) : (
                        ''
                      )}

                      {cFstyle2 !== '' ? (
                        <span class='chip'>
                          {cFstyle2}{' '}
                          <i
                            class='fa fa-times-circle-o'
                            aria-hidden='true'
                            onClick={this.removeStyle}
                          ></i>
                        </span>
                      ) : (
                        ''
                      )}

                      {cFteacher !== '' ? (
                        <span class='chip'>
                          {cFteacher}{' '}
                          <i
                            class='fa fa-times-circle-o'
                            aria-hidden='true'
                            onClick={this.removeTeacther}
                          ></i>
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className='class-block my-0 border-0'>
                <div className>
                  <h4 className='vid_stat_cnt'>
                    <span id='total_rec'>{this.state.totalCount}</span> Videos
                  </h4>
                </div>

                <InfiniteScroll
                  throttle={100}
                  threshold={300}
                  isLoading={this.state.loading}
                  hasMore={this.state.hasMore}
                  onLoadMore={this.loadMore}
                >
                  <div className='row serchVideos'>
                    {this.state.videos.map((item, index) => {
                      return <VideoDetails item={item} key={item.id} />;
                    })}
                  </div>
                </InfiniteScroll>
                {this.state.videos.length > 0 ? null : (
                  <div className='card-panel text-center sattva-error'>
                    <p>No videos found, please try again later, Thank you</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }
}
