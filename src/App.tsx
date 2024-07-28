import { editor } from 'monaco-editor';
import React, { useEffect, useRef } from 'react';
import AppBar from './AppBar';
import Editor from './components/Editor';

function App() {
    const editor1Ref = useRef<editor.IStandaloneCodeEditor | null>(null);
    const editor2Ref = useRef<editor.IStandaloneCodeEditor | null>(null);
    const editor3Ref = useRef<editor.IStandaloneCodeEditor | null>(null);

    useEffect(() => {
        window.Main.removeLoading();
    }, []);

    const executeCode = () => {
        if (editor1Ref.current && editor2Ref.current && editor3Ref.current) {
            const jsonContent = editor1Ref.current.getValue();
            const jsCode = editor2Ref.current.getValue();

            const editor3Content: any = {};

            const start = new Date().getTime();
            editor3Content.start = start;

            try {
                const jsonData = JSON.parse(jsonContent);

                const result = new Function('data', jsCode)(jsonData);

                const end = new Date().getTime();
                editor3Content.end = end;
                editor3Content.time = `${end - start}ms`;
                editor3Content.status = `Success`;

                if (result !== undefined) {
                    editor3Content.result = result;
                } else {
                    editor3Content.result = 'No return value';
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    const end = new Date().getTime();
                    editor3Content.end = end;
                    editor3Content.time = `${end - start}ms`;
                    editor3Content.status = `Error`;
                    editor3Content.result = {
                        name: error.name,
                        message: error.message,
                        stack: error.stack?.split('\n').map((line: string) => line.trim()) ?? []
                    };
                }
            }

            editor3Ref.current.setValue(JSON.stringify(editor3Content, null, 4));
        }
    };

    return (
        <div className="flex flex-col h-[100vh]">
            {window.Main && (
                <div className="flex-none">
                    <AppBar />
                </div>
            )}

            <main className="h-full p-4 space-y-4">
                <div className="mx-auto h-[95%] flex flex-row justify-between [&>div]:flex-1 space-x-4">
                    <div className="border-2">
                        <Editor ref={editor1Ref} language="json" />
                    </div>
                    <div className="border-2">
                        <Editor ref={editor2Ref} language="javascript" />
                    </div>
                    <div className="border-2">
                        <Editor ref={editor3Ref} language="json" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
