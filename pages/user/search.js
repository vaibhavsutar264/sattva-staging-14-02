import React, { Component } from 'react';
import router, { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { SearchContext } from '../../components/user/ContextSearch';
import { getLocalStorageAuth } from '../../utils/helpers';
const SearchComponent = dynamic(
  () => import('../../components/user/SearchComponent'),
  {
    ssr: false,
  }
);
class Search extends Component {

  componentDidMount(){
    const getId = getLocalStorageAuth();
        if(!getId.userDetails){
        const ForUrl = router.pathname
        router.push(`/login/?goto=${ForUrl}`);
        return 0;
        }
  }
 

  render() {
    return (
      <>
        <SearchComponent
          style={this.props.router.query.style}
          exclusive={this.props.router.query.exclusive}
        />
      </>
    );
  }
}

export default withRouter(Search);
