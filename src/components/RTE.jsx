import React from 'react'
import {Controller } from 'react-hook-form';


export default function RTE({ label, name, control, defaultValue, rules }) {
    return (
        <div className="mb-6">
            {label && <label className="block mb-2 text-base font-semibold text-gray-700 dark:text-purple-200">{label}</label>}
            <Controller
                name={name || "content"}
                control={control}
                rules={rules || { required: "Content is required" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <textarea
                            value={value}
                            onChange={e => onChange(e.target.value)}
                            className="w-full min-h-[120px] px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white/90 dark:bg-gradient-to-r dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 dark:text-purple-200 text-gray-900 dark:placeholder:text-purple-300/60 placeholder:text-gray-400/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 border-gray-200 dark:border-indigo-700 transition-all duration-300 backdrop-blur-md resize-none text-sm sm:text-base"
                        />
                        {error && <p className="text-red-500 text-xs mt-1 ml-1">{error.message}</p>}
                    </>
                )}
            />
        </div>
    );
}

