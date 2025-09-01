// 'use client';

// import * as React from 'react';
// import RouterLink from 'next/link';
// import { useRouter } from 'next/navigation';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormHelperText from '@mui/material/FormHelperText';
// import InputLabel from '@mui/material/InputLabel';
// import Link from '@mui/material/Link';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { Controller, useForm } from 'react-hook-form';
// import { z as zod } from 'zod';

// import { paths } from '@/paths';
// import { authClient } from '@/lib/auth/client';
// import { useUser } from '@/hooks/use-user';

// const schema = zod.object({
//   firstName: zod.string().min(1, { message: 'First name is required' }),
//   lastName: zod.string().min(1, { message: 'Last name is required' }),
//   email: zod.string().min(1, { message: 'Email is required' }).email(),
//   password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
//   terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
// });

// type Values = zod.infer<typeof schema>;

// const defaultValues = { firstName: '', lastName: '', email: '', password: '', terms: false } satisfies Values;

// export function SignUpForm(): React.JSX.Element {
//   const router = useRouter();

//   const { checkSession } = useUser();

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

//       const { error } = await authClient.signUp(values);

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
//     <Stack spacing={3}>
//       <Stack spacing={1}>
//         <Typography variant="h4">Sign up</Typography>
//         <Typography color="text.secondary" variant="body2">
//           Already have an account?{' '}
//           <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
//             Sign in
//           </Link>
//         </Typography>
//       </Stack>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Stack spacing={2}>
//           <Controller
//             control={control}
//             name="firstName"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.firstName)}>
//                 <InputLabel>First name</InputLabel>
//                 <OutlinedInput {...field} label="First name" />
//                 {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />
//           <Controller
//             control={control}
//             name="lastName"
//             render={({ field }) => (
//               <FormControl error={Boolean(errors.firstName)}>
//                 <InputLabel>Last name</InputLabel>
//                 <OutlinedInput {...field} label="Last name" />
//                 {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />
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
//                 <OutlinedInput {...field} label="Password" type="password" />
//                 {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
//               </FormControl>
//             )}
//           />
//           <Controller
//             control={control}
//             name="terms"
//             render={({ field }) => (
//               <div>
//                 <FormControlLabel
//                   control={<Checkbox {...field} />}
//                   label={
//                     <React.Fragment>
//                       I have read the <Link>terms and conditions</Link>
//                     </React.Fragment>
//                   }
//                 />
//                 {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
//               </div>
//             )}
//           />
//           {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
//           <Button disabled={isPending} type="submit" variant="contained">
//             Sign up
//           </Button>
//         </Stack>
//       </form>
//       <Alert color="warning">Created users are not persisted</Alert>
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
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

// Validation schema
const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
  terms: zod.boolean().refine(v => v, 'You must accept the terms and conditions'),
});

type Values = zod.infer<typeof schema>;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: false,
    },
    resolver: zodResolver(schema),
  });

  

  const onSubmit = React.useCallback(
  async (values: Values) => {
    setIsPending(true);
    setError('root', {}); 

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       
        body: JSON.stringify({
  firstName: values.firstName,
  lastName: values.lastName,
  email: values.email,
  password: values.password,
}),

      });

      const data = await res.json();

      if (res.ok) {
          router.push('/login');
      } 
      else {
        setError('root', { type: 'server', message: data.message || 'Registration failed' });
      }


    } catch {
      setError('root', { type: 'server', message: 'Server error. Please try again later.' });
    } finally {
      setIsPending(false);
    }
  },
  [router, setError]
);


  return (
    <Stack spacing={3} maxWidth={400} margin="auto" mt={5}>
      <Typography variant="h4" component="h1" align="center">
        Sign up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          {/* First Name */}
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.firstName}>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <OutlinedInput id="firstName" {...field} label="First Name" />
                {errors.firstName && <FormHelperText>{errors.firstName.message}</FormHelperText>}
              </FormControl>
            )}
          />

          {/* Last Name */}
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.lastName}>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <OutlinedInput id="lastName" {...field} label="Last Name" />
                {errors.lastName && <FormHelperText>{errors.lastName.message}</FormHelperText>}
              </FormControl>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.email}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput id="email" {...field} label="Email" type="email" />
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
              </FormControl>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.password}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput id="password" {...field} label="Password" type="password" />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
            )}
          />

          {/* Terms and Conditions */}
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="I accept the terms and conditions"
                />
                {errors.terms && <FormHelperText error>{errors.terms.message}</FormHelperText>}
              </>
            )}
          />

          {/* Server or root errors */}
          {errors.root && <Alert severity="error">{errors.root.message}</Alert>}

          {/* Submit button */}
          <Button type="submit" variant="contained" disabled={isPending} fullWidth>
            {isPending ? 'Signing up…' : 'Sign up'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
