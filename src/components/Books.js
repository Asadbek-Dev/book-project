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
    componentDidMount() {
        request
            .get("https://www.googleapis.com/books/v1/volumes")
            .query({ q: this.state.searchField })
            .then((data) => {
                this.setState({ books: [...data.body.items] })
            })
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        request
            .get("https://www.googleapis.com/books/v1/volumes")
            .query({q:this.state.searchField})
            .then((data)=>{
                this.setState({ books: [...data.body.items] })
            })
    }
    handleChange = (e) => {
        this.setState({ searchField: e.target.value })
    }

    handleSort = (e) => {
        this.setState({ sort: e.target.value});
    }
    render() {
        const filteredBooks = this.state.books.sort((a, b) => {
            if(this.state.sort == 'Newest'){
                return parseInt(b.volumeInfo.publishedDate.substring(0, 4)) - parseInt(a.volumeInfo.publishedDate.substring(0, 4));
            }
            else if(this.state.sort == 'Oldest'){
                return parseInt(a.volumeInfo.publishedDate.substring(0, 4)) - parseInt(b.volumeInfo.publishedDate.substring(0, 4));
            }
          
          return;
        })
        return (
            <div className='wrapper'>
                <SearchArea data={this.state} 
                    handleSubmit={this.handleSubmit} 
                    handleChange={this.handleChange} 
                    handleSort={this.handleSort}/>
                <BookList books={filteredBooks}/>
            </div>
        )
    }
}
