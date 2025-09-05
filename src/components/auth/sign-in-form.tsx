// 'use client';

// import * as React from 'react';
// import { useRouter } from 'next/navigation';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   Alert,
//   Button,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   Link,
//   OutlinedInput,
//   Stack,
//   Typography
// } from '@mui/material';
// import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
// import { Controller, useForm } from 'react-hook-form';
// import { z as zod } from 'zod';
// import RouterLink from 'next/link';


// const schema = zod.object({
//   email: zod.string().min(1, { message: 'Email is required' }).email(),
//   password: zod.string().min(1, { message: 'Password is required' }),
// });

// type Values = zod.infer<typeof schema>;

// const defaultValues: Values = {
//   email: '',
//   password: '',
// };


// const authClient = {
//   signInWithPassword: async (credentials: { email: string; password: string }) => {
//     try {
//       const res = await fetch('http://localhost:5000/api/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });

//       const data = await res.json();
//       console.log('API response:', data);

//       if (!res.ok) {
//         return { error: data.message || 'Invalid credentials' };
//       }

//       if (data.token) localStorage.setItem('token', data.token);
//       if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

//       return { error: null };
//     } catch (error) {
//       console.error('Fetch error:', error);
//       return { error: 'Server error. Please try again later.' };
//     }
//   },
// };

// export function SignInForm(): React.JSX.Element {
//   const router = useRouter();

//   const [showPassword, setShowPassword] = React.useState(false);
//   const [isPending, setIsPending] = React.useState(false);

//   const {
//     control,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm<Values>({
//     defaultValues,
//     resolver: zodResolver(schema),
//   });

 

//   const onSubmit = React.useCallback(
//   async (values: Values): Promise<void> => {
//     try {
//       setIsPending(true);
//       console.log('Submitting:', values);

//       const { error } = await authClient.signInWithPassword(values);
//       if (error) {
//         console.log('Login error:', error);
//         setError('root', { type: 'server', message: error });
//         return;
//       }

//       console.log('Login successful');
//       router.push('/dashboard');
//     } catch (error) {
//       console.error('Unexpected error:', error);
//       setError('root', { type: 'server', message: 'Something went wrong' });
//     } finally {
//       setIsPending(false);
//     }
//   },
//   [router, setError]
// );

//   return (
//     <Stack spacing={4}>
//       <Stack spacing={1}>
//         <Typography variant="h4">Sign in</Typography>
//         <Typography color="text.secondary" variant="body2">
//           Don&apos;t have an account?{' '}
//           <Link component={RouterLink} href="/auth/sign-up" underline="hover" variant="subtitle2">
//             Sign up
//           </Link>
//         </Typography>
//       </Stack>

//       <form onSubmit={handleSubmit(onSubmit)} noValidate>
//         <Stack spacing={2}>
//           <Controller
//             control={control}
//             name="email"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.email)} fullWidth>
//                 <InputLabel htmlFor="email">Email address</InputLabel>
//                 <OutlinedInput {...field} id="email" label="Email address" type="email" />
//                 {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
//               </FormControl>
//             )}
//           />

//           <Controller
//             control={control}
//             name="password"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.password)} fullWidth>
//                 <InputLabel htmlFor="password">Password</InputLabel>
//                 <OutlinedInput
//                   {...field}
//                   id="password"
//                   label="Password"
//                   type={showPassword ? 'text' : 'password'}
//                   endAdornment={
//                     showPassword ? (
//                       <EyeIcon
//                         cursor="pointer"
//                         fontSize="20px"
//                         onClick={() => setShowPassword(false)}
//                         aria-label="Hide password"
//                       />
//                     ) : (
//                       <EyeSlashIcon
//                         cursor="pointer"
//                         fontSize="20px"
//                         onClick={() => setShowPassword(true)}
//                         aria-label="Show password"
//                       />
//                     )
//                   }
//                 />
//                 {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
//               </FormControl>
//             )}
//           />

