import { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import TextEditor from "../components/TextEditor";
import "../assets/home.css";
import { GiKatana, GiScrollUnfurled } from "react-icons/gi";
import { useEffect } from "react";

const Home = () => {
  const { notes, addNote, deleteNote } = useNotes();
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<{ name: string; isSuggested: boolean }[]>([]);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<typeof setTimeout> | null>(null); // ✅ FIX
  const [showHaiku, setShowHaiku] = useState(false);
  const [theme, setTheme] = useState<"kyoto" | "nezuko" | "tokyo">("kyoto");
  const [editingNote, setEditingNote] = useState<null | { id: string; content: string }>(null);

  useEffect(() => {
    document.body.classList.remove("theme-kyoto", "theme-nezuko", "theme-tokyo");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);
  const disablePetals = () => {
    window.dispatchEvent(new Event("petals-off"));
  };

  const enablePetals = () => {
    window.dispatchEvent(new Event("petals-on"));
  };

  const handleInputActivity = () => {
    disablePetals();

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      enablePetals();
    }, 100); // 0.1 secondi di inattività

    setTypingTimeout(timeout);
  };

  const handleSave = () => {
    if (content.trim()) {
      addNote(
        content,
        categories.map((c) => c.name)
      );
      setContent("");
      setCategories([]);
      enablePetals(); // petali riprendono dopo salvataggio
      setShowHaiku(true);
      setTimeout(() => setShowHaiku(false), 3000);
    }
  };

  return (
    <>
      <div className={`theme-background-image theme-${theme}`}></div>

      <Container className="my-5">
        <h2 className="text-center text-primary mb-4">
          Death Note
          <span className="theme-kanji">
            {theme === "kyoto" && "古都"}
            {theme === "nezuko" && "鬼血"}
            {theme === "tokyo" && "電光"}
          </span>
        </h2>

        <div className="theme-selector text-center mb-4">
          <Button variant="outline-light" size="sm" className="me-2" onClick={() => setTheme("kyoto")}>
            🏯 Kyoto
          </Button>
          <Button variant="outline-light" size="sm" className="me-2" onClick={() => setTheme("nezuko")}>
            🎎 Nezuko
          </Button>
          <Button variant="outline-light" size="sm" onClick={() => setTheme("tokyo")}>
            🌃 Tokyo
          </Button>
        </div>

        <div className="note-scroll-container">
          <div className="note-scroll-inner">
            {notes.map((note) => (
              <div key={note.id} className="note-scroll-card">
                <Card
                  className={`note-card ${deletingNoteId === note.id ? "note-card-exit" : ""}`}
                  onClick={() => setEditingNote({ id: note.id, content: note.content })}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <Card.Text className="note-content" dangerouslySetInnerHTML={{ __html: note.content }} />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingNoteId(note.id);
                        document.body.classList.add("katana-slash");

                        setTimeout(() => {
                          deleteNote(note.id);
                          setDeletingNoteId(null);
                          document.body.classList.remove("katana-slash");
                        }, 400);
                      }}
                      style={{ display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      <GiKatana />
                      Elimina
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Card className={`note-creator-card note-ink mt-5`}>
          <Card.Body>
            <div className="note-ink-glow" />
            <div className="card-header-kanji">
              <h5 className="note-title">✒️ Scrivi la tua nota</h5>
              <span className="kanji-subtitle">書の魂</span>
            </div>

            <div className="editor-wrapper mt-3">
              <TextEditor content={content} onChange={setContent} onFocus={disablePetals} onInputActivity={handleInputActivity} />
            </div>

            <div className="category-wrapper mt-4 mb-3">
              <Row className="gx-2 gy-2">
                {categories.map((cat, index) => (
                  <Col key={index} xs="auto">
                    <Button
                      className={`btn-category ${cat.isSuggested ? "suggested" : "selected"}`}
                      style={{ display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      {cat.name}
                    </Button>
                  </Col>
                ))}
              </Row>
            </div>

            <div className="text-end">
              <Button variant="success" className="btn-save-note" onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <GiScrollUnfurled />
                Salva Nota
              </Button>
            </div>
          </Card.Body>
        </Card>
        {editingNote && (
          <div className="edit-overlay">
            <div className="edit-modal">
              <h5 className="mb-3">📝 Modifica Nota</h5>
              <TextEditor content={editingNote.content} onChange={(newContent) => setEditingNote({ ...editingNote, content: newContent })} />

              <div className="text-end mt-3" style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="secondary" onClick={() => setEditingNote(null)}>
                  Annulla
                </Button>
                <Button
                  className="btn-save-note"
                  variant="primary"
                  onClick={() => {
                    deleteNote(editingNote.id);
                    addNote(editingNote.content, []); // oppure mantieni categorie se vuoi
                    setEditingNote(null);
                  }}
                >
                  Salva Modifica
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
      {showHaiku && (
        <div className="haiku-popup">
          <div className="haiku-box">
            <p>風に舞う</p>
            <p>月下の花よ</p>
            <p>心静か</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
