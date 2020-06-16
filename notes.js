const fs = require("fs");
const chalk = require("chalk");

const addNotes = (title, body) => {
  const notes = loadNotes();
  // console.log(notes);
  // const duplicateNotes = notes.filter((note) => note.title === title);

  // Shorter and Nicer than duplicateNotes
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    console.log("note added!");
    // Saving notes into JSON Format
    saveNotes(notes);
  } else {
    console.log("This note is already present");
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// Function to remove note
const removeNotes = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

// Function to load notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// Listing all notes
const listNotes = () => {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log(chalk.red.inverse("Empty Notes!"));
  } else {
    console.log(chalk.green.inverse("Notes ::"));
    const titlesToPrint = notes.map((note) => note.title);
    titlesToPrint.forEach((title) => console.log(title));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log("Note not Found");
  }
};

module.exports = {
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNote: readNote,
};
