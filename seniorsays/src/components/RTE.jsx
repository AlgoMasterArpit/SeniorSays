import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf';

export default function RTE({name, control, label, defaultValue =""}) {

  // 🛠️ AI Magic button ke liye (toolbar se text select karke chalta hai)
  const generateAIResponse = async (action, text) => {
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${conf.openaiApiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Act as a professional editor. Return only the improved version of the text." },
                    { role: "user", content: `Task: ${action}\nOriginal Text: "${text}"` }
                ],
                temperature: 0.7,
            })
        });
        const data = await response.json();
        return data.choices[0]?.message?.content || "Error generating text.";
    } catch (error) {
        console.error("AI Error:", error);
        return "Error connecting to AI.";
    }
  };

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
                                            editor.notificationManager.open({ text: 'AI is working... 🧠', type: 'info', timeout: 2000 });
                                            api.close();
                                            const newText = await generateAIResponse(data.action, selectedContent);
                                            editor.insertContent(newText);
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