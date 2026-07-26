
import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import styles from '../buttons/shimmerButton/shimmer.module.css';
import ApplyNowButton from '../buttons/ApplyNowButton';

const ContactUs = ({ contactUsData, setcontactUsData, onClick }) => {
    const [errors, setErrors] = useState({
        name: '',
        message: '',
        phone: ''
    });
    const [touched, setTouched] = useState({
        name: false,
        message: false,
        phone: false
    });

    // Validate mandatory fields
    const validateField = (fieldName, value) => {
        let error = '';
        
        switch (fieldName) {
            case 'name':
                if (!value || value.trim() === '') {
                    error = 'Full Name is required';
                }
                break;
            case 'message':
                if (!value || value.trim() === '') {
                    error = 'Message is required';
                }
                break;
            case 'phone':
                if (!value || value.trim() === '') {
                    error = 'Phone is required';
                } else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
                    error = 'Please enter a valid 10-digit phone number';
                }
                break;
            default:
                break;
        }
        
        return error;
    };

    // Check if form is valid
    const isFormValid = () => {
        const nameValid = contactUsData?.name && contactUsData.name.trim() !== '';
        const messageValid = contactUsData?.message && contactUsData.message.trim() !== '';
        const phoneValid = contactUsData?.phone && contactUsData.phone.trim() !== '' && /^\d{10}$/.test(contactUsData.phone.replace(/\D/g, ''));
        
        return nameValid && messageValid && phoneValid;
    };

    const handleFieldChange = (fieldName, value) => {
        setcontactUsData({ ...contactUsData, [fieldName]: value });
        
        // Validate if field has been touched
        if (touched[fieldName]) {
            const error = validateField(fieldName, value);
            setErrors({ ...errors, [fieldName]: error });
        }
    };

    const handleFieldBlur = (fieldName) => {
        setTouched({ ...touched, [fieldName]: true });
        const value = contactUsData?.[fieldName] || '';
        const error = validateField(fieldName, value);
        setErrors({ ...errors, [fieldName]: error });
    };

    const handleSubmit = () => {
        // Mark all mandatory fields as touched
        const allTouched = {
            name: true,
            message: true,
            phone: true
        };
        setTouched(allTouched);

        // Validate all mandatory fields
        const nameError = validateField('name', contactUsData?.name || '');
        const messageError = validateField('message', contactUsData?.message || '');
        const phoneError = validateField('phone', contactUsData?.phone || '');

        const newErrors = {
            name: nameError,
            message: messageError,
            phone: phoneError
        };
        setErrors(newErrors);

        // Only submit if form is valid
        if (isFormValid()) {
            onClick();
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                gap: "30px",
                width: "100%",
            }}>
            {/* Left Container - Contact Info */}
            {/* <Box sx={{ height: "100%" }}> */}
            <Box
                // className={styles.shimmerCard}
                sx={{
                    flex: "0 0 35%",
                    padding: "40px",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    position: "relative",
                    background: "linear-gradient(180deg, #182936 0%, #0C1217 100%)"
                }}>
                <Box
                    sx={{
                        marginBottom: "16px",
                        fontFamily: "Encode Sans, sans-serif",
                        lineHeight: "1.2"
                    }}>
                    <Box
                        sx={{
                            fontSize: "45px",
                            fontWeight: "700",
                            fontFamily: "Encode Sans, sans-serif",
                            lineHeight: "60px",
                            letterSpacing: "0px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}>
                        {/* First line: Don't be shy, */}
                        <Box
                            sx={{ display: "flex", gap: "8px" }}>
                            <span style={{
                                background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text"
                            }}>
                                Don't
                            </span>
                            <span
                                style={{
                                    background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}>
                                be
                            </span>
                            <span
                                style={{
                                    background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}>
                                shy,
                            </span>
                        </Box>

                        {/* Second line: just say hi. */}
                        <Box
                            sx={{ display: "flex", gap: "8px" }}>
                            <span style={{
                                background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text"
                            }}>
                                just
                            </span>
                            <span
                                style={{
                                    background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}>
                                say
                            </span>
                            <span
                                style={{
                                    background: "linear-gradient(180deg, #FFFFFF 0%, #67B0E4 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text"
                                }}>
                                hi.
                            </span>
                        </Box>
                    </Box>
                </Box>

                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#E5E8EC",
                        fontFamily: "Encode Sans, sans-serif"
                    }}
                >
                    Flutterkanpur@gmail.com
                </Typography>
            </Box>
            {/* </Box> */}

            {/* Right Container - Contact Form */}
            <Box sx={{
                flex: "0 0 65%",
                background: "#0C1217",
                borderRadius: "12px",
                padding: "40px",
                border: "1px solid rgba(255,255,255,0.1)"
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px"
                }}>
                    <TextField
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        onBlur={() => handleFieldBlur('name')}
                        type='text'
                        label="Full Name"
                        variant="standard"
                        value={contactUsData?.name || ''}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '500'
                            },
                            '& .MuiInput-root': {
                                color: '#FFFFFF',
                                fontSize: '16px',
                                '&:before': {
                                    borderBottom: errors.name ? '1px solid #d32f2f' : '1px solid rgba(255,255,255,0.3)'
                                },
                                '&:after': {
                                    borderBottom: errors.name ? '1px solid #d32f2f' : '1px solid #FFFFFF'
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: errors.name ? '1px solid #d32f2f' : '1px solid rgba(255,255,255,0.5)'
                                }
                            },
                            '& .MuiFormHelperText-root': {
                                color: errors.name ? '#d32f2f' : 'rgba(255,255,255,0.6)',
                                fontSize: '12px',
                                marginTop: '4px'
                            }
                        }}
                    />

                    <TextField
                        onChange={(e) => setcontactUsData({ ...contactUsData, email: e.target.value })}
                        type='email'
                        label="E-mail (Optional)"
                        variant="standard"
                        value={contactUsData?.email || ''}
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '500'
                            },
                            '& .MuiInput-root': {
                                color: '#FFFFFF',
                                fontSize: '16px',
                                '&:before': {
                                    borderBottom: '1px solid rgba(255,255,255,0.3)'
                                },
                                '&:after': {
                                    borderBottom: '1px solid #FFFFFF'
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: '1px solid rgba(255,255,255,0.5)'
                                }
                            }
                        }}
                    />

                    <TextField
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                        onBlur={() => handleFieldBlur('message')}
                        label="Message"
                        variant="standard"
                        multiline
                        rows={3}
                        value={contactUsData?.message || ''}
                        error={!!errors.message}
                        helperText={errors.message}
                        required
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '500'
                            },
                            '& .MuiInput-root': {
                                color: '#FFFFFF',
                                fontSize: '16px',
                                '&:before': {
                                    borderBottom: errors.message ? '1px solid #d32f2f' : '1px solid rgba(255,255,255,0.3)'
                                },
                                '&:after': {
                                    borderBottom: errors.message ? '1px solid #d32f2f' : '1px solid #FFFFFF'
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: errors.message ? '1px solid #d32f2f' : '1px solid rgba(255,255,255,0.5)'
                                }
                            },
                            '& .MuiFormHelperText-root': {
                                color: errors.message ? '#d32f2f' : 'rgba(255,255,255,0.6)',
                                fontSize: '12px',
                                marginTop: '4px'
                            }
                        }}
                    />

                    <TextField
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        onBlur={() => handleFieldBlur('phone')}
                        type='tel'
                        label="Phone"
                        variant="standard"
                        value={contactUsData?.phone || ''}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: '#FFFFFF',
                                fontSize: '14px',
                                fontWeight: '500'
                            },
                            '& .MuiInput-root': {
                                color: '#FFFFFF',
                                fontSize: '16px',
                                '&:before': {
                                    borderBottom: errors.phone ? '1px solid #d32f2f' : '1px solid rgba(255,255,255,0.3)'
                                },
                                '&:after': {
                                    borderBottom: errors.phone ? '1px solid #d32f2f' : '1px solid #FFFFFF'
                                },
                                '&:hover:not(.Mui-disabled):before': {
                                    borderBottom: errors.phone ? '1px solid #d32f2f' : '1px solid rgba(255,255,255,0.5)'
                                }
                            },
                            '& .MuiFormHelperText-root': {
                                color: errors.phone ? '#d32f2f' : 'rgba(255,255,255,0.6)',
                                fontSize: '12px',
                                marginTop: '4px'
                            }
                        }}
                    />

                    <Box sx={{ marginTop: "16px", display: "flex", justifyContent: "flex-start" }}>
                        <ApplyNowButton
                            disabled={!isFormValid()}
                            onClick={handleSubmit}
                            text="SUBMIT"
                            width="120px"
                            height="44px"
                            fontSize="14px"
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ContactUs
