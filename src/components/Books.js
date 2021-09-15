import React, { Component } from 'react'
import request from 'superagent';
import BookList from './BookList';
import SearchArea from './SearchArea'

export default class Books extends Component {
    constructor(props){
        super(props);
        this.state={
            books:[],
            searchField:'',
            sort:''
        }
    }

    searchBook=(e)=>{
        e.preventDefault();
        request
            .get("https://www.googleapis.com/books/v1/volumes")
            .query({q:this.state.searchField})
            .then((data)=>{
                // console.log(data);
                this.setState({books:[...data.body.items]})
            })
    }
    handleSearch = (e) => {
        this.setState({searchField:e.target.value})
    }
    handleSort=(e)=>{
        console.log(e.target.value);
        this.setState=({sort:e.target.value})
    }
    render() {
        return (
            <div>
                <SearchArea searchBook={this.searchBook} handleSort={this.handleSort} handleSearch={this.handleSearch} />
                <BookList books={this.state.books}/>
            </div>
        )
    }
}
