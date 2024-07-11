import { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Dashboard } from '@mui/icons-material';

export default function Tinymce({ setDescription, initialValue }) {
    const editorRef = useRef(null);

    const logContent = (content) => {
        // console.log(content);
        setDescription(content);
    };

    return (
        <>
            <Dashboard />
            <Editor
                apiKey='b0jhzd6koxrs4kg17tsddbbfge2vxtw19f3tetxllvoshkc2'
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={initialValue ? initialValue : "<p>Write your Description here.</p>"}
                init={{
                    height: 500,
                    menubar: true,
                    resize: false,
                    autosave_ask_before_unload: true,
                    powerpaste_allow_local_images: true,
                    plugins: [
                        'a11ychecker', 'advcode', 'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help',
                        'image', 'editimage', 'lists', 'link', 'fontselect', 'fontsizeselect', 'media', 'powerpaste', 'preview', 'searchreplace',
                        'table', 'tinymcespellchecker', 'visualblocks', 'wordcount', 'emoticons', 'insertdatetime',
                        'print', 'save', 'textcolor', 'colorpicker', 'charmap'
                    ],
                    toolbar: 'insertfile a11ycheck undo redo | bold italic underline | blocks fontsizeinput fontfamily | forecolor backcolor | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons charmap | preview fullscreen',
                    spellchecker_dialog: true,
                    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                    menu: {
                        file: { title: 'File', items: 'newdocument restoredraft | preview | print | save' },
                        edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
                        view: { title: 'View', items: 'code | visualaid visualblocks' },
                        insert: { title: 'Insert', items: 'image link media emoticons charmap codesample inserttable' },
                        format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats | removeformat' },
                        tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
                        table: { title: 'Table', items: 'inserttable | cell row column' },
                        help: { title: 'Help', items: 'help' }
                    },
                    file_picker_callback: (callback, value, meta) => {
                        if (meta.filetype === 'image') {
                            const input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');
                            input.onchange = function() {
                                const file = this.files[0];
                                const reader = new FileReader();
                                reader.onload = function () {
                                    const id = 'blobid' + (new Date()).getTime();
                                    const blobCache = editorRef.current.editorUpload.blobCache;
                                    const base64 = reader.result.split(',')[1];
                                    const blobInfo = blobCache.create(id, file, base64);
                                    blobCache.add(blobInfo);

                                    callback(blobInfo.blobUri(), { title: file.name });
                                };
                                reader.readAsDataURL(file);
                            };
                            input.click();
                        }
                    }
                }}
                onEditorChange={logContent}
            />
        </>
    );
}
