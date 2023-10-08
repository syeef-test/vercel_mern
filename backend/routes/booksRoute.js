import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

//Save a book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Send all required fields:title,author,publishYear" });
    }

    const new_book = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(new_book);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//Get singale book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json({
      data: book,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//Update book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields:title,author,publishYear",
      });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book Not Found" });
    }

    return res.status(200).json({ message: "Book Updated Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Delete book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book Not Found" });
    }

    return res.status(200).json({ message: "Book Deleted Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

export default router;
