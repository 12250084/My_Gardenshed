import React, {useState} from 'react';
import {Box, Container, Typography, TextField, Button, Grid, Divider, useTheme} from '@mui/material';
import {FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock} from 'react-icons/fa';
import {motion} from 'framer-motion';

const ContactUs = () => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setFormData({name: '', email: '', phone: '', message: ''});

        // Reset submission status after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const contactMethods = [
        {
            icon: <FaPhone size={24} color={theme.palette.primary.main}/>,
            title: "Phone",
            details: "+1 (555) 123-4567",
            subtitle: "Mon-Fri, 9am-5pm"
        },
        {
            icon: <FaEnvelope size={24} color={theme.palette.primary.main}/>,
            title: "Email",
            details: "info@thermofoilsheds.com",
            subtitle: "Response within 24 hours"
        },
        {
            icon: <FaMapMarkerAlt size={24} color={theme.palette.primary.main}/>,
            title: "Office",
            details: "123 Shed Street, Building 4",
            subtitle: "Melbourne, VIC 3000, Australia"
        },
        {
            icon: <FaClock size={24} color={theme.palette.primary.main}/>,
            title: "Hours",
            details: "Monday - Friday: 9am - 5pm",
            subtitle: "Saturday: 10am - 2pm"
        }
    ];

    return (
        <Box sx={{py: 8, backgroundColor: '#f9f9f9'}}>
            <Container maxWidth="lg">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: theme.palette.text.primary,
                            mb: 4
                        }}
                    >
                        Contact Us
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'center',
                            maxWidth: '700px',
                            mx: 'auto',
                            color: theme.palette.text.secondary,
                            mb: 6
                        }}
                    >
                        Have questions about our sheds or need a custom quote? Reach out to our team - we're here to
                        help with all your storage and shelter needs.
                    </Typography>
                </motion.div>

                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.6, delay: 0.2}}
                        >
                            <Box
                                width={'100%'}
                                display={'flex'}
                                flexDirection={'column'}
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: 3,
                                    p: 4,
                                    boxShadow: theme.shadows[2],
                                    height: '100%'
                                }}
                            >
                                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', mb: 3}}>
                                    Send us a message
                                </Typography>

                                {isSubmitted ? (
                                    <Box
                                        sx={{
                                            backgroundColor: theme.palette.success.light,
                                            color: theme.palette.success.dark,
                                            p: 2,
                                            borderRadius: 2,
                                            mb: 3
                                        }}
                                    >
                                        Thank you for your message! We'll get back to you soon.
                                    </Box>
                                ) : null}

                                <form onSubmit={handleSubmit}  style={{width: '100%'}}>
                                    <Box container spacing={3} gap={2}  style={{width: '600px'}} display={'flex'}
                                         flexDirection={'column'}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Your Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                error={!!errors.name}
                                                helperText={errors.name}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                error={!!errors.email}
                                                helperText={errors.email}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Phone Number (Optional)"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Your Message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                error={!!errors.message}
                                                helperText={errors.message}
                                                variant="outlined"
                                                multiline
                                                rows={4}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                fullWidth
                                                sx={{
                                                    py: 1.5,
                                                    fontWeight: 'bold',
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                Send Message
                                            </Button>
                                        </Grid>
                                    </Box>
                                </form>
                            </Box>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.6, delay: 0.4}}
                        >
                            <Box
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: 3,
                                    p: 4,
                                    boxShadow: theme.shadows[2],
                                    height: '100%'
                                }}
                            >
                                <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold', mb: 3}}>
                                    Contact Information
                                </Typography>

                                <Grid container spacing={3}>
                                    {contactMethods.map((method, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
                                            <Box sx={{display: 'flex', gap: 2}}>
                                                <Box sx={{mt: 0.5}}>
                                                    {method.icon}
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                                                        {method.title}
                                                    </Typography>
                                                    <Typography variant="body1"
                                                                sx={{color: theme.palette.text.primary}}>
                                                        {method.details}
                                                    </Typography>
                                                    <Typography variant="body2"
                                                                sx={{color: theme.palette.text.secondary}}>
                                                        {method.subtitle}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Divider sx={{my: 4}}/>

                                <Typography variant="h6" gutterBottom sx={{fontWeight: 'bold'}}>
                                    Our Location
                                </Typography>
                                <Box
                                    sx={{
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        height: '250px',
                                        mt: 2
                                    }}
                                >
                                    <iframe
                                        title="Our Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.9537353159046!3d-37.817209442021234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                                        width="100%"
                                        height="100%"
                                        style={{border: 0}}
                                        allowFullScreen=""
                                        loading="lazy"
                                    ></iframe>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>

                <Box sx={{mt: 8, textAlign: 'center'}}>
                    <Typography variant="h5" sx={{fontWeight: 'bold', mb: 2}}>
                        Need immediate assistance?
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        sx={{
                            px: 4,
                            fontWeight: 'bold',
                            borderWidth: 2,
                            '&:hover': {borderWidth: 2}
                        }}
                        startIcon={<FaPhone/>}
                    >
                        Call Now: (555) 123-4567
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ContactUs;