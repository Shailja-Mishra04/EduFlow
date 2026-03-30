import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import './Workspace.css';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="editor-menubar">
      <div className="menubar-group">
        <button
          className={`menu-btn ${editor.isActive('bold') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <b>B</b>
        </button>
        <button
          className={`menu-btn ${editor.isActive('italic') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <i>I</i>
        </button>
        <button
          className={`menu-btn ${editor.isActive('strike') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
        <button
          className={`menu-btn ${editor.isActive('highlight') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          title="Highlight"
        >
          🖊
        </button>
      </div>

      <div className="menubar-divider" />

      <div className="menubar-group">
        <button
          className={`menu-btn ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </button>
        <button
          className={`menu-btn ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          className={`menu-btn ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </button>
      </div>

      <div className="menubar-divider" />

      <div className="menubar-group">
        <button
          className={`menu-btn ${editor.isActive('bulletList') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>
        <button
          className={`menu-btn ${editor.isActive('orderedList') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
        <button
          className={`menu-btn ${editor.isActive('taskList') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          ☑ Tasks
        </button>
      </div>

      <div className="menubar-divider" />

      <div className="menubar-group">
        <button
          className={`menu-btn ${editor.isActive('blockquote') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          ❝
        </button>
        <button
          className={`menu-btn ${editor.isActive('codeBlock') ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          {'</>'}
        </button>
        <button
          className="menu-btn"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          —
        </button>
      </div>

      <div className="menubar-divider" />

      <div className="menubar-group">
        <input
          type="color"
          className="color-picker"
          title="Text color"
          onChange={e => editor.chain().focus().setColor(e.target.value).run()}
        />
        <button
          className="menu-btn"
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
          }
        >
          ⊞ Table
        </button>
      </div>

      <div className="menubar-divider" />

      <div className="menubar-group">
        <button
          className="menu-btn"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          ↩
        </button>
        <button
          className="menu-btn"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          ↪
        </button>
      </div>
    </div>
  );
};

const Workspace = () => {
  const { subject, unit, topic } = useParams();
  const storageKey = `eduflow-notes-${subject}-${unit}-${topic}`;

  const [pdfUrl, setPdfUrl] = useState(null);
  const [savedStatus, setSavedStatus] = useState('saved');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextStyle,
      Color,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content:
      localStorage.getItem(storageKey) ||
      `<h1>${(topic || '').replace(/-/g, ' ')}</h1><p>Start taking notes here...</p>`,
    onUpdate: ({ editor }) => {
      setSavedStatus('saving...');
      localStorage.setItem(storageKey, editor.getHTML());
      setTimeout(() => setSavedStatus('saved'), 800);
    },
  });

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  };

  // ✅ cleanup to avoid memory leaks
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const formatName = (slug) =>
    (slug || '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="workspace">
      <div className="workspace-header">
        <div className="workspace-breadcrumb">
          <span>{formatName(subject)}</span>
          <span className="breadcrumb-sep">›</span>
          <span>{formatName(unit)}</span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-active">{formatName(topic)}</span>
        </div>
        <div className="workspace-status">
          <span className={`save-status ${savedStatus === 'saved' ? 'saved' : 'saving'}`}>
            {savedStatus === 'saved' ? '✓ Saved' : '⏳ Saving...'}
          </span>
        </div>
      </div>

      <div className="workspace-split">
        <div className="workspace-left">
          <div className="panel-header">
            <span className="panel-title">📄 Document</span>
            <label className="upload-btn">
              Upload PDF
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div className="pdf-viewer">
            {pdfUrl ? (
              <iframe src={pdfUrl} title="PDF Viewer" className="pdf-iframe" />
            ) : (
              <div className="pdf-empty">
                <div className="pdf-empty-icon">📄</div>
                <p>Upload a PDF to view it here</p>
                <label className="upload-btn-large">
                  Choose PDF
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="workspace-divider" />

        <div className="workspace-right">
          <div className="panel-header">
            <span className="panel-title">📝 Notes</span>
          </div>
          <MenuBar editor={editor} />
          <div className="editor-wrap">
            <EditorContent editor={editor} className="editor-content" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;