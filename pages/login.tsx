import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Grid, TextField, Snackbar } from '@mui/material';
import { useUser } from '../src/context/authContext';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { useRouter } from 'next/router';

interface IFormInput {
  username: string;
  email: string;
  password: string;
  code: string;
}

export default function Login() {
  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState<string>('');
  const { user, setUser } = useUser();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { username, password, code } = data;
    const confirmedUser = await Auth.signIn(username, password);
    console.log('success, signed in user', confirmedUser);
    if (confirmedUser) {
      router.push('/');
    } else {
      throw new Error('Something went wrong');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Grid
          mt={4}
          container
          justifyContent={'center'}
          direction={'column'}
          alignItems={'center'}
          spacing={2}
        >
          <Grid item>
            <TextField
              error={errors.username ? true : false}
              helperText={errors.username ? errors.username.message : null}
              variant='outlined'
              id='username'
              label='Username'
              type={'text'}
              {...register('username', {
                required: { value: true, message: 'Please Enter a username.' },
                minLength: {
                  value: 3,
                  message: 'Please enter a username between 3-16 characters.',
                },
                maxLength: {
                  value: 16,
                  message: 'Please enter a username between 3-16 characters.',
                },
              })}
            />
          </Grid>
          <Grid item>
            <TextField
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : null}
              variant='outlined'
              id='password'
              label='Password'
              type={'password'}
              {...register('password', {
                required: { value: true, message: 'Please Enter a password.' },
              })}
            />
          </Grid>

          <Grid item>
            <Button variant='contained' type='submit'>
              Log In
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={loginError}
      />
    </>
  );
}
