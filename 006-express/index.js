const express = require("express");
const { v4: uuidv4 } = require("uuid");

class Book {
  constructor(
    title = "",
    description = "",
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = ""
  ) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
  }
}

const store = {
  books: [
    new Book(
      "Американская трагедия",
      "Глубокая психологическая драма о том, как стремление к успеху и социальному статусу приводит молодого человека к трагическим последствиям, включая убийство и моральный крах.",
      "Теодор Драйзер"
    ),
    new Book(
      "Белый клык",
      "История полудикой собаки-волка, чья борьба за выживание в суровых условиях Аляски раскрывает темы стойкости, преданности и жестокости природы.",
      "Джек Лондон"
    ),
  ],
};

const app = express();
/* `express.json()` - middleware,
автоматически преобразует данные
в теле каждого запроса в json объект, который
затем доступен в обработчике  */
app.use(express.json());

app.post("/api/user/login", (req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

app.get("/api/books", (req, res) => {
  const { books } = store;
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const book = books.find((book) => book.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json("404 | Книга не найдена");
  }
});

app.post("/api/books", (req, res) => {
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  );
  books.push(newBook);

  res.status(201).json(newBook);
});

app.put("/api/books/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const book = books.find((book) => book.id === id);
  if (book) {
    book.title = title;
    book.description = description;
    book.authors = authors;
    book.favorite = favorite;
    book.fileCover = fileCover;
    book.fileName = fileName;
    res.json(book);
  } else {
    res.status(404).json("404 | Книга не найдена");
  }
});

app.delete("/api/books/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idxBook = books.findIndex((book) => book.id === id);
  if (idxBook !== -1) {
    books.splice(idxBook, 1);
    res.status(204).json("ОК");
  } else {
    res.status(404).json("404 | Книга не найдена");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server started on port ${PORT}`);
