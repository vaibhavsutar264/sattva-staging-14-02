import React, { useState } from 'react'


const[searchInput,setSearchInput]= useState();

const SeriesSearchc = (props) => {

  const  handleSearchForm = (e) => {
        e.preventDefault();
        console.log(e.target.searchInput.value);
        axios.post(apiRoute('search-series'), {
            data: e.target.searchInput.value,
          })
          .then((response) => {
             this.props.parentcallback(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        
      }

   const changeFinterInput = (e) => {
        this.setState({ searchInput: e.target.value });
        setSearchInput(e.target.value)
        axios.post(apiRoute('search-series'), {
            data: e.target.value,
          })
          .then((response) => {
            props.parentcallback(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
    const  clearSearch = () => {
        setSearchInput('');
      }

    return (
        <div>
            
        </div>
    )
}

export const 
