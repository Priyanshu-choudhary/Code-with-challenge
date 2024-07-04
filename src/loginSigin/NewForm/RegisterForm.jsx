import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('error');

  const password = watch('password', '');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('https://hytechlabs.online:9090/register/temp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Registration successful');
        setAlertSeverity('success');
        setAlertMessage(`We sent a confirmation email to your provided email ${data.email} successfully. Check the spam section as well.`);
        reset(); // Optionally reset the form
      } else {
        console.error('Registration failed');
        setAlertSeverity('error');
        setAlertMessage('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      setAlertSeverity('error');
      setAlertMessage('Error registering. Please try again.');
    } finally {
      setLoading(false);
      setAlertOpen(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '10px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center' }}>
        <p className="shine-effect" style={{color:"white",backgroundColor:"#9d5cfa",padding:5,borderRadius:5}}>Form</p>
      </Typography>
      <TextField
        fullWidth
        label="Username"
        {...register('username', {
          required: 'Username is required',
          pattern: {
            value: /^[a-zA-Z][a-zA-Z0-9]*$/,
            message: 'Username must start with a letter and contain only letters and numbers',
          },
        })}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email Address"
        {...register('email', {
          required: 'Email address is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
          pattern: {
            value: /^\S*$/,
            message: 'Password cannot contain spaces',
          },
        })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        margin="normal"
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        type="password"
        label="Confirm Password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: (value) =>
            value === password || 'The passwords do not match',
        })}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
        margin="normal"
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
      </Button>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link href="/login" variant="body2">
          Already have an account? Login
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterForm;
