// 'use client';

// import React, { JSX, useEffect, useState } from 'react';
// import {
//   createSlice,
//   createAsyncThunk,
//   configureStore,
// } from '@reduxjs/toolkit';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Typography,
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   SelectChangeEvent,
// } from '@mui/material';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface UserState {
//   users: User[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   users: [],
//   loading: false,
//   error: null,
// };

// // Fetch users async thunk
// const fetchUsers = createAsyncThunk('users/fetch', async () => {
//   const token = localStorage.getItem('token');

//   const res = await fetch('http://localhost:5000/api/users', {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : '',
//     },
//   });
//   if (!res.ok) throw new Error('Failed to fetch users');
//   return res.json();
// });

// // Slice
// const userSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Error fetching users';
//       });
//   },
// });

// const store = configureStore({
//   reducer: {
//     users: userSlice.reducer,
//   },
// });

// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = typeof store.dispatch;

// function UserTableComponent(): JSX.Element {
//   const dispatch = useDispatch<AppDispatch>();
//   const { users, loading, error } = useSelector((state: RootState) => state.users);

//   // Edit user states
//   const [editUser, setEditUser] = useState<User | null>(null);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

//   // Delete user states
//   const [deleteUser, setDeleteUser] = useState<User | null>(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

//   // Add user states
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [newUser, setNewUser] = useState({ name: '', email: '', role: '', password: '' });

//   // View user summary states (UPDATED to array)
//   const [viewUser, setViewUser] = useState<User | null>(null);
//   const [viewUserSummary, setViewUserSummary] = useState<string[]>([]);
//   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
//   const [loadingSummary, setLoadingSummary] = useState(false);

//   // Logged in user & admin check
//   const loggedInUser =
//     typeof globalThis.window === 'object' ? JSON.parse(localStorage.getItem('user') || '{}') : null;

//   const isAdmin = loggedInUser?.role === 'admin';
//   console.log('isadmin', isAdmin);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   // Edit handlers
//   const handleEditClick = (user: User) => {
//     setEditUser(user);
//     setIsEditDialogOpen(true);
//   };

//   const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!editUser) return;
//     setEditUser({ ...editUser, [e.target.name]: e.target.value });
//   };

//   const handleEditSave = async () => {
//     if (!editUser) return;
//     if (!isAdmin) {
//       alert('❌ Access denied: Admins only');
//       return;
//     }

//     const token = localStorage.getItem('token');

//     try {
//       const res = await fetch(`http://localhost:5000/api/users/${editUser._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token ? `Bearer ${token}` : '',
//         },
//         body: JSON.stringify({
//           name: editUser.name,
//           email: editUser.email,
//           role: editUser.role,
//         }),
//       });

//       if (res.ok) {
//         setIsEditDialogOpen(false);
//         setEditUser(null);
//         dispatch(fetchUsers());
//       } else {
//         const errorData = await res.json();
//         alert('❌ Failed to update user: ' + (errorData.message || res.statusText));
//         console.error('🚨 Update error:', errorData);
//       }
//     } catch (error) {
//       alert('❌ Network error while updating user');
//       console.error('🌐 Network error:', error);
//     }
//   };

//   // Delete handlers
//   const handleDeleteClick = (user: User) => {
//     if (!isAdmin) {
//       alert('❌ Access denied: Admins only');
//       return;
//     }
//     setDeleteUser(user);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!deleteUser) return;
//     if (!isAdmin) {
//       alert('❌ Access denied: Admins only');
//       return;
//     }

//     const token = localStorage.getItem('token');

//     try {
//       const res = await fetch(`http://localhost:5000/api/users/${deleteUser._id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: token ? `Bearer ${token}` : '',
//         },
//       });

//       if (res.ok) {
//         setIsDeleteDialogOpen(false);
//         setDeleteUser(null);
//         dispatch(fetchUsers());
//       } else {
//         const errorData = await res.json();
//         alert('❌ Failed to delete user: ' + (errorData.message || res.statusText));
//         console.error('🚨 Delete error:', errorData);
//       }
//     } catch (error) {
//       alert('❌ Network error while deleting user');
//       console.error('🌐 Network error:', error);
//     }
//   };

