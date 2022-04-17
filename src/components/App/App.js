import './App.css';
import React, {Component} from "react"
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import LibraryService from "../../repository/libraryRepository";
import Header from "../Header/header";
import Categories from "../Categories/categories";
import BookAdd from '../Books/BookAdd/bookAdd';
import BookEdit from "../Books/BookEdit/bookEdit";
import Books from "../Books/BookList/books";

class App extends Component{


  constructor(props, context) {
    super(props, context);
    this.state = {
      categories: [],
      books: [],
      selectedBook: {}
    }
  }

  render(){
      return (
          <Router>
              <Header/>
              <main>
                  <div className={"container"}>
                      <Books books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook} />
                      {/*
                      <Route path={"/categories"}  render={() => <Categories categories={this.state.categories}/>}/>
                      <Route path={"/books/add"} exact render={() =>
                          <BookAdd categories={this.state.categories} manufacturers={this.state.manufacturers}
                                      onAddBooks={this.addBook}/>}/>
                      <Route path={"/books/edit/:id"} exact render={() =>
                          <BookEdit categories={this.state.categories} manufacturers={this.state.manufacturers}
                                       onEditBooks={this.editBook} book={this.state.selectedBook}/>}/>
                      <Route path={"/books"}  render={() =>
                          <Books books={this.state.books} onDelete={this.deleteBook} onEdit={this.getBook} />}/>
                      <Redirect to={"/books"}/>
                      */}
                  </div>
              </main>
          </Router>
      );
  }


  componentDidMount() {
    //this.loadCategories();
    this.loadBooks();
  }


  loadCategories = () => {
    LibraryService.fetchCategories()
        .then((data) => {
          this.setState({
            categories: data.data
          })
        });
  }

  loadBooks = () => {
    LibraryService.fetchBooks()
        .then((data) => {
          this.setState({
            books: data.data
          })
        });
  }

  deleteBook = (id) => {
    LibraryService.deleteBook(id)
        .then(() => {
          this.loadBooks();
        })
  }

  addBook = (name, category, author, availableCopies) => {
    LibraryService.addBook(name, category, author, availableCopies)
        .then(() => {
          this.loadBooks();
        })
  }

  getBook = (id) => {
    LibraryService.getBook(id)
        .then((data) => {
          this.setState({
            selectedBook: data.data
          })
        });
  }

  editBook = (id,name, category, author, availableCopies) => {
    LibraryService.editBook(id, name, category, author, availableCopies)
        .then(() => {
          this.loadBooks();
        })
  }

}

export default App;
