import { Play } from 'lucide-react';
import { editor } from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import AppBar from './AppBar';
import Editor from './components/Editor';
import { Button } from './components/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './components/select';

function App() {
    const editor1Ref = useRef<editor.IStandaloneCodeEditor | null>(null);
    const editor2Ref = useRef<editor.IStandaloneCodeEditor | null>(null);
    const editor3Ref = useRef<editor.IStandaloneCodeEditor | null>(null);

    const [editor1Format, setEditor1Format] = useState<'json' | 'csv'>('json');
    const handleChangeEditor1Format = (value: string) => setEditor1Format(value as 'json' | 'csv');

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
                const input =
                    editor1Format === 'json'
                        ? JSON.parse(jsonContent)
                        : jsonContent.split('\n').map((line) => line.trim().split(';'));

                const result = new Function('data', jsCode)(input);

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
                <Button onClick={executeCode} size="icon">
                    <Play className="h-4 w-4" />
                </Button>

                <div className="mx-auto h-[95%] flex flex-row justify-between [&>div]:flex-1 space-x-4">
                    <div className="border-2">
                        <Select onValueChange={handleChangeEditor1Format} defaultValue={editor1Format}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="json">JSON</SelectItem>
                                    <SelectItem value="csv">CSV</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Editor ref={editor1Ref} language={editor1Format} />
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
