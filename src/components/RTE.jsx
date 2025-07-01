import React from 'react'
import {Controller } from 'react-hook-form';


export default function RTE({ label, name, control, defaultValue, rules }) {
    return (
        <div className="mb-4 relative">
            {label && <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200 absolute left-3 top-2 bg-white dark:bg-gray-900 px-1 pointer-events-none transition-all duration-200 transform -translate-y-1/2 scale-90 origin-left">{label}</label>}
            <Controller
            name={name || "content"}
            control={control}
            rules={{ required: "Content is required" }}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <>
                <textarea 
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full min-h-[120px] px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white transition placeholder:opacity-60"
                />
                {error && <p className="text-red-500 text-sm">{error.message}</p>}
                </>
            )}
            />

             </div>
    )
}

