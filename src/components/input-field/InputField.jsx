import "./InputField.css";

function InputField({type, id, name, title, register}) {
    return (
        <label htmlFor={id}>
            {title}
            <input
                type={type}
                {...register(name)}
                id={id}
                placeholder={title}
            />
        </label>
    );
}

export default InputField;