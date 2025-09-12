


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

// Fetch users async thunk
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

// Slice
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

  // Edit user states
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Delete user states
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Add user states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  // Added password here
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', password: '' });

  // Logged in user & admin check
  const loggedInUser =
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
  const isAdmin = loggedInUser?.role === 'admin';
  console.log('isadmin', isAdmin);

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
    if (!editUser) return;
    if (!isAdmin) {
      alert('❌ Access denied: Admins only');
      return;
    }

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
        const errorData = await res.json();
        alert('❌ Failed to update user: ' + (errorData.message || res.statusText));
        console.error('🚨 Update error:', errorData);
      }
    } catch (error) {
      alert('❌ Network error while updating user');
      console.error('🌐 Network error:', error);
    }
  };

  // Delete handlers
  const handleDeleteClick = (user: User) => {
    if (!isAdmin) {
      alert('❌ Access denied: Admins only');
      return;
    }
    setDeleteUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUser) return;
    if (!isAdmin) {
      alert('❌ Access denied: Admins only');
      return;
    }

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
        const errorData = await res.json();
        alert('❌ Failed to delete user: ' + (errorData.message || res.statusText));
        console.error('🚨 Delete error:', errorData);
      }
    } catch (error) {
      alert('❌ Network error while deleting user');
      console.error('🌐 Network error:', error);
    }
  };

  // Add new user handlers
  const handleNewUserChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const name = e.target.name || '';
    const value = e.target.value as string;
    setNewUser({ ...newUser, [name]: value });
  };

  // *** API CALL ONLY ON THIS FUNCTION TRIGGERED BY "Add" BUTTON INSIDE DIALOG ***
  const handleAddUserSave = async () => {
    if (!isAdmin) {
      alert('❌ Access denied: Admins only');
      return;
    }

    const { name, email, role, password } = newUser;

    if (!name.trim() || !email.trim() || !role.trim() || !password.trim()) {
      alert('⚠️ Please fill all fields (Name, Email, Role, Password)');
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('⚠️ Please enter a valid email address');
      return;
    }

    const token = localStorage.getItem('token');

    console.log('📦 New user data:', newUser);
    console.log('🔐 Sending token:', token);

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
        console.error('Add user error:', data);
      }
    } catch (error) {
            console.log('Network error:', error);

      alert('Network error while adding user');
    }
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title="User List" subheader="All registered users" />
      <Divider />
      <CardContent>
        {/* 
          "Add New User" button: 
          Only OPENS the dialog, does NOT call API 
        */}
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => setIsAddDialogOpen(true)} // open dialog only
          >
            Add New User
          </Button>
        )}
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  {isAdmin && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    {isAdmin && (
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleEditClick(user)}
                          sx={{
                            mr: 1,
                            color: 'green',
                            borderColor: 'green',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 128, 0, 0.1)',
                              borderColor: 'darkgreen',
                            },
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
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
      </CardContent>

      {/* Edit Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: 'green' }}>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={editUser?.name || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={editUser?.email || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="role"
            value={editUser?.role || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleEditSave}
            sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={deleteUser?.name || ''} fullWidth margin="normal" disabled />
          <TextField label="Email" value={deleteUser?.email || ''} fullWidth margin="normal" disabled />
          <TextField label="Role" value={deleteUser?.role || ''} fullWidth margin="normal" disabled />
          <Typography sx={{ mt: 2 }}>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newUser.name}
            onChange={handleNewUserChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleNewUserChange}
            fullWidth
            margin="normal"
          />
          
          <TextField
            label="Password"
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleNewUserChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              label="Role"
              name="role"
              value={newUser.role}
              onChange={handleNewUserChange}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          {/* 
            "Add" button here CALLS the API via handleAddUserSave
          */}
          <Button variant="contained" color="primary" onClick={handleAddUserSave}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export function UserTable(): JSX.Element {
  return (
    <Provider store={store}>
      <UserTableComponent />
    </Provider>
  );
}



// 'use client';

// import React, { JSX, useEffect, useState } from 'react';
// import { configureStore } from '@reduxjs/toolkit';
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
//   Box,
// } from '@mui/material';
// import { userSlice, fetchUsers, User } from '../../../store/userSlice';
// import { makeAuthenticatedRequest, handleLogout } from '../../auth/tokenUtils';

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

//   const [editUser, setEditUser] = useState<User | null>(null);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [deleteUser, setDeleteUser] = useState<User | null>(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [newUser, setNewUser] = useState({ name: '', email: '', role: '', password: '' });

//   const loggedInUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : null;
//   const isAdmin = loggedInUser?.role === 'admin';

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

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

//     try {
//       const res = await makeAuthenticatedRequest(`http://localhost:5000/api/users/${editUser._id}`, {
//         method: 'PUT',
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
//       }
//     } catch (error) {
//       alert('❌ Network error while updating user');
//     }
//   };

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

//     try {
//       const res = await makeAuthenticatedRequest(`http://localhost:5000/api/users/${deleteUser._id}`, {
//         method: 'DELETE',
//       });

//       if (res.ok) {
//         setIsDeleteDialogOpen(false);
//         setDeleteUser(null);
//         dispatch(fetchUsers());
//       } else {
//         const errorData = await res.json();
//         alert('❌ Failed to delete user: ' + (errorData.message || res.statusText));
//       }
//     } catch (error) {
//       alert('❌ Network error while deleting user');
//     }
//   };

//   const handleNewUserChange = (
//     e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
//   ) => {
//     const name = e.target.name || '';
//     const value = e.target.value as string;
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

//     try {
//       const res = await makeAuthenticatedRequest('http://localhost:5000/api/users/admin/create-user', {
//         method: 'POST',
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
//       }
//     } catch (error) {
//       alert('Network error while adding user');
//     }
//   };

//   return (
//     <Card sx={{ width: '100%' }}>
//       <CardHeader 
//         title="User List" 
//         subheader="All registered users"
//         action={
//           <Box>
//             {isAdmin && (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mb: 2, mr: 2 }}
//                 onClick={() => setIsAddDialogOpen(true)}
//               >
//                 Add New User
//               </Button>
//             )}
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           </Box>
//         }
//       />
//       <Divider />
//       <CardContent>
//         {loading ? (
//           <CircularProgress />
//         ) : error ? (
//           <Typography color="error">{error}</Typography>
//         ) : (
//           <TableContainer component={Paper} sx={{ width: '100%' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Role</TableCell>
//                   {isAdmin && <TableCell>Actions</TableCell>}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user._id}>
//                     <TableCell>{user._id}</TableCell>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     {isAdmin && (
//                       <TableCell>
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           onClick={() => handleEditClick(user)}
//                           sx={{
//                             mr: 1,
//                             color: 'green',
//                             borderColor: 'green',
//                             '&:hover': {
//                               backgroundColor: 'rgba(0, 128, 0, 0.1)',
//                               borderColor: 'darkgreen',
//                             },
//                           }}
//                         >
//                           Edit
//                         </Button>
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           color="error"
//                           onClick={() => handleDeleteClick(user)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     )}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </CardContent>

//       {/* Edit Dialog */}
//       <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ color: 'green' }}>Edit User</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Name"
//             name="name"
//             value={editUser?.name || ''}
//             onChange={handleEditChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={editUser?.email || ''}
//             onChange={handleEditChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Role"
//             name="role"
//             value={editUser?.role || ''}
//             onChange={handleEditChange}
//             fullWidth
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
//           <Button
//             variant="contained"
//             onClick={handleEditSave}
//             sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Delete User</DialogTitle>
//         <DialogContent>
//           <TextField label="Name" value={deleteUser?.name || ''} fullWidth margin="normal" disabled />
//           <TextField label="Email" value={deleteUser?.email || ''} fullWidth margin="normal" disabled />
//           <TextField label="Role" value={deleteUser?.role || ''} fullWidth margin="normal" disabled />
//           <Typography sx={{ mt: 2 }}>Are you sure you want to delete this user?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Add User Dialog */}
//       <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Add New User</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Name"
//             name="name"
//             value={newUser.name}
//             onChange={handleNewUserChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={newUser.email}
//             onChange={handleNewUserChange}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={newUser.password}
//             onChange={handleNewUserChange}
//             fullWidth
//             margin="normal"
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel id="role-select-label">Role</InputLabel>
//             <Select
//               labelId="role-select-label"
//               label="Role"
//               name="role"
//               value={newUser.role}
//               onChange={handleNewUserChange}
//             >
//               <MenuItem value="user">User</MenuItem>
//               <MenuItem value="admin">Admin</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" color="primary" onClick={handleAddUserSave}>
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// }

// export function UserTable(): JSX.Element {
//   return (
//     <Provider store={store}>
//       <UserTableComponent />
//     </Provider>
//   );
// }
