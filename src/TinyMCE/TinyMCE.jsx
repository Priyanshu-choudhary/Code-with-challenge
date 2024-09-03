import React, { useState, useRef, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import axios from 'axios';
import HtmlRenderer from '../Leetcode/HtmlRenderer';
import beautify from 'js-beautify';
import MonacoEditor from '@monaco-editor/react';
export default function EditorComponent({ setDescription, initialValue }) {
    const [editorType, setEditorType] = useState('textbox');
    const [content, setContent] = useState(initialValue || "<p>Write your Description here.</p>");
    const [formattedContent, setFormattedContent] = useState('');
    const ckEditorRef = useRef(null);
    const tinyMceRef = useRef(null);
    const [livePreview, setlivePreview] = useState(content)

    // Function to beautify the HTML content
    const formatHtml = (html) => {
        return beautify.html(html, {
            indent_size: 2,
            wrap_line_length: 80,
            preserve_newlines: true,
            max_preserve_newlines: 2,
        });
    };

    // Automatically beautify content when the editor type changes
    const beautifyContent = () => {
        const beautified = formatHtml(livePreview);
        setContent(beautified);
        setFormattedContent(beautified);
    };
    const handleMonacoChange = (value) => {
        setContent(value);
        setDescription(value);
        setlivePreview(value)
    };
    const handleCKEditorChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
        setDescription(data);
    };

    const handleTinyMceChange = (content, editor) => {
        setContent(content);
        setDescription(content);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        setDescription(e.target.value);
    };

    const handleRadioChange = (event) => {
        setEditorType(event.target.value);
    };

    useEffect(() => {
        beautifyContent();
    }, [editorType,livePreview]);

    const renderEditor = () => {
        switch (editorType) {
            case 'ckeditor':
                return (
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onReady={(editor) => {
                            ckEditorRef.current = editor;
                        }}
                        onChange={handleCKEditorChange}
                        config={{
                            toolbar: [
                                'heading', '|',
                                'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
                                'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
                                'undo', 'redo', '|',
                                'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', 'mediaEmbed', 'imageUpload'
                            ],
                            fontFamily: {
                                options: [
                                    'default',
                                    'Arial, Helvetica, sans-serif',
                                    'Courier New, Courier, monospace',
                                    'Georgia, serif',
                                    'Lucida Sans Unicode, Lucida Grande, sans-serif',
                                    'Tahoma, Geneva, sans-serif',
                                    'Times New Roman, Times, serif',
                                    'Trebuchet MS, Helvetica, sans-serif',
                                    'Verdana, Geneva, sans-serif'
                                ]
                            },
                            fontSize: {
                                options: [
                                    'tiny',
                                    'small',
                                    'default',
                                    'big',
                                    'huge'
                                ]
                            },
                            fontColor: {
                                columns: 5,
                                documentColors: 10
                            },
                            fontBackgroundColor: {
                                columns: 5,
                                documentColors: 10
                            },
                            image: {
                                toolbar: [
                                    'imageStyle:full', 'imageStyle:side', '|',
                                    'imageTextAlternative'
                                ]
                            },
                            extraPlugins: [MyCustomUploadAdapterPlugin],
                            contentsCss: ['./customStyles.css'],
                        }}
                    />
                );
            case 'tinymce':
                return (
                    <TinyMCE
                        apiKey="b0jhzd6koxrs4kg17tsddbbfge2vxtw19f3tetxllvoshkc2"
                        value={content}
                        onEditorChange={handleTinyMceChange}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount',
                                'emoticons textcolor colorpicker textpattern',
                                'importcss autosave save directionality visualchars link media codesample nonbreaking quickbars'
                            ],
                            toolbar: 'blocks fontfamily fontsize | bold italic underline | code | customPlaceholder',
                            setup: (editor) => {
                                // Add a custom button to insert the placeholder
                                editor.ui.registry.addButton('customPlaceholder', {
                                    text: 'Insert Editor',
                                    onAction: () => {
                                        editor.insertContent('<div data-placeholder="InPageEditor">[InPageEditor]</div>');
                                    },
                                });
                            },
                        }}
                    />
                );
            case 'textbox':
                return (
                    <div className='md:flex'>
                        <div style={{ width: "100%", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
                            <div style={{ width: "100%" }}>
                                <h2 className='font-bold bg-slate-300 text-center'>Editor</h2>

                                <MonacoEditor
                                    height="150vh"
                                    language="html"
                                    theme="vs-dark"
                                    value={content}
                                    onChange={handleMonacoChange}

                                    options={{
                                        minimap: { enabled: false },
                                        scrollbar: {
                                            vertical: 'hidden',
                                            horizontal: 'hidden',
                                        },
                                    }}
                                />
                            </div>

                        </div>

                        <div style={{maxWidth:"50%"}}>
                            <div className='flex'>
                                <div style={{ width: 1, backgroundColor: "black" }}></div>
                                <h2 className='font-bold bg-slate-300 text-center w-full'>Preview</h2>
                            </div>
                            <p style={{ borderWidth: 1 }} className={`text-lg p-3`}>
                                <HtmlRenderer htmlContent={formattedContent || content} />
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Select Editor</FormLabel>
                <RadioGroup
                    row
                    aria-label="editor"
                    name="editor"
                    value={editorType}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="ckeditor" control={<Radio />} label="CKEditor" />
                    <FormControlLabel value="tinymce" control={<Radio />} label="TinyMCE" />
                    <FormControlLabel value="textbox" control={<Radio />} label="Direct Html" />
                </RadioGroup>
            </FormControl>
            <div>
                {renderEditor()}
            </div>
        </div>
    );
}

// Custom upload adapter for CKEditor
function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new MyUploadAdapter(loader);
    };
}

class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    async upload() {
        const file = await this.loader.file;
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://hytechlabs.online:9090/Files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Upload response:', response.data);

            return {
                default: response.data.fileUrl
            };
        } catch (error) {
            console.error('Error uploading image:', error.response ? error.response.data : error.message);
            throw new Error('Error uploading image!');
        }
    }

    abort() {
        // Abort handling
    }
}
