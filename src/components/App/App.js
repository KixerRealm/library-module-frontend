//import './App.css';
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
      authors : [],
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
                      <Route path={"/categories"}  render={() => <Categories categories={this.state.categories}/>}/>
                      <Route path={"/books/add"} exact render={() =>
                          <BookAdd categories={this.state.categories} authors={this.state.authors}
                                      onAddBook={this.addBook}/>}/>
                      <Route path={"/books/edit/:id"} exact render={() =>
                          <BookEdit categories={this.state.categories} authors={this.state.authors}
                                       onEditBook={this.editBook} book={this.state.selectedBook}/>}/>
                      <Route path={"/books"}  render={() =>
                          <Books books={this.state.books} onDelete={this.deleteBook} onEditBook={this.getBook} onTake={this.takeBook} />}/>
                      <Redirect to={"/books"}/>
                  </div>
              </main>
          </Router>
      );
  }


  componentDidMount() {
    this.loadCategories();
    this.loadAuthors();
    this.loadBooks();
  }


  loadCategories = () => {
    LibraryService.fetchCategories()
        .then((data) => {
            console.log(data)
          this.setState({
            categories: data.data
          })
        });
  }

  loadAuthors = () => {
      LibraryService.fetchAuthors()
          .then((data) => {
               console.log(data)
              this.setState({
                  authors: data.data
              })
          });
  }

  loadBooks = () => {
    LibraryService.fetchBooks()
        .then((data) => {
            console.log(data)

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

  takeBook = (id) => {
      LibraryService.takeBook(id)
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
