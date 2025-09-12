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

     
        const response = await axios.post('https://vinayak-devias-backend.onrender.com/api/users/upload-avatar', formData, {
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
      } catch (error) {
        console.error('Upload error:', error);
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
