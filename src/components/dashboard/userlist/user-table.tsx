// 'use client';

// import * as React from 'react';
// import { useState } from 'react';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardContent from '@mui/material/CardContent';
// import Divider from '@mui/material/Divider';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// }
// export function UserTable(): React.JSX.Element {
//   const [users] = useState<User[]>([
//     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
//     { id: 3, name: 'Ali Khan', email: 'ali@example.com', role: 'Moderator' },
//     { id: 4, name: 'Sara Lee', email: 'sara@example.com', role: 'Editor' },
//     { id: 5, name: 'Michael Chen', email: 'michael@example.com', role: 'User' },
//     { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin' },
//     { id: 7, name: 'Ravi Patel', email: 'ravi@example.com', role: 'User' },
//     { id: 8, name: 'Laura Park', email: 'laura@example.com', role: 'Moderator' },
//     { id: 9, name: 'Omar Hassan', email: 'omar@example.com', role: 'Editor' },
//     { id: 10, name: 'Grace Lee', email: 'grace@example.com', role: 'User' },
//   ]);
//   return (
//     <Card sx={{width:'100%'}}>
//       <CardHeader title="User List" subheader="List of registered users" />
//       <Divider />
//       <CardContent>
//         <TableContainer component={Paper}  sx={{width:'100%'}}>
//           <Table aria-label="user list table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Role</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   );
// }




// 'use client';

// import * as React from 'react';
// import { useEffect, useState } from 'react';
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
// } from '@mui/material';

// interface User {
//   id: number;
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

// const fetchUsers = createAsyncThunk('users/fetch', async () => {
//   const res = await fetch('http://localhost:5000/api/users');
//   if (!res.ok) throw new Error('Failed to fetch users');
//   return res.json();
// });

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
//         state.error = action.error.message || 'Error';
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

// function UserTableComponent(): React.JSX.Element {
//   const dispatch = useDispatch<AppDispatch>();
//   const { users, loading, error } = useSelector((state: RootState) => state.users);

//   // Edit dialog state
//   const [editUser, setEditUser] = useState<User | null>(null);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

//   // Delete dialog state
//   const [deleteUser, setDeleteUser] = useState<User | null>(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

//     const res = await fetch(`http://localhost:5000/api/users/${editUser.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(editUser),
//     });

//     if (res.ok) {
//       setIsEditDialogOpen(false);
//       setEditUser(null);
//       dispatch(fetchUsers());
//     } else {
//       alert('Failed to update user');
//     }
//   };

 
//   const handleDeleteClick = (user: User) => {
//     setDeleteUser(user);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!deleteUser) return;

//     const res = await fetch(`http://localhost:5000/api/users/${deleteUser.id}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       setIsDeleteDialogOpen(false);
//       setDeleteUser(null);
//       dispatch(fetchUsers());
//     } else {
//       alert('Failed to delete user');
//     }
//   };

//   return (
//     <Card sx={{ width: '100%' }}>
//       <CardHeader title="User List" subheader="List of registered users" />
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
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.id}</TableCell>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         onClick={() => handleEditClick(user)}
//                         sx={{ mr: 1 }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         color="error"
//                         onClick={() => handleDeleteClick(user)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </CardContent>

//       {/* Edit Dialog */}
//       <Dialog
//         open={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Edit User</DialogTitle>
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
//           <Button variant="contained" onClick={handleEditSave}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

// <Dialog
//   open={isDeleteDialogOpen}
//   onClose={() => setIsDeleteDialogOpen(false)}
//   maxWidth="sm"
//   fullWidth
// >
//   <DialogTitle>Delete User</DialogTitle>
//   <DialogContent>
//     <TextField
//       label="Name"
//       value={deleteUser?.name || ''}
//       fullWidth
//       margin="normal"
//       disabled
//     />
//     <TextField
//       label="Email"
//       value={deleteUser?.email || ''}
//       fullWidth
//       margin="normal"
//       disabled
//     />
//     <TextField
//       label="Role"
//       value={deleteUser?.role || ''}
//       fullWidth
//       margin="normal"
//       disabled
//     />
//     <Typography sx={{ mt: 2 }}>
//       Are you sure you want to delete this user?
//     </Typography>
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
//     <Button
//       variant="contained"
//       color="error"
//       onClick={handleDeleteConfirm}
//     >
//       Delete
//     </Button>
//   </DialogActions>
// </Dialog>


