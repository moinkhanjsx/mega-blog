import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    ...props
}, ref){
    const id = useId()
    return (
        <div className="mb-4 relative">
            {label && <label 
            htmlFor={id}
            className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-200 absolute left-3 top-2 bg-white dark:bg-gray-900 px-1 pointer-events-none transition-all duration-200 transform -translate-y-1/2 scale-90 origin-left"
            >
                {label}
            </label>
            }
            <input
            type={type}
            ref={ref}
            {...props}
            id={id}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800 dark:text-white transition placeholder:opacity-60"
            />
        </div>
    )
})

export default Input