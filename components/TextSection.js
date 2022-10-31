import React,{Component} from 'react';

function TextSection({children, title, sectionClass}){
		return(
			<>
			<section className={sectionClass}  data-aos="fade-right">
		    	<div className="container">
		        	<h4>{title}</h4>
		       		{children}
		     	</div>
    		</section>
			</>
			);
	}

export default TextSection;