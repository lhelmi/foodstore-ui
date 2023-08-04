import * as React from 'react'; 
import { InputText, InputPassword, Button, FormControl, Card, LayoutOne } from 'upkit';
import { useForm } from 'react-hook-form'; 
import { redirect, Link, useNavigate } from 'react-router-dom';

import StoreLogo from '../../components/storeLogo';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../features/auth/actions'; 
import { rules } from './validation';
import { login } from '../../api/auth';
import { STATUSLIST } from '../../features/auth/constants';

export default function Login(){
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const [status, setStatus] = React.useState(STATUSLIST.idle);
    const dispacth = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async ({email, password}) => {
        setStatus(STATUSLIST.process);

        let { data } = await login(email, password);
        if(data.error){
            setStatus(STATUSLIST.error);
            // tangani error bertipe 'invalidCredential'
            setError('password', {type: 'invalidCredential', message: data.message});
            return;
        }
        let { user, token } = data;
        dispacth(userLogin(user, token));
        navigate('/');
        setStatus(STATUSLIST.success);
    }

    return (
        <LayoutOne size="small">
            <br/>
            <Card color="white">
                <div className="text-center mb-5">
                    <StoreLogo/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl errorMessage={errors.email?.message}>
                        <InputText
                        placeholder="Email"
                        fitContainer
                        {...register("email", rules.email)}
                        />
                    </FormControl>
                    <FormControl errorMessage={errors.password?.message}>
                        <InputPassword 
                        placeholder="Password"
                        name="password"
                        fitContainer
                        {...register("password", rules.password)}
                    />
                    </FormControl>
                        <Button fitContainer size="large" disabled={status ==='process'}>Login</Button>
                </form>
                
                <div className="text-center mt-2">
                    <Link to="/register"><b>Daftar sekarang.</b></Link>
                </div>
            </Card>
        </LayoutOne>
    );
}