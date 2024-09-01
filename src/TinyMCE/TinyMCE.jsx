import React, { useState, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor as TinyMCE } from '@tinymce/tinymce-react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import axios from 'axios';
import HtmlRenderer from '../Leetcode/HtmlRenderer';

export default function EditorComponent({ setDescription, initialValue }) {
    const [editorType, setEditorType] = useState('ckeditor');
    const [content, setContent] = useState(initialValue || "<p>Write your Description here.</p>");
    const ckEditorRef = useRef(null);
    const tinyMceRef = useRef(null);

    const handleCKEditorChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
        setDescription(data);
    };

    const handleTinyMceChange = (content, editor) => {
        setContent(content);
        setDescription(content);
    };

    const handleRadioChange = (event) => {
        setEditorType(event.target.value);
    };

    const renderEditor = () => {
        switch (editorType) {
            case 'ckeditor':
                return (
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onReady={(editor) => {
                            ckEditorRef.current = editor;
                            console.log(editor.config.get('contentsCss'));
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
                            contentsCss: ['./customStyles.css'], // Ensure this path is correct
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
                                'importcss autosave save directionality visualchars link media codesample nonbreaking quickbars accordion'
                            ],
                            toolbar:
                                'accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent | forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl'
                        }}
                    />
                );
            case 'textbox':
                return (
                    <div className='md:flex'>
                        <textarea
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setDescription(e.target.value);
                            }}
                            rows={10}
                            style={{ width: '100%', padding: '8px' }}
                        />
                        <div>
                            <h2 className='font-bold bg-slate-300 text-center'>Preview</h2>
                            <p style={{ borderWidth: 1 }} className={`text-lg p-3`}><HtmlRenderer htmlContent={content || ""} /></p>
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
