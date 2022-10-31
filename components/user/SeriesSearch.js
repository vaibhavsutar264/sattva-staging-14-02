import React, { Component, useContext } from 'react';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import {
  apiRoute,
  getApiHeader,
  getUserId,
  getLocalStorageAuth,
} from '../../utils/helpers';

import { SearchContext } from './ContextSearch';
import dynamic from 'next/dynamic';

// const {SearchContext}  = dynamic( ()=>import('./ContextSearch'),
// {ssr:false}
// )

export default class SeriesSearch extends Component {

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

    };
    this.changeFinterInput = this.changeFinterInput.bind(this)


  }

  componentDidMount() {
    console.log(this.props);
    window.scrollTo(0, 0);

    const requestOptions = {
      headers: getApiHeader(true),

    };


  }



  handleSearchForm = (e) => {
    let { si, st } = this.context;
    st(e.target.searchInput.value);
    e.preventDefault();

    this.props.parentcallback(e.target.searchInput.value);

  }
  changeFinterInput = (e) => {
    let { si, st } = this.context;
    st(e.target.value);

    this.props.parentcallback(e.target.value);

  };

  clearSearch = () => {
    // this.setState({searchInput:''});
    let { si, st } = this.context;
    st('');
    this.props.parentcallback('');

  }
  render() {
    let { si, st } = this.context;
    return (
      <>
        <div className='py-3'>
          <div className='' style={{ top: 0 }}>
            <form
              onSubmit={this.handleSearchForm}
              className='searchbar-bar d-flex'
            >
              <div className='searchbar-form-live'>
                <input
                  type='text'
                  placeholder='Search here..'
                  autoComplete='off'
                  name='searchInput'
                  value={si}
                  onChange={this.changeFinterInput}
                />
                <button className='btn btn-sm maxw-120' type='submit'>
                  Search
                </button>
              </div>
            </form>
            {/* <div className='btn-searchs btn-series'>
              <button
                className='btn-series-clear btn-floating btn-sm btn-filter'
                type='button'
                data-html={true}
                onClick={this.clearSearch}
                data-for='custom-color-no-arrow'
                data-tip='Clear all filters'
              >
                <i class='fas fa-times'></i>
              </button>
            </div> */}
            <div className='btn-searchs'>
              <ReactTooltip
                id='custom-color-no-arrow'
                className='react-tooltip'
                delayHide={1000}
                textColor='#FFF'
                backgroundColor='#000'
                effect='solid'
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
