import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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

export default function Signup() {
  const [open, setOpen] = useState(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [signupError, setSignUpError] = useState<string>('');
  const { user, setUser } = useUser();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      if (showCode) {
        confirmSignup(data);
      } else {
        await signUpWithEmailAndPassword(data);
        setShowCode(true);
      }
    } catch (err) {
      console.error(err);
      setSignUpError(err.message);
      setOpen(true);
    }
  };

  async function signUpWithEmailAndPassword(
    data: IFormInput
  ): Promise<CognitoUser> {
    const { username, email, password } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function confirmSignup(data: IFormInput) {
    const { username, password, code } = data;
    try {
      await Auth.confirmSignUp(username, code);
      const confirmedUser = await Auth.signIn(username, password);
      console.log('success, signed in user', confirmedUser);
      if (confirmedUser) {
        router.push('/');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log('the value of the user is', user);

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
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : null}
              variant='outlined'
              id='email'
              label='Email'
              type={'text'}
              {...register('email', {
                required: { value: true, message: 'Please Enter a email.' },
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
          {showCode && (
            <Grid item>
              <TextField
                error={errors.code ? true : false}
                helperText={errors.code ? errors.code.message : null}
                variant='outlined'
                id='code'
                label='Verification Code'
                type={'text'}
                {...register('code', {
                  required: {
                    value: true,
                    message: 'Please Enter a username.',
                  },
                  minLength: {
                    value: 6,
                    message: 'Please enter the code.',
                  },
                  maxLength: {
                    value: 6,
                    message: 'Please enter the code.',
                  },
                })}
              />
            </Grid>
          )}
          <Grid item>
            <Button variant='contained' type='submit'>
              {showCode ? 'Confirm Code' : 'Sign Up'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={signupError}
      />
    </>
  );
}
