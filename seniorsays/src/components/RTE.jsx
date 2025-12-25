import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function RTE({name, control, label, defaultValue =""}) {


  console.log("My API Key is:", conf.geminiApiKey);
  // 🤖 AI Function: Text generate karne ke liye
  const generateAIContent = async (prompt, currentText) => {
    try {
        const genAI = new GoogleGenerativeAI(conf.geminiApiKey);
       // 👇 Updated Model Name
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // AI ko context dein
        const fullPrompt = `
            Act as a professional editor for interview experiences.
            User Request: ${prompt}
            Original Text: "${currentText}"
            
            Return only the improved text, no explanations.
        `;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Error:", error);
        return "Error fetching AI response. Check API Key.";
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
                        
                        // 👇 1. Toolbar mein 'ai_assistant' button add kiya
                        toolbar: "undo redo | blocks | image | bold italic | alignleft aligncenter | ai_assistant | help",
                        
                        // 👇 2. Button ka Logic (Setup Function)
                        setup: (editor) => {
                            editor.ui.registry.addButton('ai_assistant', {
                                text: '✨ AI Magic', // Button ka naam
                                tooltip: 'Improve content with AI',
                                onAction: () => {
                                    // 3. TinyMCE ka Dialog Box kholo
                                    editor.windowManager.open({
                                        title: 'SeniorSays AI Assistant 🤖',
                                        body: {
                                            type: 'panel',
                                            items: [
                                                {
                                                    type: 'selectbox', // Dropdown menu
                                                    name: 'action',
                                                    label: 'What should I do?',
                                                    items: [
                                                        { value: 'Fix Grammar', text: 'Fix Grammar & Spelling' },
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
                                            const selectedContent = editor.selection.getContent(); // User ne jo select kiya
                                            
                                            // Agar kuch select nahi kiya, toh error dikhao
                                            if(!selectedContent) {
                                                editor.notificationManager.open({
                                                    text: 'Please select some text first!',
                                                    type: 'error'
                                                });
                                                return;
                                            }

                                            // Loading dikhao
                                            editor.notificationManager.open({
                                                text: 'AI is thinking... 🧠',
                                                type: 'info',
                                                timeout: 2000
                                            });
                                            api.close();

                                            // AI Call karein
                                            const newText = await generateAIContent(data.action, selectedContent);
                                            
                                            // Result ko editor mein insert karo
                                            editor.insertContent(newText);
                                        }
                                    });
                                }
                            });
                        },
                        
                        plugins: [
                            "image", "advlist", "autolink", "lists", "link", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"
                        ],
                        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                    }}
                    onEditorChange={onChange}
                />
            )}
        />
    </div>
  )
}