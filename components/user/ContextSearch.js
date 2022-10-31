import React, { Component, createContext } from 'react';


export const SearchContext = createContext();

export class ContextSearch extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchInput:'',
            fteacher:'',
            fstyle:'',
            fintentions:'',
            fintentionsId : [],
            fduration:'',
            filterForm:'',
            fstyle2:'',
            fstyleId:'',
            fteacherId :'',
            fstyleId2:'',
            fdurationStart:'',
            stylesData:[],
            result:[],
            showStyle:false
        };
    }
    
    changestate=(input)=>{
    this.setState({searchInput:input})
    }
    changeStateFteacher=(input)=>{
        this.setState({fteacher:input})
        }
    changeStatefStyle=(input)=>{
            this.setState({fstyle:input})
            console.log("style context is working")
            }
    changeStateFintentions=(input)=>{
                this.setState({fintentions:input})
                console.log(input);
                }
    changeStateFduration=(input)=>{
                    this.setState({fduration:input})
                    console.log(input)

                    }
    changeStateFilterForm=(input)=>{
                        this.setState({filterForm:input})
                        }
    changeStatefStyle2=(input)=>{
                            this.setState({fstyle2:input})
                            }
    changeStatefStyleId=(input)=>{
                                this.setState({fstyleId:input})
                                }

    changeStateFteacherId=(input)=>{
                                    this.setState({fteacherId:input})
                                    }
    changeStatefStyleId2=(input)=>{
                                 this.setState({fstyleId2:input})
                                 console.log(input);

    }
    changeStateShowStyle=(input)=>{
                                this.setState({showStyle:input})
    }
    
    changeStateStylesdata=(input)=>{
                                this.setState({stylesData:input})
    }

    changeStateFdurationStart=(input)=>{
        this.setState({fdurationStart:input})
        console.log(input)
}

changeStateFintentionsId = (input) => {
    this.setState({fintentionsId:input})
}

    saveResponse = (data) => {
        this.setState({result:data});
    }


    render() {
        return (
            <SearchContext.Provider value={{
                si:this.state.searchInput,
                st:this.changestate,
                cFteacherId:this.state.fteacherId,
                changeFteacherId:this.changeStateFteacherId,
                cFteacher:this.state.fteacher,
                changeFteacher:this.changeStateFteacher,
                cFstyleId:this.state.fstyleId,
                changeFstyleId:this.changeStatefStyleId,
                cFstyle:this.state.fstyle,
                changeFstyle:this.changeStatefStyle,
                cFstyleId2:this.state.fstyleId2,
                changeFstyleId2:this.changeStatefStyleId2,
                cFstyle2:this.state.fstyle2,
                changeFstyle2:this.changeStatefStyle2,
                cStylesData:this.state.stylesData,
                changeStylesData:this.changeStateStylesdata,
                cShowStyle:this.state.showStyle,
                changeShowStyle:this.changeStateShowStyle,
                cFintentions:this.state.fintentions,
                changeFintentions:this.changeStateFintentions,
                cFintentionsId:this.state.fintentionsId,
                changeFintentionsId:this.changeStateFintentionsId,
                cFduration:this.state.fduration,
                changeFduration:this.changeStateFduration,
                cFdurationStart:this.state.fdurationStart,
                changeFdurationStart:this.changeStateFdurationStart,
                cFilterForm:this.state.filterForm,
                changeFilterForm:this.changeStateFilterForm,
                results:this.state.result,
                setResults:this.saveResponse
            }}>
                {this.props.children}
            </SearchContext.Provider>
        );
    }
}