//     </Card>
//   );
// }

// export function UserTable(): React.JSX.Element {
//   return (
//     <Provider store={store}>
//       <UserTableComponent />
//     </Provider>
//   );
// }


// 'use client';

// import * as React from 'react';
// import { useEffect, useState } from 'react';
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
// } from '@mui/material';

// interface User {
//   id: number;
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

// const fetchUsers = createAsyncThunk('users/fetch', async () => {
//   const res = await fetch('http://localhost:5000/api/users');
//   if (!res.ok) throw new Error('Failed to fetch users');
//   return res.json();
// });

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
//         state.error = action.error.message || 'Error';
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

// function UserTableComponent(): React.JSX.Element {
//   const dispatch = useDispatch<AppDispatch>();
//   const { users, loading, error } = useSelector((state: RootState) => state.users);

//   // Edit dialog state
//   const [editUser, setEditUser] = useState<User | null>(null);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  
//   const [deleteUser, setDeleteUser] = useState<User | null>(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

//     const res = await fetch(`http://localhost:5000/api/users/${editUser.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(editUser),
//     });

//     if (res.ok) {
//       setIsEditDialogOpen(false);
//       setEditUser(null);
//       dispatch(fetchUsers());
//     } else {
//       alert('Failed to update user');
//     }
//   };

//   const handleDeleteClick = (user: User) => {
//     setDeleteUser(user);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!deleteUser) return;

//     const res = await fetch(`http://localhost:5000/api/users/${deleteUser.id}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       setIsDeleteDialogOpen(false);
//       setDeleteUser(null);
//       dispatch(fetchUsers());
//     } else {
//       alert('Failed to delete user');
//     }
//   };

//   return (
//     <Card sx={{ width: '100%' }}>
//       <CardHeader title="User List" subheader="List of registered users" />
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
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.id}</TableCell>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
                    
//                     <TableCell>
//                      <Button
//                       size="small"
//                       variant="outlined"
//                      onClick={() => handleEditClick(user)}
//                      sx={{ 
//                      mr: 1,
//                     color: 'green',
//                    borderColor: 'green',
//                     '&:hover': {
//                       backgroundColor: 'rgba(0, 128, 0, 0.1)',
//                     borderColor: 'darkgreen',
//                       },
//                    }}
//                      >
//                     Edit
//                    </Button>
//                       <Button
//                      size="small"
//                       variant="outlined"
//                      color="error"
//                    onClick={() => handleDeleteClick(user)}
//                       >
//                         Delete
//                      </Button>
//                    </TableCell>

//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </CardContent>

//       {/* Edit Dialog */}
//       <Dialog
//         open={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//       >
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
//       <Dialog
//         open={isDeleteDialogOpen}
//         onClose={() => setIsDeleteDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Delete User</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Name"
//             value={deleteUser?.name || ''}
//             fullWidth
//             margin="normal"
//             disabled
//           />
//           <TextField
//             label="Email"
//             value={deleteUser?.email || ''}
//             fullWidth
//             margin="normal"
//             disabled
//           />
//           <TextField
//             label="Role"
//             value={deleteUser?.role || ''}
//             fullWidth
//             margin="normal"
//             disabled
//           />
//           <Typography sx={{ mt: 2 }}>
//             Are you sure you want to delete this user?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={handleDeleteConfirm}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// }

// export function UserTable(): React.JSX.Element {
//   return (
//     <Provider store={store}>
//       <UserTableComponent />
//     </Provider>
//   );
// }


// 'use client';

// import * as React from 'react';
// import { useEffect, useState } from 'react';
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
// } from '@mui/material';

// interface User {
//   id: number;
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

// // Fetch all users publicly — no token needed
// const fetchUsers = createAsyncThunk('users/fetch', async () => {
//   const res = await fetch('http://localhost:5000/api/users');
//   if (!res.ok) throw new Error('Failed to fetch users');
//   return res.json();
// });

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
//         state.error = action.error.message || 'Error';
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

