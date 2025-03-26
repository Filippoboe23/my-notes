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
    }, 2000); // 2 secondi di inattività

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
      <div className="sidebar-scroll">
        <div className="kanji-scroll">筆記録</div>
      </div>
      <Container className="mt-4">
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
                <Card className={`note-card ${deletingNoteId === note.id ? "note-card-exit" : ""}`}>
                  <Card.Body>
                    <Card.Text className="note-content" dangerouslySetInnerHTML={{ __html: note.content }} />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
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
