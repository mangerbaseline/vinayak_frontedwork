// 'use client';

// import * as React from 'react';
// import RouterLink from 'next/link';
// import { useRouter } from 'next/navigation';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import InputLabel from '@mui/material/InputLabel';
// import Link from '@mui/material/Link';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
// import { EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
// import { Controller, useForm } from 'react-hook-form';
// import { z as zod } from 'zod';

// import { paths } from '@/paths';
// import { authClient } from '@/lib/auth/client';
// import { useUser } from '@/hooks/use-user';

// const schema = zod.object({
//   email: zod.string().min(1, { message: 'Email is required' }).email(),
//   password: zod.string().min(1, { message: 'Password is required' }),
// });

// type Values = zod.infer<typeof schema>;

// const defaultValues = { email: 'sofia@devias.io', password: 'Secret1' } satisfies Values;

// export function SignInForm(): React.JSX.Element {
//   const router = useRouter();

//   const { checkSession } = useUser();

//   const [showPassword, setShowPassword] = React.useState<boolean>();

//   const [isPending, setIsPending] = React.useState<boolean>(false);

//   const {
//     control,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

//   const onSubmit = React.useCallback(
//     async (values: Values): Promise<void> => {
//       setIsPending(true);

//       const { error } = await authClient.signInWithPassword(values);

//       if (error) {
//         setError('root', { type: 'server', message: error });
//         setIsPending(false);
//         return;
//       }

//       // Refresh the auth state
//       await checkSession?.();

//       // UserProvider, for this case, will not refresh the router
//       // After refresh, GuestGuard will handle the redirect
//       router.refresh();
//     },
//     [checkSession, router, setError]
//   );

//   return (
//     <Stack spacing={4}>
//       <Stack spacing={1}>
//         <Typography variant="h4">Sign in</Typography>
//         <Typography color="text.secondary" variant="body2">
//           Don&apos;t have an account?{' '}
//           <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
//             Sign up
//           </Link>
//         </Typography>
//       </Stack>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Stack spacing={2}>
//           <Controller
//             control={control}
//             name="email"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.email)}>
//                 <InputLabel>Email address</InputLabel>
//                 <OutlinedInput {...field} label="Email address" type="email" />
//                 {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />
//           <Controller
//             control={control}
//             name="password"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.password)}>
//                 <InputLabel>Password</InputLabel>
//                 <OutlinedInput
//                   {...field}
//                   endAdornment={
//                     showPassword ? (
//                       <EyeIcon
//                         cursor="pointer"
//                         fontSize="var(--icon-fontSize-md)"
//                         onClick={(): void => {
//                           setShowPassword(false);
//                         }}
//                       />
//                     ) : (
//                       <EyeSlashIcon
//                         cursor="pointer"
//                         fontSize="var(--icon-fontSize-md)"
//                         onClick={(): void => {
//                           setShowPassword(true);
//                         }}
//                       />
//                     )
//                   }
//                   label="Password"
//                   type={showPassword ? 'text' : 'password'}
//                 />
//                 {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />
//           <div>
//             <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
//               Forgot password?
//             </Link>
//           </div>
//           {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
//           <Button disabled={isPending} type="submit" variant="contained">
//             Sign in
//           </Button>
//         </Stack>
//       </form>
//       <Alert color="warning">
//         Use{' '}
//         <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
//           sofia@devias.io
//         </Typography>{' '}
//         with password{' '}
//         <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
//           Secret1
//         </Typography>
//       </Alert>
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
      const res = await fetch('http://localhost:5000/api/users/login', {
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

          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Signing in...' : 'Sign in'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
