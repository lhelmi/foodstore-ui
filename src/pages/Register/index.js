import * as React from 'react'; 
import {
    FormControl, LayoutOne, InputText, InputPassword, Button, Card
} from 'upkit';
import { useForm } from 'react-hook-form';
import { rules } from './validation';
import { registerUser } from '../../api/auth';

export default function Register(){
    let { register, handleSubmit, formState: { errors }, setError } = useForm();

    const onSubmit = async formData => {
        let { password, password_confirmation } = formData;
        if(password !== password_confirmation){
            return setError('password_confirmation', {
                type: 'equality',
                message : 'Konfirmasi password harus sama dengan password!'
            });
        }
        let { data } = await registerUser(formData);
        if(data.error){
            let fields = Object.keys(data.fields);

            fields.forEach(field => {
                setError(field, {type : 'server', message: data.fields[field]?.properties?.message});
            });
        }
    }

    return (
        <LayoutOne size='small'>
            <Card color='white'>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <FormControl errorMessage={errors.full_name?.message}>
                        <InputText placeholder="Nama Lengkap" fitContainer {...register("full_name", rules.full_name)} />
                    </FormControl>
                    <FormControl errorMessage={errors.email?.message}>
                        <InputText placeholder='Email' fitContainer {...register("email", rules.email)}/>
                    </FormControl>
                    <FormControl errorMessage={errors.password?.message}>
                        <InputPassword placeholder='Password' fitContainer {...register("password", rules.password)}/>
                    </FormControl>
                    <FormControl errorMessage={errors.password_confirmation?.message}>
                        <InputPassword placeholder='Konfirmasi Password' fitContainer {...register("password_confirmation", rules.password_confirmation)}/>
                    </FormControl>

                    <Button size={"large"} fitContainer>Mendaftar</Button>
                </form>
            </Card>
        </LayoutOne>
    )
}