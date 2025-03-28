import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import { Button, Card, ButtonGroup } from "react-bootstrap";

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onFocus?: () => void;
  onInputActivity?: () => void;
}

const TextEditor = ({ content, onChange, onFocus, onInputActivity }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Underline, BulletList, OrderedList, Blockquote, CodeBlock, Heading.configure({ levels: [1, 2, 3] })],
    content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      onChange(newContent);

      if (onInputActivity) onInputActivity();
    }
  });

  if (!editor) {
    return null;
  }

  return (
    <Card className="p-3 text-editor-card">
      <div className="editor-toolbar-wrapper px-5">
        <ButtonGroup className="ms-5 editor-toolbar">
          <Button variant="outline-primary" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
            <strong>B</strong>
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
            <em>I</em>
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}>
            <u>U</u>
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
            • Lista
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
            1. Lista
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
            “ Citazione
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}>
            ` Codice
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
            active={editor.isActive("heading", { level: 1 })}
          >
            H1
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
          >
            H2
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
          >
            H3
          </Button>
        </ButtonGroup>
      </div>
      {/* Contenuto dell'editor */}
      <EditorContent editor={editor} onFocus={onFocus} className="editor-content" />

      {/* Pulsante per pulire il contenuto */}
      <Button variant="outline-secondary" size="sm" className="mt-2" onClick={() => editor.commands.clearContent()}>
        Pulisci Testo
      </Button>
    </Card>
  );
};

export default TextEditor;
