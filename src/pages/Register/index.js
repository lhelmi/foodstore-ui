import * as React from 'react'; 
import {
    FormControl, LayoutOne, InputText, InputPassword, Button, Card
} from 'upkit';
import { useForm } from 'react-hook-form';

export default function Register(){
    let { register, handleSubmit, formState: { errors }, setError } = useForm();

    const onSubmit = async formData => {
        console.log(formData)
    }

    return (
        <LayoutOne size='small'>
            <Card color='white'>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <FormControl>
                        <InputText placeholder="Nama Lengkap" fitContainer {...register("full_name", { required: true })} />
                    </FormControl>
                    <FormControl>
                        <InputText placeholder='Email' fitContainer {...register("email", { required: true })}/>
                    </FormControl>
                    <FormControl>
                        <InputPassword placeholder='Password' fitContainer {...register("password", { required: true })}/>
                    </FormControl>
                    <FormControl>
                        <InputPassword placeholder='Konfirmasi Password' fitContainer {...register("password_confirmation", { required: true })}/>
                    </FormControl>

                    <Button size={"large"} fitContainer>Mendaftar</Button>
                </form>
            </Card>
        </LayoutOne>
    )
}