//   // For TextField
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   // For Select
//   const handleSelectChange = (e: SelectChangeEvent) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleAddUserSave = async () => {
//     if (!isAdmin) {
//       alert('❌ Access denied: Admins only');
//       return;
//     }
//     const { name, email, role, password } = newUser;

//     if (!name.trim() || !email.trim() || !role.trim() || !password.trim()) {
//       alert('⚠️ Please fill all fields (Name, Email, Role, Password)');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       alert('⚠️ Please enter a valid email address');
//       return;
//     }

//     const token = localStorage.getItem('token');

//     console.log('📦 New user data:', newUser);
//     console.log('🔐 Sending token:', token);

//     try {
//       const res = await fetch('http://localhost:5000/api/users/admin/create-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token ? `Bearer ${token}` : '',
//         },
//         body: JSON.stringify({ name, email, role, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert('User added successfully');
//         setIsAddDialogOpen(false);
//         setNewUser({ name: '', email: '', role: '', password: '' });
//         dispatch(fetchUsers());
//       } else {
//         alert('Failed to add user: ' + (data.message || res.statusText));
//         console.error('Add user error:', data);
//       }
//     } catch (error) {
//       console.log('Network error:', error);

//       alert('Network error while adding user');
//     }
//   };

//   // UPDATED: View user summary handler
//   const handleViewClick = async (user: User) => {
//     setViewUser(user);
//     setIsViewDialogOpen(true);
//     setLoadingSummary(true);
//     setViewUserSummary([]);

//     const token = localStorage.getItem('token');
//     try {
//       const res = await fetch(`http://localhost:5000/api/users/${user._id}/summary`, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : '',
//         },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         if (Array.isArray(data) && data.length > 0) {
//           const summaries = data.map((item: any) => item.summary || '');
//           setViewUserSummary(summaries);
//         } else {
//           setViewUserSummary(['No summary available.']);
//         }
//       } else {
//         setViewUserSummary(['Failed to fetch summary.']);
//       }
//     } catch (error) {
//       setViewUserSummary(['Network error while fetching summary.']);
//     } finally {
//       setLoadingSummary(false);
//     }
//   };