//           <Link
//             component={RouterLink}
//             href="/auth/reset-password"
//             variant="subtitle2"
//             underline="hover"
//           >
//             Forgot password?
//           </Link>

//           {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

//           <Button type="submit" variant="contained" disabled={isPending}>
//             {isPending ? 'Signing in...' : 'Sign in'}
//           </Button>
//         </Stack>
//       </form>
//     </Stack>
//   );
// }





// 'use client';

// import * as React from 'react';
// import { useRouter } from 'next/navigation';
// import { zodResolver } from '@hookform/resolvers/zod';
// import {
//   Alert,
//   Button,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   Link,
//   OutlinedInput,
//   Stack,
//   Typography
// } from '@mui/material';
// import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
// import { Controller, useForm } from 'react-hook-form';
// import { z as zod } from 'zod';
// import RouterLink from 'next/link';


// const schema = zod.object({
//   email: zod.string().min(1, { message: 'Email is required' }).email(),
//   password: zod.string().min(1, { message: 'Password is required' }),
// });

// type Values = zod.infer<typeof schema>;

// const defaultValues: Values = {
//   email: '',
//   password: '',
// };


// const authClient = {
//   signInWithPassword: async (credentials: { email: string; password: string }) => {
//     try {
//       const res = await fetch('http://localhost:5000/api/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });

//       const data = await res.json();
//       console.log('API response:', data);

//       if (!res.ok) {
//         return { error: data.message || 'Invalid credentials' };
//       }

//       if (data.token) localStorage.setItem('token', data.token);
//       if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

//       return { error: null };
//     } catch (error) {
//       console.error('Fetch error:', error);
//       return { error: 'Server error. Please try again later.' };
//     }
//   },
// };

// export function SignInForm(): React.JSX.Element {
//   const router = useRouter();

//   const [showPassword, setShowPassword] = React.useState(false);
//   const [isPending, setIsPending] = React.useState(false);

//   const {
//     control,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm<Values>({
//     defaultValues,
//     resolver: zodResolver(schema),
//   });


//   const onSubmit = React.useCallback(
//     async (values: Values): Promise<void> => {
//       try {
//         setIsPending(true);
//         console.log('Submitting:', values);

//         const { error } = await authClient.signInWithPassword(values);
//         if (error) {
//           console.log('Login error:', error);
//           setError('root', { type: 'server', message: error });
//           return;
//         }

//         console.log('Login successful');
//         router.push('/dashboard');
//       } catch (error) {
//         console.error('Unexpected error:', error);
//         setError('root', { type: 'server', message: 'Something went wrong' });
//       } finally {
//         setIsPending(false);
//       }
//     },
//     [router, setError]
//   );

//   return (
//     <Stack spacing={4}>
//       <Stack spacing={1}>
//         <Typography variant="h4">Sign in</Typography>
//         <Typography color="text.secondary" variant="body2">
//           Don&apos;t have an account?{' '}
//           <Link component={RouterLink} href="/auth/sign-up" underline="hover" variant="subtitle2">
//             Sign up
//           </Link>
//         </Typography>
//       </Stack>

//       <form onSubmit={handleSubmit(onSubmit)} noValidate>
//         <Stack spacing={2}>
//           <Controller
//             control={control}
//             name="email"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.email)} fullWidth>
//                 <InputLabel htmlFor="email">Email address</InputLabel>
//                 <OutlinedInput {...field} id="email" label="Email address" type="email" />
//                 {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
//               </FormControl>
//             )}
//           />

//           <Controller
//             control={control}
//             name="password"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.password)} fullWidth>
//                 <InputLabel htmlFor="password">Password</InputLabel>
//                 <OutlinedInput
//                   {...field}
//                   id="password"
//                   label="Password"
//                   type={showPassword ? 'text' : 'password'}
//                   endAdornment={
//                     showPassword ? (
//                       <EyeIcon
//                         cursor="pointer"
//                         fontSize="20px"
//                         onClick={() => setShowPassword(false)}
//                         aria-label="Hide password"
//                       />
//                     ) : (
//                       <EyeSlashIcon
//                         cursor="pointer"
//                         fontSize="20px"
//                         onClick={() => setShowPassword(true)}
//                         aria-label="Show password"
//                       />
//                     )
//                   }
//                 />
//                 {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
//               </FormControl>
//             )}
//           />

