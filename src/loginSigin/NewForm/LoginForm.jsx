import { useForm } from 'react-hook-form';
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
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send data to backend to save temporarily and send verification email
      const response = await fetch('https://testcfc.onrender.com/register/temp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        console.log('Temporary registration data saved successfully');
        // Optionally show a message to the user that verification email has been sent
      } else {
        console.error('Failed to save temporary registration data');
        // Handle error condition
      }
    } catch (error) {
      console.error('Error saving temporary registration data:', error);
      // Handle network or other errors
    }
  };

  const password = watch('password', ''); // Watch the 'password' input for confirmation

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '50px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2, textAlign: 'center' }}>
        Register
      </Typography>
      <TextField
        fullWidth
        label="Name"
        {...register('name', {
          required: 'Name is required',
          pattern: {
            value: /^[a-zA-Z][a-zA-Z0-9]*$/,
            message: 'Name must start with a letter and contain only letters and numbers',
          },
        })}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
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
        Register
      </Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link href="#" variant="body2">
          Already have an account? Login
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterForm;
