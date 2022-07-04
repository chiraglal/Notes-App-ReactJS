import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");
  const [notes, setNotes] = useState([]);
  const add = (e) => {
    e.preventDefault();
    setNotes((notes) => [
      ...notes,
      {
        id: uuidv4(),
        title,
        description,
      },
    ]);
  };
  const remove = (index) => {
    setNotes((notes) => notes.filter((_, i) => i !== index));
  };
  const filteredNotes = useMemo(() => {
    if (!keyword) {
      return notes;
    }
    return notes.filter(({ title, description }) => {
      return title.includes(keyword) || description.includes(keyword);
    });
  }, [keyword, notes]);
  return (
    <div>
      <form onSubmit={add}>
        <h1>Add Note</h1>
        <div>
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            class="input-group-text"
          />
        </div>
        <div>
          <label>Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            class="input-group-text"
          />
        </div>
        <div>
          <button type="submit" class="btn btn-outline-primary">
            Add
          </button>
        </div>
      </form>
      <form>
        <h1>Search</h1>
        <div>
          <label>Keyword</label>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            class="input-group-text"
            id="basic-addon1"
          />
        </div>
      </form>
      {filteredNotes.map((note, index) => {
        return (
          <div key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <button
              type="button"
              onClick={() => remove(index)}
              class="btn btn-outline-danger"
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}
