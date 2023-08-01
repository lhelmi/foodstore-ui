const rules = {
    full_name : {
        required : { value : true, message : 'Nama Lenghap Harus diisi.' },
        maxLength : { value: 500, message : 'Panjang Nama Lengkap Karakter 500' }
    },
    email : {
        required : { value : true, message : 'Email Harus diisi.' },
        maxLength : { value: 255, message : 'Panjang Email Karakter 255' },
        pattern : { value : /^([\w-.]+@([\w-]+.)+[\w-]{2,4})?$/, message : 'Email Tidak Valid' }
    },
    password : {
        required : { value : true, message : 'Password Harus diisi.' },
        maxLength : { value: 255, message : 'Password Lengkap Karakter 255' }
    },

    password_confirmation : {
        required : { value : true, message : 'Konfirmasi Password Harus diisi.' }
    },
    
}

export {
    rules
}