import * as React from 'react'; 
import {
    FormControl, LayoutOne, InputText, InputPassword, Button, Card
} from 'upkit';
import { useForm } from 'react-hook-form';
import { rules } from './validation';
import { registerUser } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import StoreLogo from '../../components/storeLogo/index';
import { STATUSLIST } from '../../features/auth/constants';

export default function Register(){
    let { register, handleSubmit, formState: { errors }, setError } = useForm();
    let [ status, setStatus ] = React.useState(STATUSLIST.idle);
    let navigate = useNavigate();

    const onSubmit = async formData => {
        let { password, password_confirmation } = formData;
        if(password !== password_confirmation){
            return setError('password_confirmation', {
                type: 'equality',
                message : 'Konfirmasi password harus sama dengan password!'
            });
        }
        setStatus(STATUSLIST.process);
        let { data } = await registerUser(formData);
        if(data.error){
            setStatus(STATUSLIST.error);
            let fields = Object.keys(data.fields);

            fields.forEach(field => {
                setError(field, {type : 'server', message: data.fields[field]?.properties?.message});
            });
            return;
        }
        
        setStatus(STATUSLIST.success);
        navigate('/register/success');
    }

    return (
        <LayoutOne size='small'>
            <Card color='white'>
                <div className='text-center mb-5'>
                    < StoreLogo />
                </div>
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

                    <Button size={"large"} fitContainer disabled={status === STATUSLIST.process}>
                        { status === STATUSLIST.process ? 'Sedang Memproses' : 'Mendaftar' }
                    </Button>
                </form>
                <div className='text-center mt-3'>
                    Sudah Punya Akun? Login Sekarang <Link to='/login'><b>Masuk Sekarang</b></Link>
                </div>
            </Card>
        </LayoutOne>
    )
}