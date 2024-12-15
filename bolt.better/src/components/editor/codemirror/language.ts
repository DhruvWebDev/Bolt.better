import { LanguageDescription } from '@codemirror/language';

export const supportedLanguages = [
  LanguageDescription.of({
    name: 'TS',
    extensions: ['ts'],
    async load() {
      return import('@codemirror/lang-javascript').then((module) => module.javascript({ typescript: true }));
    },
  }),
  LanguageDescription.of({
    name: 'JS',
    extensions: ['js', 'mjs', 'cjs'],
    async load() {
      return import('@codemirror/lang-javascript').then((module) => module.javascript());
    },
  }),
  LanguageDescription.of({
    name: 'TSX',
    extensions: ['tsx'],
    async load() {
      return import('@codemirror/lang-javascript').then((module) => module.javascript({ jsx: true, typescript: true }));
    },
  }),
  LanguageDescription.of({
    name: 'JSX',
    extensions: ['jsx'],
    async load() {
      return import('@codemirror/lang-javascript').then((module) => module.javascript({ jsx: true }));
    },
  }),
  LanguageDescription.of({
    name: 'HTML',
    extensions: ['html'],
    async load() {
      return import('@codemirror/lang-html').then((module) => module.html());
    },
  }),
  LanguageDescription.of({
    name: 'CSS',
    extensions: ['css'],
    async load() {
      return import('@codemirror/lang-css').then((module) => module.css());
    },
  }),
  LanguageDescription.of({
    name: 'SASS',
    extensions: ['sass'],
    async load() {
      return import('@codemirror/lang-sass').then((module) => module.sass({ indented: true }));
    },
  }),
  LanguageDescription.of({
    name: 'SCSS',
    extensions: ['scss'],
    async load() {
      return import('@codemirror/lang-sass').then((module) => module.sass({ indented: false }));
    },
  }),
  LanguageDescription.of({
    name: 'JSON',
    extensions: ['json'],
    async load() {
      return import('@codemirror/lang-json').then((module) => module.json());
    },
  }),
  LanguageDescription.of({
    name: 'Markdown',
    extensions: ['md'],
    async load() {
      return import('@codemirror/lang-markdown').then((module) => module.markdown());
    },
  }),
  LanguageDescription.of({
    name: 'Wasm',
    extensions: ['wat'],
    async load() {
      return import('@codemirror/lang-wast').then((module) => module.wast());
    },
  }),
  LanguageDescription.of({
    name: 'Python',
    extensions: ['py'],
    async load() {
      return import('@codemirror/lang-python').then((module) => module.python());
    },
  }),
  LanguageDescription.of({
    name: 'C++',
    extensions: ['cpp'],
    async load() {
      return import('@codemirror/lang-cpp').then((module) => module.cpp());
    },
  }),
];

export async function getLanguage(fileName: string) {
  const languageDescription = LanguageDescription.matchFilename(supportedLanguages, fileName);

  if (languageDescription) {
    return await languageDescription.load();
  }

  return undefined;
}

/*
Key Parts of the Code:
supportedLanguages Array:

This array contains a list of LanguageDescription objects that define different programming languages.
Each LanguageDescription object specifies:
name: The name of the language (e.g., "TS", "JS", "Python").
extensions: The file extensions associated with the language (e.g., .ts for TypeScript, .js for JavaScript).
load: An asynchronous function that dynamically imports the necessary CodeMirror language module for that language.
The dynamic load function for each language imports the corresponding language module from CodeMirror (@codemirror/lang-*) and returns the language support (e.g., JavaScript, TypeScript, CSS) when needed.

getLanguage Function:

This function takes a fileName (typically a file path or name) as an argument.
It uses LanguageDescription.matchFilename(supportedLanguages, fileName) to check if the file's extension matches any of the supported languages in the supportedLanguages array.
If a match is found, it dynamically loads the appropriate language module (e.g., TypeScript, Python, HTML) by calling languageDescription.load().
If no match is found, it returns undefined.
What it does:
Purpose: This code is designed to provide dynamic syntax highlighting and language support in CodeMirror based on the file type.
How it works:
When a file is opened (or passed to the getLanguage function), the function checks the file extension.
Based on the file extension, it loads the corresponding language module for that language.
The language module will provide syntax highlighting, autocompletion, and other language-specific features for that file type in CodeMirror.     */