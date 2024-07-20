import { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Dashboard } from '@mui/icons-material';

export default function Tinymce({ setDescription, initialValue }) {
    const editorRef = useRef(null);

    const logContent = (content) => {
        if (editorRef.current) {
            setDescription(content);
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/tinymce/js/tinymce/tinymce.min.js';  
        script.referrerPolicy = 'origin';
        script.onload = () => {
            tinymce.init({
                selector: '#editor',
                height: 500,
                menubar: true,
                resize: false,
                autosave_ask_before_unload: true,
                powerpaste_allow_local_images: true,
                plugins: [
                    'a11ychecker', 'advcode', 'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen',
                    'image', 'editimage', 'lists', 'link', 'fontselect', 'fontsizeselect', 'media', 'powerpaste', 'preview', 'searchreplace',
                    'table', 'tinymcespellchecker', 'visualblocks', 'wordcount', 'emoticons', 'insertdatetime',
                    'print', 'save', 'textcolor', 'colorpicker', 'charmap'
                ],
                toolbar: 'insertfile a11ycheck undo redo | bold italic underline | blocks fontsizeinput fontfamily | forecolor backcolor | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons charmap | preview fullscreen',
                spellchecker_dialog: true,
                spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
                menu: {
                   
                    edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall' },
                    view: { title: 'View', items: 'code | visualaid visualblocks' },
                    insert: { title: 'Insert', items: 'image link media emoticons charmap codesample inserttable' },
                    format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats | removeformat' },
                    tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
                    table: { title: 'Table', items: 'inserttable | cell row column' },
                   
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
                                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                const base64 = reader.result.split(',')[1];
                                const blobInfo = blobCache.create(id, file, base64);
                                blobCache.add(blobInfo);

                                callback(blobInfo.blobUri(), { title: file.name });
                            };
                            reader.readAsDataURL(file);
                        };
                        input.click();
                    }
                },
                setup: (editor) => {
                    editorRef.current = editor;
                    editor.on('change', () => {
                        logContent(editor.getContent());
                    });
                }
            });
        };
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
            if (tinymce.EditorManager.get(editorRef.current)) {
                tinymce.EditorManager.remove(editorRef.current);
            }
        };
    }, []);

    return (
        <div >
        <div style={{position:"absolute",right:10,marginTop:2,paddingBottom:20,paddingRight:50,paddingLeft:50,backgroundColor:"white",zIndex:999,fontSize:20}}>
           <strong>CFC</strong> 
        </div>
            <textarea id="editor" defaultValue={initialValue ? initialValue : "<p>Write your Description here.</p>"} />
            <div style={{position:"absolute",right:0,top:854,paddingRight:50,paddingLeft:15,backgroundColor:"white",zIndex:999,fontSize:14}}>
          build by <strong>CFC</strong> 
        </div>
        </div>
    );
}
