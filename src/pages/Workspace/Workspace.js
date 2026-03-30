import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function Workspace() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing your notes...</p>",
  });

  if (!editor) return null;

  return (
    <div style={styles.container}>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>

        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>

        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. List
        </button>

        <button onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </button>

        <button onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </button>
      </div>

      {/* Editor */}
      <div style={styles.editorBox}>
        <EditorContent editor={editor} />
      </div>

    </div>
  );
}

const styles = {
  container: {
    height: "100%",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },

  toolbar: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },

  editorBox: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    background: "#fff",
    overflowY: "auto",
  },
};

export default Workspace;