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
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   Divider,
//   FormControl,
//   Grid,
//   InputLabel,
//   // MenuItem,
//   OutlinedInput,
//   // Select
// } from '@mui/material';

// // const states = [
// //   { value: 'alabama', label: 'Alabama' },
// //   { value: 'new-york', label: 'New York' },
// //   { value: 'san-francisco', label: 'San Francisco' },
// //   { value: 'los-angeles', label: 'Los Angeles' },
// // ] as const;

// export function AccountDetailsForm(): React.JSX.Element {
//   const [formData, setFormData] = React.useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     state: '',
//     city: ''
//   });

//   React.useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       const [first, last] = user.name ? user.name.split(' ') : ['', ''];

//       setFormData({
//         firstName: user.firstName || first || '',
//         lastName: user.lastName || last || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         state: user.state || '',
//         city: user.city || ''
//       });
//     }
//   }, []);

//   return (
//     <form onSubmit={(e) => e.preventDefault()}>
//       <Card>
//         <CardHeader subheader="The information can be edited" title="Profile" />
//         <Divider />
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth required>
//                 <InputLabel>First name</InputLabel>
//                 <OutlinedInput
//                   value={formData.firstName}
//                   label="First name"
//                   name="firstName"
//                 />
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth required>
//                 <InputLabel>Last name</InputLabel>
//                 <OutlinedInput
//                   value={formData.lastName}
//                   label="Last name"
//                   name="lastName"
//                 />
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth required>
//                 <InputLabel>Email address</InputLabel>
//                 <OutlinedInput
//                   value={formData.email}
//                   label="Email address"
//                   name="email"
//                 />
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Phone number</InputLabel>
//                 <OutlinedInput
//                   value={formData.phone}
//                   label="Phone number"
//                   name="phone"
//                   type="tel"
//                 />
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



'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
// import Select from '@mui/material/Select';

// const states = [
//   { value: 'alabama', label: 'Alabama' },
//   { value: 'new-york', label: 'New York' },
//   { value: 'san-francisco', label: 'San Francisco' },
//   { value: 'los-angeles', label: 'Los Angeles' },
// ] as const;

export function AccountDetailsForm(): React.JSX.Element {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    city: ''
  });

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const [first, last] = user.name ? user.name.split(' ') : ['', ''];

      setFormData({
        firstName: user.firstName || first || '',
        lastName: user.lastName || last || '',
        email: user.email || '',
        phone: user.phone || '',
        state: user.state || '',
        city: user.city || ''
      });
    }
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <FormControl fullWidth required>
                <InputLabel>First name</InputLabel>
                <OutlinedInput
                  label="First name"
                  name="firstName"
                  value={formData.firstName}
                />
              </FormControl>
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <FormControl fullWidth required>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput
                  label="Last name"
                  name="lastName"
                  value={formData.lastName}
                />
              </FormControl>
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  label="Email address"
                  name="email"
                  value={formData.email}
                />
              </FormControl>
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput
                  label="Phone number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                />
              </FormControl>
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              
            </Grid>
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
             
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
