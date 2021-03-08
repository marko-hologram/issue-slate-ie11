import Head from 'next/head';

// Import the Slate editor factory.
import { createEditor, Editor, Text, Transforms } from 'slate';

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react';
import { useCallback, useMemo, useState } from 'react';

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    });

    return !!match;
  },

  isUnderlineMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.underline === true,
      universal: true,
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    console.log('toggleBoldMark editor: ', editor);
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(editor, { bold: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(editor, { type: isActive ? null : 'code' }, { match: (n) => Editor.isBlock(editor, n) });
  },

  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    Transforms.setNodes(editor, { underline: isActive ? null : true }, { match: (n) => Text.isText(n), split: true });
  },
};

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        textDecoration: props.leaf.underline ? 'underline' : 'none',
      }}
    >
      {props.children}
    </span>
  );
};

export default function Home() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App Slate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
        <button
          style={{ color: CustomEditor.isBoldMarkActive(editor) ? 'red' : '' }}
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          BOLD
        </button>
        <Editable
          style={{ minHeight: '300px', border: '1px solid #eee', padding: '20px' }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            // Replace the `onKeyDown` logic with our new commands.
            switch (event.key) {
              case '`': {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break;
              }

              case 'b': {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
                break;
              }

              case 'u': {
                event.preventDefault();
                CustomEditor.toggleUnderlineMark(editor);
                break;
              }
            }
          }}
        />
      </Slate>
    </div>
  );
}