//           <Link
//             component={RouterLink}
//             href="/auth/reset-password"
//             variant="subtitle2"
//             underline="hover"
//           >
//             Forgot password?
//           </Link>

//           {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

//           {/* Both buttons side by side or stacked with spacing */}
//           <Stack spacing={2}>
//             <Button type="submit" variant="contained" disabled={isPending}>
//               {isPending ? 'Signing in...' : 'Sign in'}
//             </Button>

//             <Button
//               variant="outlined"
//               disabled={isPending}
//               onClick={() => alert('Google Sign-In clicked!')}
//               startIcon={
//                 <img
//                   src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//                   alt="Google icon"
//                   style={{ width: 20, height: 20 }}
//                 />
//               }
//             >
//               Continue With Google
//             </Button>
//           </Stack>
//         </Stack>
//       </form>
//     </Stack>
//   );
// }







'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import RouterLink from 'next/link';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';


const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues: Values = {
  email: '',
  password: '',
};

const authClient = {
  signInWithPassword: async (credentials: { email: string; password: string }) => {
    try {
      const res = await fetch('https://vinayak-devias-backend-1.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      console.log('API response:', data);

      if (!res.ok) {
        return { error: data.message || 'Invalid credentials' };
      }

      if (data.token) localStorage.setItem('token', data.token);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

      return { error: null };
    } catch (error) {
      console.error('Fetch error:', error);
      return { error: 'Server error. Please try again later.' };
    }
  },
};


async function fetchGoogleUserInfo(accessToken: string) {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch Google user info');
  return await response.json();
}

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({
    defaultValues,
    resolver: zodResolver(schema),
  });

 
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log('Google Login Success:', tokenResponse);

        const userInfo = await fetchGoogleUserInfo(tokenResponse.access_token);
        console.log('Google user info:', userInfo);

        
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('google_access_token', tokenResponse.access_token);

        router.push('/dashboard'); 

      } catch (error) {
        console.error('Failed to fetch Google user info:', error);
        setError('root', { type: 'server', message: 'Google login failed: unable to fetch user info' });
      }
    },
    onError: () => {
      console.error('Google Login Failed');
      setError('root', { type: 'server', message: 'Google login failed' });
    },
    scope: 'email profile openid', 
  });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      try {
        setIsPending(true);
        console.log('Submitting:', values);

        const { error } = await authClient.signInWithPassword(values);
        if (error) {
          console.log('Login error:', error);
          setError('root', { type: 'server', message: error });
          return;
        }

        console.log('Login successful');
        router.push('/dashboard');
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('root', { type: 'server', message: 'Something went wrong' });
      } finally {
        setIsPending(false);
      }
    },
    [router, setError]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} href="/auth/sign-up" underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)} fullWidth>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <OutlinedInput {...field} id="email" label="Email address" type="email" />
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)} fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  {...field}
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="20px"
                        onClick={() => setShowPassword(false)}
                        aria-label="Hide password"
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="20px"
                        onClick={() => setShowPassword(true)}
                        aria-label="Show password"
                      />
                    )
                  }
                />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
            )}
          />

          <Link
            component={RouterLink}
            href="/auth/reset-password"
            variant="subtitle2"
            underline="hover"
          >
            Forgot password?
          </Link>

          {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

          <Stack spacing={2}>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? 'Signing in...' : 'Sign in'}
            </Button>

            <Button
              variant="outlined"
              disabled={isPending}
              onClick={() => googleLogin()}
              // startIcon={
              //   <img
              //     src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              //     alt="Google icon"
              //     style={{ width: 20, height: 20 }}
              //   />
              // }
              startIcon={
  <Image
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google icon"
    width={20}
    height={20}
  />
}

            >
              Continue With Google
            </Button>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
