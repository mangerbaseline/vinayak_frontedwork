'use client';

import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

type Request = {
  _id: string;
  senderId: { name: string; email: string };
  requestType: string;
  status: 'pending' | 'accepted' | 'cancelled';
};

export default function RequestView() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [open, setOpen] = useState(false);


const userDetailsString = localStorage.getItem('user')


console.log(userDetailsString,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  const userDetails = JSON.parse(userDetailsString);
  
  console.log(userDetails,"zzzzzzzzzzzzzzzzzzzzzzzzzzz");
  const userId = userDetails.id;
  console.log(userId, "userID");



  const token = localStorage.getItem('token') || '';



  console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', userId);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/requests?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch requests');
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      alert('Failed to load requests');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleView = (request: Request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  
  const handleAccept = async () => {
    if (!selectedRequest) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/requests/${selectedRequest._id}/accept`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to accept request');

      alert('Request accepted');
      setOpen(false);
      fetchRequests(); // Refresh list
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Failed to accept request');
    }
  };

  const handleCancel = async () => {
    if (!selectedRequest) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/requests/${selectedRequest._id}/reject`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to cancel request');

      alert('Request cancelled');
      setOpen(false);
      fetchRequests(); // Refresh list
    } catch (error) {
      console.error('Error cancelling request:', error);
      alert('Failed to cancel request');
    }
  };
  

  return (
    <Stack spacing={2} sx={{ maxWidth: 600, margin: '20px auto' }}>
      <Typography variant="h6">Pending Requests</Typography>

      {requests.length === 0 && <Typography>No pending requests found.</Typography>}

      {requests.map((req) => (
        <Stack
          key={req._id}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ border: '1px solid #ccc', padding: 1, borderRadius: 1 }}
        >
          <Typography>
            {req.senderId.name} ({req.senderId.email})
          </Typography>
          <Button variant="outlined" onClick={() => handleView(req)}>
            View
          </Button>
        </Stack>
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request Details</DialogTitle>
        <DialogContent dividers>
          {selectedRequest ? (
            <>
              <Typography>
                <strong>Name:</strong> {selectedRequest.senderId.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedRequest.senderId.email}
              </Typography>
              <Typography>
                <strong>Request Type:</strong> {selectedRequest.requestType}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedRequest.status}
              </Typography>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {/* Buttons disabled for now */}
          <Button variant="contained" color="primary" disabled>
            Accept
          </Button>
          <Button variant="outlined" color="error" disabled>
            Cancel
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
