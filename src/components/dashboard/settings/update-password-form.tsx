// 'use client';

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Stack from '@mui/material/Stack';

// export function UpdatePasswordForm(): React.JSX.Element {
//   return (
//     <form
//       onSubmit={(event) => {
//         event.preventDefault();
//       }}
//     >
//       <Card>
//         <CardHeader subheader="Update password" title="Password" />
//         <Divider />
//         <CardContent>
//           <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
//             <FormControl fullWidth>
//               <InputLabel>Password</InputLabel>
//               <OutlinedInput label="Password" name="password" type="password" />
//             </FormControl>
//             <FormControl fullWidth>
//               <InputLabel>Confirm password</InputLabel>
//               <OutlinedInput label="Confirm password" name="confirmPassword" type="password" />
//             </FormControl>
//           </Stack>
//         </CardContent>
//         <Divider />
//         <CardActions sx={{ justifyContent: 'flex-end' }}>
//           <Button variant="contained">Update</Button>
//         </CardActions>
//       </Card>
//     </form>
//   );
// }


'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

export function UpdatePasswordForm(): React.JSX.Element {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('token'); 
      if (!token) throw new Error('User not authenticated');

      const response = await fetch('https://vinayak-devias-backend-1.onrender.com/api/users/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password update failed');
      }

      setMessage(data.message); 
      setPassword('');
      setConfirmPassword('');
    } 
     catch (error) {

  if (error instanceof Error) {
    setMessage(error.message);
  } 
  else {
    setMessage('An unknown error occurred');
  }
} finally {
  setLoading(false);
}
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader subheader="Update password" title="Password" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
              <FormControl fullWidth required>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>Confirm password</InputLabel>
                <OutlinedInput
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </CardActions>
        </Card>
      </form>

 
      {message && (
        <div
          style={{
            marginTop: '16px',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: message.toLowerCase().includes('failed') ? '#f8d7da' : '#d4edda',
            color: message.toLowerCase().includes('failed') ? '#721c24' : '#155724',
          }}
        >
          {message}
        </div>
      )}
    </>
  );
}
