import localStorage from './modules/localstorage.js';
import userInteraction from './modules/userInteraction.js';
import { DateTime } from './modules/luxon.js';

/* eslint max-classes-per-file: ["error", 3] */
const { StorageInLocal } = localStorage;

/* Luxon Date Config */
const currentDate = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
const date = document.getElementById('date');
date.innerHTML = currentDate.toString();

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

const store = new StorageInLocal();
const { UI } = userInteraction;

document.addEventListener('DOMContentLoaded', UI.displayAllBooks);
document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = store.numberOfBooks;
  const book = new Book(title, author, id);
  UI.addBookList(book);
  store.addBook(book);
  UI.clearFields();
  UI.hideOrRemoveFieldet();
});

document.querySelector('#container-book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  const btnID = e.target.id;
  const arrValues = btnID.split('-');
  const idString = arrValues[arrValues.length - 1];
  const id = parseInt(idString, 10);
  store.removeBook(id);
  UI.hideOrRemoveFieldet();
});

document.querySelector('#book-list-menu').addEventListener('click', () => {
  document.querySelector('.books-container').classList.remove('hide');
  document.querySelector('.form').classList.add('hide');
  document.querySelector('.section-contact-info').classList.add('hide');
});

document.querySelector('#add-new-book-menu').addEventListener('click', () => {
  document.querySelector('.form').classList.remove('hide');
  document.querySelector('.books-container').classList.add('hide');
  document.querySelector('.section-contact-info').classList.add('hide');
});

document.querySelector('#contact-menu').addEventListener('click', () => {
  document.querySelector('.section-contact-info').classList.remove('hide');
  document.querySelector('.form').classList.add('hide');
  document.querySelector('.books-container').classList.add('hide');
});
