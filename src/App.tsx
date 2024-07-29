import { Play } from 'lucide-react';
import { editor } from 'monaco-editor';
import React, { useEffect, useRef, useState } from 'react';
import AppBar from './AppBar';
import Editor, { MiddleEditorLanguage } from './components/Editor';
import { Button } from './components/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './components/select';
import { InputType, parse } from './lib/parsers';

function App() {
    const editor1Ref = useRef<editor.IStandaloneCodeEditor | null>(null);
    const editor2Ref = useRef<editor.IStandaloneCodeEditor | null>(null);
    const editor3Ref = useRef<editor.IStandaloneCodeEditor | null>(null);

    const [editor1Format, setEditor1Format] = useState<InputType>(InputType.JSON);
    const handleChangeEditor1Format = (value: string) => setEditor1Format(value as InputType);

    useEffect(() => {
        window.Main.removeLoading();
    }, []);

    const executeCode = () => {
        if (editor1Ref.current && editor2Ref.current && editor3Ref.current) {
            const editor1Value = editor1Ref.current.getValue();
            const jsCode = editor2Ref.current.getValue();

            const editor3Content: any = {};

            const start = new Date().getTime();
            editor3Content.start = start;

            try {
                const input = parse(editor1Value, editor1Format, {separator: ','});

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

                <div className="mx-auto h-[calc(100%-6rem)] flex flex-row justify-between [&>div]:flex-1 space-x-4">
                    <div className="flex flex-col">
                        <div className='flex-1'>
                            <Editor ref={editor1Ref} language={editor1Format} />
                        </div>
                        <div className="p-2">
                            <Select onValueChange={handleChangeEditor1Format} defaultValue={editor1Format}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Object.values(InputType).map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <div className="h-full">
                            <Editor ref={editor2Ref} language={MiddleEditorLanguage.JS} />
                        </div>
                    </div>
                    <div>
                        <div className="h-full">
                            <Editor ref={editor3Ref} language={InputType.JSON} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
