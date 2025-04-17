import "./InputField.css";

function InputField({type, id, name, title, register, errors, watch}) {
    return (
        <label htmlFor={id} className="form-input">
            {title}
            <input
                type={type}
                id={id}
                placeholder={title}
                {...register(name,
                    name === "username" ? {
                            required: {
                                value: true,
                                message: "Oops! It looks like you missed a field"
                            },
                            minLength: {
                                value: 6,
                                message: "Oops! Username needs to be at least 6 characters"
                            }
                        } :
                        name === "email" ? {
                            required: {
                                value: true,
                                message: "Oops! It looks like you missed a field"
                            },
                            validate: (value) =>
                                value.includes("@") || "Oops! Please enter a valid email address"
                        } : name === "password" ? {
                            required: {
                                value: true,
                                message: "Oops! It looks like you missed a field"
                            },
                            minLength: {
                                value: 6,
                                message: "Oops! Password needs to be at least 6 characters"
                            }
                        } : name === "password-check" ? {
                            required: {
                                value: true,
                                message: "Please confirm your password"
                            },
                            validate: (value) =>
                                value === watch("password") || "Oops! Passwords do not match"
                        } : {}
                )}
            />
            {errors[name] && <p>{errors[name]?.message}</p>}
        </label>
    );
}

export default InputField;