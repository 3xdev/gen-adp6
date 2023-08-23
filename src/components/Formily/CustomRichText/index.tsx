import { useState, useEffect } from 'react';
import { connect } from '@formily/react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { uploadImages } from '@/services/ant-design-pro/api';
import '@wangeditor/editor/dist/css/style.css';

const CustomRichText = connect((props: any) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState(props.value);
  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {};
  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    MENU_CONF: {
      uploadImage: {
        async customUpload(file: File, insertFn: any) {
          // TS 语法
          uploadImages(file)
            .then((res) => insertFn(res.url))
            .catch((e) => console.log(e));
        },
      },
    },
  };

  useEffect(() => {
    return () => {
      if (editor === null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  useEffect(() => {
    props.onChange(html);
  }, [html]);

  return (
    <div style={{ border: '1px solid rgba(0,0,0,0.12)' }}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Editor
        defaultConfig={editorConfig}
        value={html}
        onCreated={setEditor}
        onChange={(editor) => setHtml(editor.getHtml())}
        mode="default"
        style={{ height: '500px', overflowY: 'hidden' }}
      />
    </div>
  );
});

export default CustomRichText;
