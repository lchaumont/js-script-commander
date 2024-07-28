import { Editor as MonacoEditor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React, { forwardRef, useEffect } from 'react';

type EditorProps = {
    language: 'javascript' | 'json' | 'csv';
    defaultValue?: string;
};

const Editor = forwardRef(function Editor(
    { language, defaultValue }: EditorProps,
    ref: React.ForwardedRef<editor.IStandaloneCodeEditor | null | undefined>
) {
    const handleEditorDidMount = (monacoEditor: editor.IStandaloneCodeEditor) => {
        if (ref && monacoEditor) {
            if (typeof ref === 'function') {
                ref(monacoEditor);
            } else if (ref) {
                ref.current = monacoEditor;
            }
        }
    };

    useEffect(() => {
        if (ref) {
            if (typeof ref !== 'function' && ref.current) {
                editor.setModelLanguage(ref.current.getModel()!, language);
            }
        }
    }, [language]);

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
