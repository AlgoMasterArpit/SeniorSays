import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// . import { useNavigate } from "react-router-dom";
// 

//  useNavigate Kyu chahiye? Jab Senior form submit kar dega, toh kya wo wahin khada rahega? Nahi.

// Kaam: Jaise hi submit function success ho jayega, ye hook user ko Redirect karega:

// Maps('/post/amazon-interview') -> "Chalo bhai, ab apna post padh lo."

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            companyName: post?.companyName || "",
            // 👇 NEW FIELDS (Match with your DB)
            roleType: post?.roleType || "",
            difficulty: post?.difficulty || 1,
            interviewOutcome: post?.interviewOutcome || "Pending",
            resumeFileId: post?.resumeFileId || ""
        },
    });

    const navigate = useNavigate();
    // state.auth.userData: Redux store (jo humara global locker hai) se current user ki ID nikal kar lata hai.
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        // 👇 DIAGNOSTIC LOGS (Yahan check karein)
        console.log("------- DEBUG START -------");
        console.log("1. Redux UserData:", userData);
        
        // Direct Appwrite se poocho: "Kya koi login hai?"
        // Note: Hum try catch block me check karenge niche taaki code clean rahe
        console.log("------- DEBUG END -------");

        // 👇 CHANGE 1: Yahan humne 'userData' ko ek naye variable 'currentUser' mein dala
        let currentUser = userData;
        
        // Agar Redux khali hai (Refresh ki wajah se), toh Appwrite se poocho
        if (!currentUser) {
            try {
                currentUser = await appwriteService.getCurrentUser();
                console.log("2. Live Appwrite User fetched:", currentUser);
            } catch (error) {
                console.log("User fetch failed");
            }
        }

        // Ab check karo (Backup plan ke baad bhi user nahi mila toh roko)
        if (!currentUser) {
            alert("Please login first!");
            return;
        }

        // 1. File Upload Logic (Resume)
        // Agar user ne file dali hai toh upload karo, nahi toh null rehne do
        // new resume file gets uploaded
        const file = data.resume[0] ? await appwriteService.uploadFile(data.resume[0]) : null;

        if (post) {
            // --- EDIT MODE ---
            // Agar nayi file aayi hai, toh purani delete karo
            // Agar file hai (matlab user ne Naya resume upload kiya).
            if (file && post.resumeFileId) {
                appwriteService.deleteFile(post.resumeFileId);
            }
            //  post.$id is slug which tells ki konsa post update karna h
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                // Agar nayi file hai toh uski ID, nahi toh purani ID hi rakho
                //  yha override ki humne id resume ki in database
                resumeFileId: file ? file.$id : post.resumeFileId,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // --- CREATE MODE (New Logic) ---

            // Ab hume check karne ki zaroorat nahi ki file hai ya nahi.
            // Agar file hai toh ID milegi, nahi toh 'null' jayega.
            // Storage bucket in appwrite  me se file  ki ID nikali
            // Scenario B: Agar Senior ne Resume upload NAHI kiya (Optional tha), toh null set kar do.
            const fileId = file ? file.$id : null;
            data.resumeFileId = fileId;

            // Difficulty ko number mein convert karo
            data.difficulty = parseInt(data.difficulty);

            // Direct Create kar do (Alert hata diya)
            const dbPost = await appwriteService.createPost({
                ...data,
                //                  Form mein user ne apna naam ya ID nahi bhara tha.

                // Isliye hum Redux se current user ki ID nikal kar chupke se is packet mein jod rahe hain.

                // Isse Database ko pata chalega ki "Yeh post kisne likha hai?"
                userId: currentUser.$id,
                authorName: currentUser.name
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    //  usecallback used to put this function in cache 
    // Reason: React baar-baar page re-render karta hai. 
    // Agar hum useCallback nahi lagayenge, toh React har baar wo slugTransform function naye sire se banayega, 
    // jisse memory waste hogi aur infinite loop lag sakta hai.
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";/*else return empty string*/
    }, []);

    // Role: of useEffect This is an automated bot that watches the Title field.

    // Action: As soon as the user types in the "Title" box, this code runs slugTransform and automatically fills the "Slug" box.
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();/* this is optimization line like if senior go to home 
        page from this page of adding details in form toh ye watch kaam karta rhega and waste memory 
        so this line stop that*/
    }, [watch, slugTransform, setValue]);/*dependency*/

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {/* LEFT COLUMN 
               - Mobile: w-full (Poori width)
               - Desktop: lg:w-2/3 (66% width)
            */}
            <div className="w-full lg:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Ex: Amazon SDE-1 Interview"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="amazon-sde-1-interview"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                {/* New Field: Company Name */}
                <Input
                    label="Company Name :"
                    placeholder="Ex: Google, Microsoft"
                    className="mb-4"
                    {...register("companyName", { required: true })}
                />

                {/* New Field: Role Type */}
                <Input
                    label="Role Type :"
                    placeholder="Ex: Summer Intern, Full Time, 6 Month Intern"
                    className="mb-4"
                    {...register("roleType", { required: true })}
                />

                <RTE label="Experience Content :" 
                name="content" 
                control={control}
                //getValues("content") wahi purana data laakar editor
                // mein bhar deta hai taaki senior ko dubara shuru se na likhna pade.
                 defaultValue={getValues("content")} />
            </div>

            {/* RIGHT COLUMN 
               - Mobile: w-full (Poori width, Left wale ke neeche)
               - Desktop: lg:w-1/3 (Side mein)
               - mt-4 lg:mt-0: Mobile par thoda gap, Desktop par chipak ke.
            */}
            <div className="w-full lg:w-1/3 px-2 mt-4 lg:mt-0">

                {/* 1. RESUME UPLOAD SECTION */}
                <Input
                    label="Upload Resume (PDF) - Optional :" // Label update kar diya
                    type="file"
                    className="mb-4"
                    accept="application/pdf"
                    {...register("resume", { required: false })} // Ab ye zaroori nahi hai
                />
 
 
                {/* Resume Preview Logic */}
                {post && post.resumeFileId && (
                    <div className="w-full mb-4">
                        <p className="text-white-400 text-sm mb-1">Attached Resume:</p>
                        <a
                            href={appwriteService.getFilePreview(post.resumeFileId)}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded text-teal-400 text-sm hover:bg-slate-700"
                        >
                            📄 View/Download Existing Resume
                        </a>
                    </div>
                )}

                {/* 2. DIFFICULTY LEVEL (1-5) */}
                <Select
                    options={["1", "2", "3", "4", "5"]}
                    label="Difficulty Level (1-Easy, 5-Hard)"
                    className="mb-4"
                    {...register("difficulty", { required: true })}
                />

                {/* 3. INTERVIEW OUTCOME */}
                <Select
                    options={["Selected", "Rejected", "Waitlisted", "Pending"]}
                    label="Outcome"
                    className="mb-4"
                    {...register("interviewOutcome", { required: true })}
                />

                {/* 4. STATUS (Draft/Public) */}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update Experience" : "Submit Experience"}
                </Button>
            </div>
        </form>
    );
}