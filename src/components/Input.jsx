import React, {useId} from 'react'


const Input = React.forwardRef(function Input({
  label,
  type = "text",
  ...props
}, ref) {
  const id = useId();
  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-base font-semibold text-gray-700 dark:text-purple-200"
        >
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          ref={ref}
          {...props}
          id={id}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white/90 dark:bg-gradient-to-r dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 dark:text-purple-200 text-gray-900 dark:placeholder:text-purple-300/60 placeholder:text-gray-400/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 border-gray-200 dark:border-indigo-700 transition-all duration-300 backdrop-blur-md resize-none text-sm sm:text-base"
          placeholder={props.placeholder}
          autoComplete={props.autoComplete || "off"}
          rows={props.rows || 4}
        />
      ) : type === "select" ? (
        <select
          ref={ref}
          {...props}
          id={id}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white/90 dark:bg-gradient-to-r dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 dark:text-purple-200 text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 border-gray-200 dark:border-indigo-700 transition-all duration-300 backdrop-blur-md text-sm sm:text-base"
        >
          {props.children}
        </select>
      ) : (
        <input
          type={type}
          ref={ref}
          {...props}
          id={id}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl border bg-white/70 dark:bg-gradient-to-r dark:from-gray-800 dark:via-indigo-900 dark:to-purple-900 dark:text-purple-200 text-gray-900 dark:placeholder:text-purple-300/60 placeholder:text-gray-400/70 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 border-gray-200 dark:border-indigo-700 transition-all duration-300 backdrop-blur-md text-sm sm:text-base"
          placeholder={props.placeholder}
          autoComplete={props.autoComplete || "off"}
        />
      )}
    </div>
  );
});

export default Input