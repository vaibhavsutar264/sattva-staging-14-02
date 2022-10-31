import React,{Component} from 'react';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import TeacherList from '../components/teacher/TeacherList';
// import TeacherDetails from '../components/teacher/TeacherDetails';

class teachers extends Component{

	constructor(props){
    super(props);
      this.state = {
      	banner : {},
	    } 
	  }
	componentDidMount() {

   	 window.scrollTo(0, 0);

   	 const requestOptions = {
			headers : getApiHeader()
		};
		axios.get(apiRoute('cms-page-banner/'+btoa(6)),requestOptions)
		.then(res =>{
			this.setState({ banner : res.data });
	    })
	}	
	render(){
		return(
			<>
            <Layout>
			<Banner banner={this.state.banner} />
			<main>
			<TeacherList/>
			</main>
            </Layout>
			</>
			);
	}
}

export default teachers;