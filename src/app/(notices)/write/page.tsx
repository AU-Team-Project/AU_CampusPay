'use client'
import React from 'react';
import {useSession} from "next-auth/react";

const Page = () => {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const {data: session} = useSession();

        const formData = event.currentTarget;
        const username = (formData.elements.namedItem("username") as HTMLInputElement)?.value;
        const title = (formData.elements.namedItem("title") as HTMLInputElement)?.value;
        const content = (formData.elements.namedItem("content") as HTMLTextAreaElement)?.value;

        const data = {
            user_id: session?.user._id,
            username: session?.user.username,
            title: title,
            content: content,
        };

        try {
            const response = await fetch('/api/admin/write', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" />
            <input type="text" name="title" />
            <textarea name="content"/>
            <button type='submit'>제출</button>
        </form>
    );
};

export default Page;