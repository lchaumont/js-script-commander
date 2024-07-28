import React, { useEffect } from 'react';
import AppBar from './AppBar';

function App() {
    useEffect(() => {
        window.Main.removeLoading();
    }, []);

    return (
        <div className="flex flex-col h-[100vh]">
            {window.Main && (
                <div className="flex-none">
                    <AppBar />
                </div>
            )}

            <main className="h-full">
                <div className="mx-auto p-4 h-full flex flex-row justify-between [&>div]:flex-1 space-x-4">
                    <div className="border-2">Hello</div>
                    <div className="border-2">Hello</div>
                    <div className="border-2">Hello</div>
                </div>
            </main>
        </div>
    );
}

export default App;
