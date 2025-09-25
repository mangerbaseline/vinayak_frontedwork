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
import { Box } from '@mui/system';

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


  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  // const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  // const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadFiles, setUploadFiles] = useState<File[] | null>(null);


  const [uploadingUser, setUploadingUser] = useState<User | null>(null);
  const [uploading, setUploading] = useState(false);

  const loggedInUser =
    globalThis.window !== undefined && localStorage.getItem('user')
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
          const summaries = data.map((item: { summary?: string }) => item.summary || '');
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
    setUploadingUser(user);
    setUploadDialogOpen(true);
  };

  // const _handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 5) {
  //     alert("You can upload up to 5 images only.");
  //     return;
  //   }
  //   setUploadFiles(e.target.files);
  // };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files) {
    setUploadFiles(Array.from(files));
  }
};


  const handleUploadSubmit = async () => {
    if (!uploadFiles || !uploadingUser) {
      alert("Please select images.");
      return;
    }

    const formData = new FormData();
    
  //  uploadFiles.forEach((file) => {
  for (const file of uploadFiles) {
  formData.append('images', file);
};

    
    setUploading(true);

    try {
      const res = await fetch('http://localhost:5000/api/users/upload-multiple-images', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert('Images uploaded successfully!');
        setUploadDialogOpen(false);
        setUploadFiles(null);
      } else {
        alert('Upload failed: ' + (data.message || 'Server error'));
      }
    } catch (err) {
      alert('Network error while uploading images');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{width:'135%'}} >
    <Card  >
      <CardHeader
        title="Users"
        action={
          isAdmin ? (
            <Button onClick={() => setIsAddDialogOpen(true)}>Add User</Button>
          ) : null
        }
      />
      <Divider />
      <CardContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="users table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {isAdmin && (
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleEditClick(user)}
                            style={{ marginRight: 8 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteClick(user)}
                            style={{ marginRight: 8 }}
                          >
                            Delete
                          </Button>

                          <Button
                             variant="outlined"
                             size="small"
                             onClick={() => handleViewClick(user)}
                             style={{ marginRight: 8 }}
                               >
                             View Summary
                             </Button>
                        </>

                      )}
                      {isNormalUser && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleUploadClick(user)}
                        >
                          Upload
                        </Button>
                      )}
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={editUser?.name || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={editUser?.email || ''}
            onChange={handleEditChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              label="Role"
              name="role"
              value={editUser?.role || ''}
              onChange={(e) => {
                if (!editUser) return;
                setEditUser({ ...editUser, role: e.target.value });
              }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
               
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete user{' '}
          <strong>{deleteUser?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={newUser.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={newUser.email}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="add-role-select-label">Role</InputLabel>
            <Select
              labelId="add-role-select-label"
              label="Role"
              name="role"
              value={newUser.role}
              onChange={handleSelectChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              {/* <MenuItem value="normal">Normal</MenuItem> */}
               <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddUserSave} variant="contained">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* View User Summary Dialog */}
      <Dialog open={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)}>
        <DialogTitle>Summary for {viewUser?.name}</DialogTitle>
        <DialogContent>
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

     

      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
  <DialogTitle>Upload Images for {uploadingUser?.name}</DialogTitle>
  <DialogContent>
    <Typography variant="body2" color="textSecondary" style={{ marginBottom: 8 }}>
      You can upload only 5 images.
    </Typography>

    {[...Array(5)].map((_, index) => (
      <input
        key={index}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

        
          const newFiles = [...(uploadFiles || [])];
          newFiles[index] = file;
          setUploadFiles(newFiles);

          
          const reader = new FileReader();
          reader.onload = function (event) {
            const imgElement = document.getElementById(`preview-${index}`) as HTMLImageElement;
            if (imgElement && event.target?.result) {
              imgElement.src = event.target.result as string;
            }
          };
          reader.readAsDataURL(file);
        }}
        style={{ display: 'block', marginTop: 10 }}
      />
    ))}

    {/* Image previews */}
    <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          id={`preview-${index}`}
          src=""
          alt={`preview-${index}`}
          style={{
            width: 100,
            height: 100,
            objectFit: 'cover',
            border: '1px solid #ccc',
            display: uploadFiles && uploadFiles[index] ? 'block' : 'none',
          }}
        />
      ))}
    </div>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
    <Button
      variant="contained"
      onClick={handleUploadSubmit}
      disabled={uploading}
    >
      {uploading ? 'Uploading...' : 'save'}
    </Button>
  </DialogActions>
</Dialog>

    </Card>
    </Box>
  );
}

export default function UsersPage(): JSX.Element {
  return (
    <Provider store={store}>
      <UserTableComponent />
    </Provider>
  );
}



