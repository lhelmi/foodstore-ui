const rules = {
    email : {
        required : { value :true, message : 'Email Harus diisi' },
        maxLength : { value: 255, message : 'Panjang Email Maksimal 255 Karakter' }
    },
    password : {
        required : { value :true, message : 'Password Harus diisi' },
        maxLength : { value: 255, message : 'Panjang Password Maksimal 255 Karakter' }
    }
}

export {
    rules
}