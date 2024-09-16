import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';


 const WriteBlog=forwardRef((prop,ref) => {
   
  const editorRef = useRef(null);
 
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return {content:editorRef.current.getContent(), image:editorRef.current.dom.select('img')[0]?.currentSrc}
    }
  }));
 
  return (
    <div >
      <Editor
        apiKey='yfxzagt4r4he3i832noecd2k5bm98unndhdwffl5sdjfl9jk'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue=""
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
      
    
      
    </div>
  );
})

export default WriteBlog