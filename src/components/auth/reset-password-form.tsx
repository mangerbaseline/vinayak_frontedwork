// 'use client';

// import * as React from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { Controller, useForm } from 'react-hook-form';
// import { z as zod } from 'zod';

// import { authClient } from '@/lib/auth/client';

// const schema = zod.object({ email: zod.string().min(1, { message: 'Email is required' }).email() });

// type Values = zod.infer<typeof schema>;

// const defaultValues = { email: '' } satisfies Values;

// export function ResetPasswordForm(): React.JSX.Element {
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

//       const { error } = await authClient.resetPassword(values);

//       if (error) {
//         setError('root', { type: 'server', message: error });
//         setIsPending(false);
//         return;
//       }

//       setIsPending(false);

      
//     },
//     [setError]
//   );

//   return (
//     <Stack spacing={4}>
//       <Typography variant="h5">Reset password</Typography>
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
//           {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
//           <Button disabled={isPending} type="submit" variant="contained">
//             Send recovery link
//           </Button>
//         </Stack>
//       </form>
//     </Stack>
//   );
// }
 



'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { authClient } from '@/lib/auth/client';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  otp: z.string().optional(),
  newPassword: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ResetPasswordForm(): React.JSX.Element {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [isPending, setIsPending] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    // setError, // 🧹 Removed because it's unused
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: '', otp: '', newPassword: '' },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setIsPending(true);
    setServerError(null);

    try {
      switch (step) {
        case 1: {
          const { error } = await authClient.sendOTP({ email: values.email });
          if (error) throw new Error(error);
          setStep(2);
          break;
        }

        case 2: {
          const { error } = await authClient.verifyOTP({
            email: getValues('email'),
            otp: values.otp || '',
          });
          if (error) throw new Error(error);
          setStep(3);
          break;
        }

        case 3: {
          const { error } = await authClient.resetPassword({
            email: getValues('email'),
            newPassword: values.newPassword || '',
          });
          if (error) throw new Error(error);

          alert('Password reset successful!');
          reset();
          setStep(1);
          router.push('/auth/sign-in');
          break;
        }

        
          default: {
           throw new Error('Invalid step');
          }

      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message || 'Something went wrong');
      } else {
        setServerError('Something went wrong');
      }
    }

    setIsPending(false);
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h5">Reset Password</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* Email Field */}
          {step >= 1 && (
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.email} fullWidth>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput {...field} label="Email" disabled={step !== 1} />
                  <FormHelperText>{errors.email?.message}</FormHelperText>
                </FormControl>
              )}
            />
          )}

          {/* OTP Field */}
          {step === 2 && (
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.otp} fullWidth>
                  <InputLabel>Enter OTP</InputLabel>
                  <OutlinedInput {...field} label="Enter OTP" />
                  <FormHelperText>{errors.otp?.message}</FormHelperText>
                </FormControl>
              )}
            />
          )}

          {/* New Password Field */}
          {step === 3 && (
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.newPassword} fullWidth>
                  <InputLabel>New Password</InputLabel>
                  <OutlinedInput {...field} label="New Password" type="password" />
                  <FormHelperText>{errors.newPassword?.message}</FormHelperText>
                </FormControl>
              )}
            />
          )}

          {/* Error Alert */}
          {serverError && <Alert severity="error">{serverError}</Alert>}

          {/* Submit Button */}
          <Button variant="contained" type="submit" disabled={isPending}>
            {step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Reset Password'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
