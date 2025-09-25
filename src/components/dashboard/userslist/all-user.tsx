// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import { UserPlus } from 'lucide-react';
// import { Modal, Button } from '@mui/material';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// const modalStyle = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   borderRadius: 2,
//   boxShadow: 24,
//   p: 4,
//   maxHeight: '80vh',
//   overflowY: 'auto',
// };

// const AllUser: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [receivedRequests, setReceivedRequests] = useState<any[]>([]);
//   const [openModal, setOpenModal] = useState(false);

//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//   const sender = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

//   const userDetailsString = localStorage.getItem('user')
//   const userDetails = JSON.parse(userDetailsString);
//   const userId = userDetails.id;
//   console.log(userId, "userID");

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/users')
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching users:', error);
//       });
//   }, []);

//   const sendRequest = async (senderId: string | null, receiverId: string) => {
//     if (!senderId) {
//       alert('You must be logged in to send a request.');
//       return;
//     }

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/users/send-request',
//         { toUserId: receiverId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert('Request sent successfully!');
//     } catch (error: any) {
//       alert(error.response?.data?.message || 'Failed to send request');
//     }
//   };

//   const handleOpen = () => setOpenModal(true);
//   const handleClose = () => setOpenModal(false);

//   const fetchReceivedRequests = async () => {
//      if (!token || !userId) {
//     alert('You must be logged in!');
//     return;
//   }
//    console.log('Token in frontend:', token);
//    console.log('Current User ID (frontend):', userId);

//     try {
//       const res = await axios.get('http://localhost:5000/api/users/received-requests', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(res, "received-requests");
      
// console.log('Response status:', res.status);
//   console.log('Response data:', res.data);

//       setReceivedRequests(res.data.requests);
//       handleOpen();

      
//       const idsArray = res.data.requests.map((req: any) => [req.senderId._id, req.receiverId]);
//       console.log('Array of [senderId, receiverId]:', idsArray);

//     } catch (error: any) {
//       alert('Failed to fetch received requests');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 1200,
//         margin: 'auto',
//         mt: 5,
//         mb: 5,
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 2,
//       }}
//     >
//       <Typography variant="h5" gutterBottom>
//         User List
//       </Typography>

//       {/* <Button
//         variant="contained"
//         color="success"
//         onClick={fetchReceivedRequests}
//         sx={{ width: 'fit-content', mb: 2 }}
//       >
//         View Requests
//       </Button> */}

//       <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//         {users.map((user, index) => (
//           <Paper
//             key={index}
//             elevation={3}
//             sx={{
//               p: 2,
//               mb: 3,
//               borderRadius: 2,
//               minWidth: 250,
//             }}
//           >
//             <div
//               onClick={() => sendRequest(sender, user._id)}
//               style={{ cursor: 'pointer', width: 'fit-content' }}
//             >
//               <UserPlus size={24} color="black" />
//             </div>

//             <Typography>
//               <strong>Name:</strong> {user.name}
//             </Typography>
//             <Typography>
//               <strong>Email:</strong> {user.email}
//             </Typography>
//             <Typography>
//               <strong>Role:</strong> {user.role}
//             </Typography>
//           </Paper>
//         ))}
//       </Box>

//       <Modal
//         open={openModal}
//         onClose={handleClose}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box sx={modalStyle}>
//           <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
//             Received Requests
//           </Typography>

//           {receivedRequests.length === 0 ? (
//             <Typography>No requests received.</Typography>
//           ) : (
//             receivedRequests.map((req, index) => (
//               <Paper
//                 key={index}
//                 elevation={2}
//                 sx={{ p: 2, mb: 1 }}
//               >
//                 <Typography>
//                   <strong>Name:</strong> {req.senderId?.name}
//                 </Typography>
//                 <Typography>
//                   <strong>Email:</strong> {req.senderId?.email}
//                 </Typography>
//               </Paper>
//             ))
//           )}

//           <Button onClick={handleClose} variant="outlined" sx={{ mt: 2 }}>
//             Close
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default AllUser;


'use client';

import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axios, { isAxiosError } from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { UserPlus } from 'lucide-react';
import { Modal, Button } from '@mui/material';
// import { error } from 'console';


interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Request {
  senderId: {
    _id: string;
    name: string;
    email: string;
  };
  receiverId: string;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh',
  overflowY: 'auto',
};

const AllUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<Request[]>([]);
  const [openModal, setOpenModal] = useState(false);

  // const token =
  //   typeof globalThis.window !== 'undefined'
  //     ? globalThis.window.localStorage.getItem('token')
  //     : null;

  // const sender =
  //   typeof globalThis.window !== 'undefined'
  //     ? globalThis.window.localStorage.getItem('user')
  //     : null;

  // const userDetailsString =
  //   typeof globalThis.window !== 'undefined'
  //     ? globalThis.window.localStorage.getItem('user')
  //     : null;



const hasWindow = globalThis.window !== undefined;
const token = hasWindow ? globalThis.window.localStorage.getItem('token') : null;
const sender = hasWindow ? globalThis.window.localStorage.getItem('user') : null;
const userDetailsString = hasWindow ? globalThis.window.localStorage.getItem('user') : null;


  const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  const userId = userDetails?.id ?? null;

  useEffect(() => {
    axios
      .get<User[]>('http://localhost:5000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const sendRequest = async (senderId: string | null, receiverId: string) => {
    if (!senderId) {
      alert('You must be logged in to send a request.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/users/send-request',
        { toUserId: receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Request sent successfully!');
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   alert(error.response?.data?.message || 'Failed to send request');
      // } else {
      //   alert('Unexpected error sending request');
      // }
       if (isAxiosError(error)) {
         alert(error.response?.data?.message || 'Failed to send request');
        } else {
          alert('Unexpected error sending request');
        }
    }
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);


    const _fetchReceivedRequests = async () => {
    if (!token || !userId) {
      alert('You must be logged in!');
      return;
    }

    try {
      const response = await axios.get<{ requests: Request[] }>(
        'http://localhost:5000/api/users/received-requests',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReceivedRequests(response.data.requests);
      handleOpen();

      const idsArray: [string, string][] = response.data.requests.map((req) => [
        req.senderId._id,
        req.receiverId,
      ]);

      console.log('Array of [senderId, receiverId]:', idsArray);
    } catch {
      alert('Failed to fetch received requests');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: 'auto',
        mt: 5,
        mb: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        User List
      </Typography>

      {/* Uncomment to show "View Requests" button
      <Button
        variant="contained"
        color="success"
        onClick={fetchReceivedRequests}
        sx={{ width: 'fit-content', mb: 2 }}
      >
        View Requests
      </Button>
      */}

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {users.map((user) => (
          <Paper
            key={user._id}
            elevation={3}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              minWidth: 250,
            }}
          >
            <div
              onClick={() => sendRequest(sender, user._id)}
              style={{ cursor: 'pointer', width: 'fit-content' }}
            >
              <UserPlus size={24} color="black" />
            </div>

            <Typography>
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography>
              <strong>Role:</strong> {user.role}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Received Requests
          </Typography>

          {receivedRequests.length === 0 ? (
            <Typography>No requests received.</Typography>
          ) : (
            receivedRequests.map((req, index) => (
              <Paper key={index} elevation={2} sx={{ p: 2, mb: 1 }}>
                <Typography>
                  <strong>Name:</strong> {req.senderId?.name}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {req.senderId?.email}
                </Typography>
              </Paper>
            ))
          )}

          <Button onClick={handleClose} variant="outlined" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AllUser;
