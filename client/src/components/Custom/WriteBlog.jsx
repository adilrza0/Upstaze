import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';


export default function WriteBlog({setContent}) {
   
  const editorRef = useRef(null);
  const htmlContent = '<h1>This is a heading rendered from HTML</h1><p>This is a paragraph.</p>';
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  //editorRef.current = editor
  return (
    <div >
      <Editor
        apiKey='yfxzagt4r4he3i832noecd2k5bm98unndhdwffl5sdjfl9jk'
        onInit={(_evt, editor) => setContent(editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'image'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify  image | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
      <div dangerouslySetInnerHTML={{ __html: (htmlContent+ editorRef?.current?.getContent()) }} />
      
    </div>
  );
}