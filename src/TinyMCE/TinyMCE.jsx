

// import { useRef, useEffect } from 'react';
// import { Editor } from '@tinymce/tinymce-react';
// import { Dashboard } from '@mui/icons-material';

// export default function Tinymce({ setDescription, initialValue }) {
//     const editorRef = useRef(null);

//     const logContent = (content) => {
//         if (editorRef.current) {
//             setDescription(content);
//         }
//     };

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = '/src/tinymceLib/js/tinymce/tinymce.min.js';  
//         script.referrerPolicy = 'origin';
//         script.onload = () => {
//             tinymce.init({
//                 selector: '#editor',
//                 height: 500,
//                 menubar: true,
//                 resize: false,
//                 autosave_ask_before_unload: true,
//                 powerpaste_allow_local_images: true,
//                 plugins: [
//                     'a11ychecker', 'advcode', 'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen',
//                     'image', 'editimage', 'lists', 'link', 'fontselect', 'fontsizeselect', 'media', 'powerpaste', 'preview', 'searchreplace',
//                     'table', 'tinymcespellchecker', 'visualblocks', 'wordcount', 'emoticons', 'insertdatetime',
//                     'print', 'save', 'textcolor', 'colorpicker', 'charmap'
//                 ],
//                 toolbar: 'insertfile a11ycheck undo redo | bold italic underline | blocks fontsizeinput fontfamily | forecolor backcolor | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons charmap | preview fullscreen',
//                 spellchecker_dialog: true,
//                 spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
//                 content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
//                 menu: {
                   
//                     edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
//                     view: { title: 'View', items: 'code | visualaid visualblocks' },
//                     insert: { title: 'Insert', items: 'image link media emoticons charmap codesample inserttable' },
//                     format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats | removeformat' },
//                     tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
//                     table: { title: 'Table', items: 'inserttable | cell row column' },
                   
//                 },
//                 file_picker_callback: (callback, value, meta) => {
//                     if (meta.filetype === 'image') {
//                         const input = document.createElement('input');
//                         input.setAttribute('type', 'file');
//                         input.setAttribute('accept', 'image/*');
//                         input.onchange = function() {
//                             const file = this.files[0];
//                             const reader = new FileReader();
//                             reader.onload = function () {
//                                 const id = 'blobid' + (new Date()).getTime();
//                                 const blobCache = tinymce.activeEditor.editorUpload.blobCache;
//                                 const base64 = reader.result.split(',')[1];
//                                 const blobInfo = blobCache.create(id, file, base64);
//                                 blobCache.add(blobInfo);

//                                 callback(blobInfo.blobUri(), { title: file.name });
//                             };
//                             reader.readAsDataURL(file);
//                         };
//                         input.click();
//                     }
//                 },
//                 setup: (editor) => {
//                     editorRef.current = editor;
//                     editor.on('change', () => {
//                         logContent(editor.getContent());
//                     });
//                 }
//             });
//         };
//         document.body.appendChild(script);
//         return () => {
//             document.body.removeChild(script);
//             if (tinymce.EditorManager.get(editorRef.current)) {
//                 tinymce.EditorManager.remove(editorRef.current);
//             }
//         };
//     }, []);

//     return (
//         // <></>
//         <div >
//         <div style={{position:"absolute",right:10,marginTop:2,paddingBottom:20,paddingRight:50,paddingLeft:50,backgroundColor:"white",zIndex:999,fontSize:20}}>
//            <strong>CFC</strong> 
//         </div>
//             <textarea id="editor" defaultValue={initialValue ? initialValue : "<p>Write your Description here.</p>"} />
//             <div style={{position:"absolute",right:0,top:854,paddingRight:50,paddingLeft:15,backgroundColor:"white",zIndex:999,fontSize:14}}>
//           build by <strong>CFC</strong> 
//         </div>
//         </div>
//     );
// }
// import { useRef, useState, useEffect } from 'react';
// import FroalaEditor from 'react-froala-wysiwyg';
// import 'froala-editor/js/plugins.pkgd.min.js';
// import 'froala-editor/js/froala_editor.pkgd.min.js';
// import 'froala-editor/css/froala_editor.pkgd.min.css';
// import 'froala-editor/css/froala_style.min.css';
// import axios from 'axios';
// import CircularProgress from '@mui/material/CircularProgress';

// export default function Tinymce({ setDescription, initialValue }) {
//     const [content, setContent] = useState(initialValue ? initialValue : "<p>Write your Description here.</p>");
//     const [loading, setLoading] = useState(false);
//     const editorRef = useRef(null);

//     const handleModelChange = (newContent) => {
//         setContent(newContent);
//         setDescription(newContent);
//     };

//     useEffect(() => {
//         setContent(initialValue);
//     }, [initialValue]);

//     const handleImageUpload = async (files) => {
//         const file = files[0];
//         const formData = new FormData();
//         formData.append('file', file);

//         setLoading(true);
//         try {
//             const response = await axios.post('https://hytechlabs.online:9090/Files/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             const uploadedImageUrl = response.data.fileUrl; // Adjust according to your server's response structure
//             // Insert the image into the editor
//             if (editorRef.current && editorRef.current.editor) {
//                 editorRef.current.editor.image.insert(uploadedImageUrl, null, null, editorRef.current.editor.image.get(), file);
//             }
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={{ position: 'relative' }}>
//             {loading && (
//                 <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
//                     <CircularProgress />
//                 </div>
//             )}
//             <FroalaEditor
//                 ref={editorRef}
//                 tag='textarea'
//                 model={content}
//                 onModelChange={handleModelChange}
//                 config={{
//                     height: 500,
//                     toolbarButtons: [
//                         'bold', 'italic', 'underline', 'paragraphFormat', 'alert',
//                         'align', 'formatOL', 'formatUL', 'indent', 'outdent',
//                         'insertLink', 'insertImage', 'insertTable', 'emoticons', 'fontFamily', 'fontSize', 'color',
//                         'specialCharacters', 'fullscreen', 'html', 'save', 'print', 'spellChecker', 'search', 'undo', 'redo'
//                     ],
//                     pluginsEnabled: [
//                         'align', 'codeBeautifier', 'codeView', 'colors', 'draggable', 'emoticons', 'fontAwesome', 'image', 'link', 'lists',
//                         'paragraphFormat', 'quote', 'save', 'spellChecker', 'table', 'url', 'wordPaste'
//                     ],
//                     events: {
//                         'image.beforeUpload': function (files) {
//                             // Prevent the default upload
//                             handleImageUpload(files);
//                             return false;
//                         }
//                     },
//                 }}
//             />
//         </div>
//     );
// }


import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default function Tinymce({ setDescription, initialValue }) {
    const editorRef = useRef(null);

    const logContent = (event, editor) => {
        const data = editor.getData();
        if (editorRef.current) {
            setDescription(data);
        }
    };

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={initialValue ? initialValue : "<p>Write your Description here.</p>"}
                onReady={editor => {
                    editorRef.current = editor;
                }}
                onChange={logContent}
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
                    extraPlugins: [MyCustomUploadAdapterPlugin]
                }}
            />
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

            // Use the returned URL in the editor
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