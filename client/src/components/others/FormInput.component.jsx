import React, { useState } from 'react';



const FormInput = ({ type, placeholder, name, value, onChange, required, ltr, ...rest }) => {

    const [style, setStyle] = useState(null);
    const [passLenght, setPassLenght] = useState(null)


    const onBlurHandle = (e) => {

        if (required && (e.target.value).trim() === '') {
            return setStyle(true);
        } else setStyle(false)
        if (e.target.type === 'password' && (e.target.value).length < 6) {
            return setPassLenght(true)
        } else setPassLenght(false)

    }

    return (
        <>
            <input {...rest} type={type} placeholder={placeholder}
                name={name} value={value} onChange={onChange}
                onBlur={onBlurHandle}
                style={{
                    borderColor: `${style || passLenght ? 'red' : '#ccc'}`, direction: `${ltr ? 'ltr':'rtl'}`
                }}
            />
            {style &&
                <small style={{ color: 'red', marginRight: '1rem' }}> 'این فیلد نمی تواند خالی باشد'</small>}
            {passLenght &&
                <small style={{ color: 'red', marginRight: '1rem' }}> رمز ورود کوتاه است.  </small>
            }
        </>
    )
}

export default FormInput
