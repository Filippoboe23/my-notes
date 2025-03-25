import { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import TextEditor from "../components/TextEditor";

const Home = () => {
  const { notes, addNote, deleteNote } = useNotes();
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<
    { name: string; isSuggested: boolean }[]
  >([]);

  const handleSave = () => {
    if (content.trim()) {
      addNote(
        content,
        categories.map((c) => c.name)
      );
      setContent("");
      setCategories([]);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center text-primary mb-4">Gestione Note</h2>

      <Row>
        {notes.map((note) => (
          <Col md={6} lg={4} key={note.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Text dangerouslySetInnerHTML={{ __html: note.content }} />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteNote(note.id)}
                >
                  Elimina
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="mt-4">
        <Card.Body>
          <h5 className="text-secondary">Crea una nuova nota</h5>
          <TextEditor content={content} onChange={setContent} />

          <Row className="mt-3">
            {categories.map((cat, index) => (
              <Col key={index} xs="auto">
                <Button
                  variant={cat.isSuggested ? "outline-primary" : "primary"}
                  className="me-2"
                >
                  {cat.name}
                </Button>
              </Col>
            ))}
          </Row>

          <Button variant="success" className="mt-3" onClick={handleSave}>
            Salva Nota
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
