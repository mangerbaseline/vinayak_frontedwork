// 'use client';

// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';
// import FormControl from '@mui/material/FormControl';
// import Grid from '@mui/material/Grid';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Select from '@mui/material/Select';

// const states = [
//   { value: 'alabama', label: 'Alabama' },
//   { value: 'new-york', label: 'New York' },
//   { value: 'san-francisco', label: 'San Francisco' },
//   { value: 'los-angeles', label: 'Los Angeles' },
// ] as const;

// export function AccountDetailsForm(): React.JSX.Element {
//   return (
//     <form
//       onSubmit={(event) => {
//         event.preventDefault();
//       }}
//     >
//       <Card>
//         <CardHeader subheader="The information can be edited" title="Profile" />
//         <Divider />
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid
//               size={{
//                 md: 6,
//                 xs: 12,
//               }}
//             >
//               <FormControl fullWidth required>
//                 <InputLabel>First name</InputLabel>
//                 <OutlinedInput defaultValue="sofia" label="First name" name="firstName" />
//               </FormControl>
//             </Grid>
//             <Grid
//               size={{
//                 md: 6,
//                 xs: 12,
//               }}
//             >
//               <FormControl fullWidth required>
//                 <InputLabel>Last name</InputLabel>
//                 <OutlinedInput defaultValue="Rivers" label="Last name" name="lastName" />
//               </FormControl>
//             </Grid>
//             <Grid
//               size={{
//                 md: 6,
//                 xs: 12,
//               }}
//             >
//               <FormControl fullWidth required>
//                 <InputLabel>Email address</InputLabel>
//                 <OutlinedInput defaultValue="sofia@devias.io" label="Email address" name="email" />
//               </FormControl>
//             </Grid>
//             <Grid
//               size={{
//                 md: 6,
//                 xs: 12,
//               }}
//             >
//               <FormControl fullWidth>
//                 <InputLabel>Phone number</InputLabel>
//                 <OutlinedInput label="Phone number" name="phone" type="tel" />
//               </FormControl>
//             </Grid>
//             <Grid
//               size={{
//                 md: 6,
//                 xs: 12,
//               }}
//             >
//               <FormControl fullWidth>
//                 <InputLabel>State</InputLabel>
//                 <Select defaultValue="New York" label="State" name="state" variant="outlined">
//                   {states.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid
//               size={{
//                 md: 6,
//                 xs: 12,
//               }}
//             >
//               <FormControl fullWidth>
//                 <InputLabel>City</InputLabel>
//                 <OutlinedInput label="City" />
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Divider />
//         <CardActions sx={{ justifyContent: 'flex-end' }}>
//           <Button variant="contained">Save details</Button>
//         </CardActions>
//       </Card>
//     </form>
//   );
// }


// 'use client';

// import * as React from 'react';

// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
// import Divider from '@mui/material/Divider';
// import FormControl from '@mui/material/FormControl';
// import Grid from '@mui/material/Grid';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Button from '@mui/material/Button';

// export function AccountDetailsForm(): React.JSX.Element {
//   const [formData, setFormData] = React.useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: ''
//   });

//   // Load user data from localStorage
//   React.useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       const [first, last] = user.name ? user.name.split(' ') : ['', ''];

//       setFormData({
//         firstName: user.firstName || first || '',
//         lastName: user.lastName || last || '',
//         email: user.email || '',
//         phone: user.phone || ''
//       });
//     }
//   }, []);

//   // Only allow first name change
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       firstName: event.target.value
//     }));
//   };

//   // Save updated first name
//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const updatedUser = {
//       ...storedUser,
//       firstName: formData.firstName,
//       name: `${formData.firstName} ${formData.lastName}`
//     };
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//     alert('First name updated successfully!');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Card>
//         <CardHeader
//           subheader="You can only edit your first name"
//           title="Profile"
//         />
//         <Divider />
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid item md={9} xs={19}>
//               <FormControl fullWidth required>
//                 <InputLabel>First name</InputLabel>
//                 <OutlinedInput
//                   label="First name"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item md={6} xs={12}>
//               <FormControl fullWidth disabled>
//                 <InputLabel>Last name</InputLabel>
//                 <OutlinedInput
//                   label="Last name"
//                   name="lastName"
//                   value={formData.lastName}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item md={6} xs={12}>
//               <FormControl fullWidth disabled>
//                 <InputLabel>Email address</InputLabel>
//                 <OutlinedInput
//                   label="Email address"
//                   name="email"
//                   value={formData.email}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item md={6} xs={12}>
//               <FormControl fullWidth disabled>
//                 <InputLabel>Phone number</InputLabel>
//                 <OutlinedInput
//                   label="Phone number"
//                   name="phone"
//                   value={formData.phone}
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//         </CardContent>
//         <Divider />
//         <CardActions
//           sx={{
//             px: 3,
//             pb: 3,
//             justifyContent: { xs: 'center', sm: 'flex-end' }
//           }}
//         >
//           <Button variant="contained" type="submit">
//             Save
//           </Button>
//         </CardActions>
//       </Card>
//     </form>
//   );
// }



'use client';

import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

export function AccountDetailsForm(): React.JSX.Element {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  // Load user data from localStorage
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const [first, last] = user.name ? user.name.split(' ') : ['', ''];

      setFormData({
        firstName: user.firstName || first || '',
        lastName: user.lastName || last || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, []);

  // Only allow first name change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      firstName: event.target.value
    }));
  };

  // Save updated first name via API
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); 

    if (!token) {
      alert('You are not logged in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/update-first-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ firstName: formData.firstName })
      });

      const data = await response.json();

      if (response.ok) {
        alert('First name updated successfully!');

        // Update localStorage user data too
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = {
          ...storedUser,
          firstName: data.user.name.split(' ')[0] || formData.firstName,
          lastName: data.user.name.split(' ')[1] || formData.lastName,
          name: data.user.name
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        alert(data.message || 'Failed to update first name.');
      }
    } catch (error) {
      console.error('Error updating first name:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="You can only edit your first name"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={9} xs={19}>
              <FormControl fullWidth required>
                <InputLabel>First name</InputLabel>
                <OutlinedInput
                  label="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth disabled>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput
                  label="Last name"
                  name="lastName"
                  value={formData.lastName}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth disabled>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  label="Email address"
                  name="email"
                  value={formData.email}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth disabled>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput
                  label="Phone number"
                  name="phone"
                  value={formData.phone}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            px: 3,
            pb: 3,
            justifyContent: { xs: 'center', sm: 'flex-end' }
          }}
        >
          <Button variant="contained" type="submit">
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
