import { Plugin, Editor, MarkdownView } from 'obsidian';

export default class ConvertListPlugin extends Plugin {
    onload() {
        this.addCommand({
            id: 'convert-list-format',
            name: 'Convert List Format',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                this.convertSelectedText(editor);
            }
        });
    }

    convertSelectedText(editor: Editor) {
        const selection = editor.getSelection();
        if (!selection) {
            return;
        }

        const convertedText = this.convertText(selection);
        editor.replaceSelection(convertedText);
    }

    convertText(text: string): string {
        let convertedLines = '';
        let lines = text.split(' ∘ ');

        lines.forEach((line, index) => {
            if (line.includes('•')) {
                line = line.replace('• ', '');
                convertedLines += `\t- ${line.trim()}\n`; // Two-level indent for '•'
            } else {
                convertedLines += ` - ${line.trim()}\n`; // One-level indent for '∘'
            }
        });

        return convertedLines;
    }
}
