const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
});

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "please Enter valid value with min character 3").isLength({
      min: 3,
    }),
    body("desc", "description must be atleast of 5 characters").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    try {
      
      const { title, desc, tag } = req.body;
      // if Ther e are errors, return bad request amd the errors to the userrr
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        desc: desc,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (e) {
      res.status(500).json({ e: e.message });
    }
  }
);

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, desc, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (desc) {
      newNote.desc = desc;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, desc, tag } = req.body;

  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ successs: "note has been deleted" });
  } catch (e) {
    res.status(500).json({ e: e.message });
  }
});

module.exports = router;
