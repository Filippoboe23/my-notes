import { useState, useEffect } from "react";
import { Note } from "../types";

const STORAGE_KEY = "notes";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const addNote = (content: string, categories: string[]) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      content,
      categories,
      createdAt: Date.now(),
    };
    saveNotes([newNote, ...notes]);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotes(updatedNotes);
  };

  const updateNote = (noteUpdated: Note) => {
    const { id } = noteUpdated;
    const index = notes.findIndex((note) => note.id === id);

    if (index === -1) return;
    const newNotes = [...notes];
    newNotes.splice(index, 1, noteUpdated);
    saveNotes(newNotes);
  };

  return { notes, addNote, deleteNote, updateNote };
}
