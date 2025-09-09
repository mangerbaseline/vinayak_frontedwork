// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// const user = {
//   name: 'Mohit',
//   avatar: '/assets/avatar-3.png',
//   jobTitle: 'Senior Developer',
//   country: 'USA',
//   city: 'Los Angeles',
//   // timezone: 'GTM-7',
// } as const;

// export function AccountInfo(): React.JSX.Element {
//   return (
//     <Card>
//       <CardContent>
//         <Stack spacing={2} sx={{ alignItems: 'center' }}>
//           <div>
//             <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
//           </div>
//           <Stack spacing={1} sx={{ textAlign: 'center' }}>
//             <Typography variant="h5">{user.name}</Typography>
//             <Typography color="text.secondary" variant="body2">
//               {user.city} {user.country}
//             </Typography>
           
//           </Stack>
//         </Stack>
//       </CardContent>
//       <Divider />
//       <CardActions>
//         <Button fullWidth variant="text">
//           Upload picture
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }






// 'use client';

// import React, { useRef, useState, useEffect } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// const defaultUser = {
//   name: 'sumit',
//   avatar: '',
//   city: 'Los Angeles',
//   country: 'USA',
//   timezone: 'GTM-7',
// };

// export default function AccountInfo() {
//   const [avatar, setAvatar] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);


//   useEffect(() => {
//     const savedAvatar = localStorage.getItem('user-avatar');
//     if (savedAvatar) {
//       setAvatar(savedAvatar);
//     }
//   }, []);

//   const handleUploadClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setAvatar(imageUrl);

      
//       localStorage.setItem('user-avatar', imageUrl);
//     }
//   };

//   return (
//     <Card sx={{ maxWidth: 300, mx: 'auto' }}>
//       <CardContent>
//         <Stack spacing={2} alignItems="center">
//           <Avatar
//             src={avatar || undefined}
//             sx={{ width: 80, height: 80 }}
//           />
//           <Stack spacing={1} textAlign="center">
//             <Typography variant="h5">{defaultUser.name}</Typography>
//             <Typography color="text.secondary">
//               {defaultUser.city} {defaultUser.country}
//             </Typography>
//             <Typography color="text.secondary">{defaultUser.timezone}</Typography>
//           </Stack>
//         </Stack>
//       </CardContent>
//       <Divider />
//       <CardActions>
//         <Button fullWidth variant="text" onClick={handleUploadClick}>
//           Upload picture
//         </Button>

//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//         />
//       </CardActions>
//     </Card>
//   );
// }




// 'use client';

// import React, { useRef, useState, useEffect } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Divider from '@mui/material/Divider';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// const defaultUser = {
//   name: 'sumit',
//   avatar: '',
//   city: 'Los Angeles',
//   country: 'USA',
//   timezone: 'GTM-7',
// };

// export default function AccountInfo() {
//   const [avatar, setAvatar] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

  
//   useEffect(() => {
//     const savedAvatar = localStorage.getItem('user-avatar');
//     if (savedAvatar) {
//       setAvatar(savedAvatar);
//     }
//   }, []);

 
//   const convertToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       try {
//         const base64 = await convertToBase64(file);
//         setAvatar(base64);
//         localStorage.setItem('user-avatar', base64);
//       } catch (err) {
//         console.error('Error converting image to base64:', err);
//       }
//     }
//   };

//   return (
//     <Card sx={{ maxWidth: 300, mx: 'auto' }}>
//       <CardContent>
//         <Stack spacing={2} alignItems="center">
//           <Avatar
//             src={avatar || undefined}
//             sx={{ width: 80, height: 80 }}
//           />
//           <Stack spacing={1} textAlign="center">
//             <Typography variant="h5">{defaultUser.name}</Typography>
//             <Typography color="text.secondary">
//               {defaultUser.city} {defaultUser.country}
//             </Typography>
//             <Typography color="text.secondary">{defaultUser.timezone}</Typography>
//           </Stack>
//         </Stack>
//       </CardContent>

//       <Divider />

//       <CardActions>
//         <Button fullWidth variant="text" onClick={handleUploadClick}>
//           Upload picture
//         </Button>

//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//         />
//       </CardActions>
//     </Card>
//   );
// }



'use client';

import React, { useRef, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const defaultUser = {
  name: 'sumit',
  avatar: '',
  city: 'Los Angeles',
  country: 'USA',
  timezone: 'GTM-7',
};

export default function AccountInfo() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem('user-avatar');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
       
        const formData = new FormData();
        formData.append('avatar', file);

     
        const response = await axios.post('http://localhost:5000/api/users/upload-avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data && response.data.imageUrl) {
          setAvatar(response.data.imageUrl);
          localStorage.setItem('user-avatar', response.data.imageUrl);
        } else {
          alert('Upload failed: Invalid server response');
        }
      } catch (err) {
        console.error('Upload error:', err);
        alert('Error uploading image');
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 300, mx: 'auto' }}>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <Avatar
            src={avatar || undefined}
            sx={{ width: 80, height: 80 }}
          />
          <Stack spacing={1} textAlign="center">
            <Typography variant="h5">{defaultUser.name}</Typography>
            <Typography color="text.secondary">
              {defaultUser.city} {defaultUser.country}
            </Typography>
            <Typography color="text.secondary">{defaultUser.timezone}</Typography>
          </Stack>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions>
        <Button fullWidth variant="text" onClick={handleUploadClick}>
          Upload picture
        </Button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </CardActions>
    </Card>
  );
}
