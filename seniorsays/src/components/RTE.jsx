import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf';
import { aiRewrite } from '../utils/aiRewrite';

export default function RTE({name, control, label, defaultValue =""}) {

  return (
    <div className='w-full'> 
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

        <Controller
            name={name || "content"}
            control={control}
            render={({field: {onChange}}) => (
                <Editor
                    apiKey={conf.tinymceApiKey} 
                    initialValue={defaultValue}
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            "image", "advlist", "autolink", "lists", "link", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
                        ],
                        toolbar: "undo redo | blocks | image | bold italic | alignleft aligncenter | ai_assistant | help",
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        
                        // 👇 SETUP START
                        setup: (editor) => {
                            
                            // 🟢 AI Magic Button
                            editor.ui.registry.addButton('ai_assistant', {
                                text: '✨ AI Magic',
                                tooltip: 'Fix Grammar, Professional Tone',
                                onAction: () => {
                                    editor.windowManager.open({
                                        title: 'SeniorSays AI Assistant 🤖',
                                        body: {
                                            type: 'panel',
                                            items: [
                                                {
                                                    type: 'selectbox',
                                                    name: 'action',
                                                    label: 'Choose Action',
                                                    items: [
                                                        { value: 'Fix Grammar & Spelling', text: 'Fix Grammar & Spelling' },
                                                        { value: 'Make Professional', text: 'Make Tone Professional' },
                                                        { value: 'Summarize', text: 'Summarize Selection' },
                                                        { value: 'Expand', text: 'Expand/Explain More' }
                                                    ]
                                                }
                                            ]
                                        },
                                        buttons: [
                                            { type: 'cancel', text: 'Cancel' },
                                            { type: 'submit', text: 'Generate', primary: true }
                                        ],
                                        onSubmit: async (api) => {
                                            const data = api.getData();
                                            const selectedContent = editor.selection.getContent();
                                            
                                            if(!selectedContent) {
                                                editor.notificationManager.open({ text: 'Please select text first!', type: 'error' });
                                                return;
                                            }
                                            api.close();
                                            //  timeout: 0 = apne aap band nahi hoga. Purana 2000ms request
                                            //  se pehle hi gayab ho jaata tha aur user ko lagta tha kuch hua hi nahi.
                                            const working = editor.notificationManager.open({ text: 'AI is working... 🧠', type: 'info', timeout: 0 });

                                            try {
                                                const newText = await aiRewrite(data.action, selectedContent, conf.openaiApiKey);
                                                editor.insertContent(newText);
                                            } catch (error) {
                                                //  Yahan insertContent JAAN BOOJH KE nahi hai. insertContent
                                                //  selection ko replace karta hai — fail hone pe kuch bhi insert
                                                //  karna user ka chuna hua text mita dega. Sirf batao, chhedo mat.
                                                console.error("AI Error:", error);
                                                editor.notificationManager.open({ text: `AI fail hui: ${error.message}`, type: 'error' });
                                            } finally {
                                                working.close();
                                            }
                                        }
                                    });
                                }
                            });

                        }, // 👈 SETUP ENDS HERE (Correct)
                    }}
                    onEditorChange={onChange}
                />
            )}
        />
    </div>
  )
}