'use client';
import { useState } from 'react';
import { useLang } from '@/hooks/useLang';
import SlideInLeft from '../Sliders/slideInLeft';
import { postFeedback } from '@/api/post';
import SuccessMessage from '../Success/Success';
import ErrorMessage from '../Error/Error';

export default function Feedback() {
    const { t, ready } = useLang();
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await postFeedback({ email, text });
            setSubmitted(true);
            setEmail('');
            setText('');
        } catch (err) {
            setError('Not success');
        }
    };

    if (!ready) return null;

    return (
        <section
            className="flex justify-center py-12 media bg-primary"
            id="feedback-section"
        >
            <div className="bg-white dark:bg-gray-800 p-6 w-full md:w-[40%]">
                <SlideInLeft>
                    <div className="mb-6 flex justify-center gap-3 text-lg 
                                  text-primary dark:text-gray-300 font-bold">
                        {t.contact}
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm font-medium">
                                {t.email}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none 
                                           focus:ring-2 focus:ring-secondary dark:bg-gray-900
                                         dark:border-gray-700 dark:text-white"
                                placeholder="email@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block mb-1 text-sm font-medium">
                                {t.message}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md resize-none 
                                           focus:outline-none focus:ring-2 focus:ring-secondary
                                         dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                                placeholder={t.message_input}
                                required
                            />
                        </div>

                        {error && <ErrorMessage message={error} />}
                        {submitted && <SuccessMessage message={t.success} />}

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-secondary text-white font-semibold 
                                          px-6 py-1.5 rounded hover:opacity-90 transition"
                            >
                                {t.send}
                            </button>
                        </div>
                    </form>
                </SlideInLeft>
            </div>
        </section>
    );
}