//   return (
//     <Card sx={{ width: '125%' }}>
//       <CardHeader title="User List" subheader="All registered users" />
//       <Divider />
//       <CardContent>
//         {isAdmin && (
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ mb: 2 }}
//             onClick={() => setIsAddDialogOpen(true)} // open dialog only
//           >
//             Add New User
//           </Button>
//         )}
//         {loading ? (
//           <CircularProgress />
//         ) : error ? (
//           <Typography color="error">{error}</Typography>
//         ) : (
//           <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
//             <Table stickyHeader aria-label="users table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Role</TableCell>
//                   <TableCell>Summary</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user._id}>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>
//                       <Button variant="outlined" onClick={() => handleViewClick(user)}>
//                         View Summary
//                       </Button>
//                     </TableCell>
//                     <TableCell>
//                       {isAdmin && (
//                         <>
//                           <Button
//                             variant="outlined"
//                             color="primary"
//                             onClick={() => handleEditClick(user)}
//                             sx={{ mr: 1 }}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             color="error"
//                             onClick={() => handleDeleteClick(user)}
//                           >
//                             Delete
//                           </Button>
//                         </>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         {/* Edit User Dialog */}
//         <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
//           <DialogTitle>Edit User</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Name"
//               name="name"
//               value={editUser?.name || ''}
//               onChange={handleEditChange}
//               fullWidth
//               variant="standard"
//             />
//             <TextField
//               margin="dense"
//               label="Email"
//               name="email"
//               value={editUser?.email || ''}
//               onChange={handleEditChange}
//               fullWidth
//               variant="standard"
//               type="email"
//             />
//             <FormControl fullWidth sx={{ mt: 2 }}>
//               <InputLabel id="edit-role-label">Role</InputLabel>
//               <Select
//                 labelId="edit-role-label"
//                 label="Role"
//                 name="role"
//                 value={editUser?.role || ''}
//                 onChange={(e) =>
//                   setEditUser((prev) =>
//                     prev ? { ...prev, role: e.target.value } : prev
//                   )
//                 }
//               >
//                 <MenuItem value="admin">Admin</MenuItem>
//                 <MenuItem value="user">User</MenuItem>
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
//             <Button variant="contained" onClick={handleEditSave}>
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Delete Confirmation Dialog */}
//         <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
//           <DialogTitle>Confirm Delete</DialogTitle>
//           <DialogContent>
//             <Typography>
//               Are you sure you want to delete user{' '}
//               <strong>{deleteUser?.name}</strong>?
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
//             <Button color="error" variant="contained" onClick={handleDeleteConfirm}>
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Add New User Dialog */}
//         <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
//           <DialogTitle>Add New User</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Name"
//               name="name"
//               value={newUser.name}
//               onChange={handleInputChange}
//               fullWidth
//               variant="standard"
//             />
//             <TextField
//               margin="dense"
//               label="Email"
//               name="email"
//               value={newUser.email}
//               onChange={handleInputChange}
//               fullWidth
//               variant="standard"
//               type="email"
//             />
//             <FormControl fullWidth sx={{ mt: 2 }}>
//               <InputLabel id="add-role-label">Role</InputLabel>
//               <Select
//                 labelId="add-role-label"
//                 label="Role"
//                 name="role"
//                 value={newUser.role}
//                 onChange={handleSelectChange}
//               >
//                 <MenuItem value="admin">Admin</MenuItem>
//                 <MenuItem value="user">User</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               margin="dense"
//               label="Password"
//               name="password"
//               value={newUser.password}
//               onChange={handleInputChange}
//               fullWidth
//               variant="standard"
//               type="password"
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
//             <Button variant="contained" onClick={handleAddUserSave}>
//               Add
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* View Summary Dialog (UPDATED) */}
//         <Dialog
//           open={isViewDialogOpen}
//           onClose={() => setIsViewDialogOpen(false)}
//           maxWidth="sm"
//           fullWidth
//         >
//           <DialogTitle>
//             Summary for <strong>{viewUser?.name}</strong>
//           </DialogTitle>
//           <DialogContent
//             sx={{ minHeight: 120, maxHeight: 300, overflowY: 'auto' }}
//           >
//             {loadingSummary ? (
//               <CircularProgress />
//             ) : (
//               viewUserSummary.map((summary, index) => (
//                 <Typography
//                   key={index}
//                   sx={{ whiteSpace: 'pre-wrap', mb: 2 }}
//                 >
//                   {index + 1}. {summary}
//                 </Typography>
//               ))
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
//           </DialogActions>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// }

// export default function UserTable(): JSX.Element {
//   return (
//     <Provider store={store}>
//       <UserTableComponent />
//     </Provider>
//   );
// }





'use client';

import React, { JSX, useEffect, useState } from 'react';
import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};


const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:5000/api/users', {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching users';
      });
  },
});

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

