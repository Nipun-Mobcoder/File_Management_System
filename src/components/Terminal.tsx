"use client";

import { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const XTerminal = ({ content }: { content: string }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true);
    }
  }, []);

  useEffect(() => {
    if (!isBrowser || !terminalRef.current) return;

    const term = new Terminal({
      allowProposedApi: true,
      rows: 10,
      theme: {
        background: '#1e1e1e',
        foreground: '#ffffff'
      }
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    term.write(content.replace(/\n/g, '\r\n'));

    return () => {
      term.dispose();
    };
  }, [isBrowser, content]);

  if (!isBrowser) return null;

  return <div ref={terminalRef} style={{ height: '100%', width: '100%'}} />;
};

export default XTerminal;