// function UserTableComponent(): React.JSX.Element {
//   const dispatch = useDispatch<AppDispatch>();
//   const { users, loading, error } = useSelector((state: RootState) => state.users);

//   const [editUser, setEditUser] = useState<User | null>(null);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

//   const [deleteUser, setDeleteUser] = useState<User | null>(null);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

//   // Fetch users on mount — no token required
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

//     // For updating, you might still need token auth — if your backend requires it.
//     // If not, you can remove the Authorization header.
//     const res = await fetch(`http://localhost:5000/api/users/${editUser.id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(editUser),
//     });

//     if (res.ok) {
//       setIsEditDialogOpen(false);
//       setEditUser(null);
//       dispatch(fetchUsers());
//     } else {
//       alert('Failed to update user');
//     }
//   };

//   const handleDeleteClick = (user: User) => {
//     setDeleteUser(user);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!deleteUser) return;

//     // For deleting, same note as update — adjust auth headers if needed
//     const res = await fetch(`http://localhost:5000/api/users/${deleteUser.id}`, {
//       method: 'DELETE',
//     });

//     if (res.ok) {
//       setIsDeleteDialogOpen(false);
//       setDeleteUser(null);
//       dispatch(fetchUsers());
//     } else {
//       alert('Failed to delete user');
//     }
//   };

//   return (
//     <Card sx={{ width: '100%' }}>
//       <CardHeader title="User List" subheader="All registered users" />
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
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.id}</TableCell>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         onClick={() => handleEditClick(user)}
//                         sx={{
//                           mr: 1,
//                           color: 'green',
//                           borderColor: 'green',
//                           '&:hover': {
//                             backgroundColor: 'rgba(0, 128, 0, 0.1)',
//                             borderColor: 'darkgreen',
//                           },
//                         }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         color="error"
//                         onClick={() => handleDeleteClick(user)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </CardContent>

//       {/* Edit Dialog */}
//       <Dialog
//         open={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//       >
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
//       <Dialog
//         open={isDeleteDialogOpen}
//         onClose={() => setIsDeleteDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Delete User</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Name"
//             value={deleteUser?.name || ''}
//             fullWidth
//             margin="normal"
//             disabled
//           />
//           <TextField
//             label="Email"
//             value={deleteUser?.email || ''}
//             fullWidth
//             margin="normal"
//             disabled
//           />
//           <TextField
//             label="Role"
//             value={deleteUser?.role || ''}
//             fullWidth
//             margin="normal"
//             disabled
//           />
//           <Typography sx={{ mt: 2 }}>
//             Are you sure you want to delete this user?
//           </Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={handleDeleteConfirm}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// }

// export function UserTable(): React.JSX.Element {
//   return (
//     <Provider store={store}>
//       <UserTableComponent />
//     </Provider>
//   );
// }




'use client';

import React, { useEffect, useState } from 'react';
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
  const res = await fetch('http://localhost:5000/api/users');
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
        state.error = action.error.message || 'Error';
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

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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

    try {
      const res = await fetch(`http://localhost:5000/api/users/${editUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
        alert('Failed to update user: ' + (errorData.message || res.statusText));
        console.error('Update error:', errorData);
      }
    } catch (error) {
      alert('Network error while updating user');
      console.error('Network error:', error);
    }
  };

  const handleDeleteClick = (user: User) => {
    setDeleteUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${deleteUser._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setIsDeleteDialogOpen(false);
        setDeleteUser(null);
        dispatch(fetchUsers());
      } else {
        const errorData = await res.json();
        alert('Failed to delete user: ' + (errorData.message || res.statusText));
        console.error('Delete error:', errorData);
      }
    } catch (error) {
      alert('Network error while deleting user');
      console.error('Network error:', error);
    }
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title="User List" subheader="All registered users" />
      <Divider />
      <CardContent>
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
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
          <TextField
            label="Name"
            value={deleteUser?.name || ''}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Email"
            value={deleteUser?.email || ''}
            fullWidth
            margin="normal"
            disabled
          />
          <TextField
            label="Role"
            value={deleteUser?.role || ''}
            fullWidth
            margin="normal"
            disabled
          />
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteConfirm}
          >
            Delete
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