function UserTableComponent(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', password: '' });

  const [viewUser, setViewUser] = useState<User | null>(null);
  const [viewUserSummary, setViewUserSummary] = useState<string[]>([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

 
  const loggedInUser =
    typeof window !== 'undefined' && localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null;

  const isAdmin = loggedInUser?.role === 'admin';
  const isNormalUser = !isAdmin;


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Edit handlers
  const handleEditClick = (user: User) => {
    setEditUser(user);
    setIsEditDialogOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editUser) return;
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    if (!editUser || !isAdmin) return alert('Access denied.');

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/users/${editUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          name: editUser.name,
          email: editUser.email,
          role: editUser.role,
        }),
      });

      if (res.ok) {
        setIsEditDialogOpen(false);
        setEditUser(null);
        dispatch(fetchUsers());
      } else {
        const data = await res.json();
        alert('Failed to update user: ' + (data.message || res.statusText));
      }
    } catch {
      alert('Network error during update');
    }
  };

  // Delete handlers
  const handleDeleteClick = (user: User) => {
    if (!isAdmin) return alert('Access denied.');
    setDeleteUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUser || !isAdmin) return alert('Access denied.');

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:5000/api/users/${deleteUser._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (res.ok) {
        setIsDeleteDialogOpen(false);
        setDeleteUser(null);
        dispatch(fetchUsers());
      } else {
        const data = await res.json();
        alert('Failed to delete user: ' + (data.message || res.statusText));
      }
    } catch {
      alert('Network error during deletion');
    }
  };

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUserSave = async () => {
    if (!isAdmin) return alert('Access denied.');

    const { name, email, role, password } = newUser;
    if (!name.trim() || !email.trim() || !role.trim() || !password.trim()) {
      return alert('Please fill all fields');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert('Invalid email');

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/users/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ name, email, role, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('User added successfully');
        setIsAddDialogOpen(false);
        setNewUser({ name: '', email: '', role: '', password: '' });
        dispatch(fetchUsers());
      } else {
        alert('Failed to add user: ' + (data.message || res.statusText));
      }
    } catch {
      alert('Network error while adding user');
    }
  };

 
  const handleViewClick = async (user: User) => {
    setViewUser(user);
    setIsViewDialogOpen(true);
    setLoadingSummary(true);
    setViewUserSummary([]);

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}/summary`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const summaries = data.map((item: any) => item.summary || '');
          setViewUserSummary(summaries);
        } else {
          setViewUserSummary(['No summary available']);
        }
      } else {
        setViewUserSummary(['Failed to fetch summary']);
      }
    } catch {
      setViewUserSummary(['Network error while fetching summary']);
    } finally {
      setLoadingSummary(false);
    }
  };


 
  const handleUploadClick = (user: User) => {
    alert(`Upload clicked for user: ${user.name}`);
    
  };
  return (
    <Card sx={{ width: '125%' }}>
      <CardHeader title="User List" subheader="All registered users" />
      <Divider />
      <CardContent>
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => setIsAddDialogOpen(true)}
          >
            Add New User
          </Button>
        )}

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                   {isNormalUser && <TableCell>Upload</TableCell>}
                  
                  {isAdmin && <TableCell>Summary</TableCell>}
                  {isAdmin && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>

                    {isNormalUser && (
                      <TableCell>
                        <Button variant="outlined" onClick={() => handleUploadClick(user)}>
                          Upload
                        </Button>
                      </TableCell>
                    )}

                    {isAdmin && (
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => handleViewClick(user)}
                        >
                          View Summary
                        </Button>
                      </TableCell>
                    )}

                    {isAdmin && (
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEditClick(user)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteClick(user)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              name="name"
              value={editUser?.name || ''}
              onChange={handleEditChange}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={editUser?.email || ''}
              onChange={handleEditChange}
              fullWidth
              variant="standard"
            />
            <FormControl fullWidth margin="dense" variant="standard">
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                name="role"
                value={editUser?.role || ''}
                onChange={(e) =>
                  setEditUser((prev) =>
                    prev ? { ...prev, role: e.target.value } : null
                  )
                }
                label="Role"
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">user</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        
        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            Are you sure you want to delete{' '}
            <strong>{deleteUser?.name}</strong>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              fullWidth
              variant="standard"
            />
            <FormControl fullWidth margin="dense" variant="standard">
              <InputLabel id="add-role-select-label">Role</InputLabel>
              <Select
                labelId="add-role-select-label"
                name="role"
                value={newUser.role}
                onChange={handleSelectChange}
                label="Role"
              >
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">user</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Password"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleInputChange}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUserSave} variant="contained" color="primary">
              Add User
            </Button>
          </DialogActions>
        </Dialog>

       
        <Dialog open={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)}>
          <DialogTitle>User Summary - {viewUser?.name}</DialogTitle>
          <DialogContent dividers>
            {loadingSummary ? (
              <CircularProgress />
            ) : (
              viewUserSummary.map((summary, idx) => (
                <Typography key={idx} paragraph>
                  {summary}
                </Typography>
              ))
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default function UserTableWrapper(): JSX.Element {
  return (
    <Provider store={store}>
      <UserTableComponent />
    </Provider>
  );
}
