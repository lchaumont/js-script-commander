import { Editor as MonacoEditor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React, { forwardRef } from 'react';

type EditorProps = {
    language: 'javascript' | 'json';
    defaultValue?: string;
};

const Editor = forwardRef(function Editor(
    { language, defaultValue }: EditorProps,
    ref: React.ForwardedRef<editor.IStandaloneCodeEditor | null | undefined>
) {
    const handleEditorDidMount = (monacoEditor: editor.IStandaloneCodeEditor) => {
        if (ref && monacoEditor) {
            ref.current = monacoEditor;
        }
    };

    return (
        <MonacoEditor
            height="100%"
            defaultLanguage={language}
            defaultValue={defaultValue}
            theme="dark-modern"
            onMount={handleEditorDidMount}
        />
    );
});

export default Editor;
