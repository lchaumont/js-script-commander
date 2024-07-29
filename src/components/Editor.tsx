import { Editor as MonacoEditor } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React, { forwardRef, useEffect } from 'react';
import { InputType } from '../lib/parsers';

export enum MiddleEditorLanguage {
    JS = 'javascript',
}

type EditorProps = {
    language: InputType | MiddleEditorLanguage;
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
                editor.setModelLanguage(ref.current.getModel()!, language.toLocaleLowerCase());
            }
        }
    }, [language]);

    return (
        <MonacoEditor
            defaultLanguage={language.toLocaleLowerCase()}
            defaultValue={defaultValue}
            theme="dark-modern"
            onMount={handleEditorDidMount}
        />
    );
});

export default Editor;
