const chalk = require("chalk");
const yargs = require("yargs");
// const validator = require("validator");
const notes = require("./notes.js");

// yargs.version("1.1.0");

//create add command
yargs.command({
  command: "add",
  describe: "Add a note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNotes(argv.title, argv.body);
  },
});

console.log(yargs.argv);

//create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note Removal Title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    //passsing the argv.title for removal
    notes.removeNotes(argv.title);
  },
});

//create list command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler(argv) {
    // console.log("Listing all notes !");
    notes.listNotes();
  },
});

//create read command
yargs.command({
  command: "read",
  describe: "Read note",
  builder: {
    title: {
      describe: "Read note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // console.log("Reading all notes !");
    notes.readNote(argv.title);
  },
});

//add, remove, read, list

// console.log(yargs.argv); // This statement of accessing argv using yargs, makes yargs to parse the arguments, if we want to make this another way, we can simply use => yargs.parse(), instead of console.log(yargs.argv)

yargs.parse();
