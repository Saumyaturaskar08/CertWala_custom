function Button({
  children,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-4 py-2
        rounded-lg
        font-medium
        cursor-pointer
        transition
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;