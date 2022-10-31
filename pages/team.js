import React,{Component} from 'react';
import axios from 'axios';
import { apiRoute, getApiHeader } from '../utils/helpers';
import Banner from '../components/Banner';
import TeamList from '../components/team/TeamList';
import TextSection from '../components/TextSection';
import Layout from '../components/Layout';

class Team extends Component{

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
		axios.get(apiRoute('cms-page-banner/'+btoa(11)),requestOptions)
		.then(res =>{
			this.setState({ banner : res.data });
	    })

	}
	
	render(){
		return(
			<>
			<Layout>
			<Banner banner={this.state.banner}/>
			<TextSection title="ABOUT TEAM MEMBERS" sectionClass="sec sec-inabout">
			<p>Welcome. You are on your journey of evolution, transcendence, and inspiration. You have arrived.  Sattva Connect gives you access to the ancient, authentic knowledge that elevates consciousness and leads you to you. This rich spiritual heritage of knowledge has been channeled and preserved in the Vedic scriptures for thousands of years by yogis in the sacred lands of Rishikesh, India, the Yoga Capital of the world.</p>
	        <p>From the banks of the mighty Ganges River and within the immensely powerful foothills of the Himalayas, we bring you Sattva Connect. Its authentic teachings and integrative approach to yoga will truly take your practice, your experience, and your state to the highest potential of consciousness.</p>
	        <p>We share the teachings that have remained secret for a very long time, due to their incredibly transformational value. Through Sattva Connect, they are shared in a manner that you can easily access to awaken that same knowledge that you have within yourself. This is not something foreign. You have, within yourself, the supreme knowledge of meditation, pranayama, asana, kriya, and mantra. The very precise methodology in Sattva Connect will help you to evolve by reawakening your own personal practices.</p>
	        </TextSection>
			<TeamList/>
			</Layout>
			</>
			);
	}
}

export default Team;