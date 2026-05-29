import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/**
 * UpdateCard - A reusable mobile card component with background image
 *
 * @param {string} title - The main heading of the card
 * @param {string} description - The description text
 * @param {string} buttonText - The text displayed on the button
 * @param {function} onButtonClick - Callback function when button is clicked
 * @param {string} backgroundImage - Optional custom background image path (defaults to /updateCard.png)
 */
const UpdateCard = ({
    title = 'Design Challenge 2026',
    description = 'Join us for an exciting design challenge! Create Stunning UI/UX design and win amazing prize!',
    buttonText = 'View Details',
    onButtonClick = () => { },
    backgroundImage = '/updateCard.png',
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            elevation={0}
            sx={{
                width: '100%',
                maxWidth: '100%',
                borderRadius: '32px',
                p: '24px 20px',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                minHeight: '200px',
                height: '22vh',
                maxHeight: '240px',
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    color: '#FFFFFF',
                    m: 0,
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    color: '#FFFFFF',
                    m: 0,
                    opacity: 0.95,
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
            >
                {description}
            </Typography>

            <Button
                variant="contained"
                disableElevation
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onButtonClick}
                sx={{
                    bgcolor: '#FFFFFF',
                    color: 'primary.main',
                    borderRadius: '50px',
                    px: '28px',
                    py: '12px',
                    fontSize: '15px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    alignSelf: 'flex-start',
                    mt: 'auto',
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'translateY(-2px)' : 'none',
                    '&:hover': {
                        bgcolor: '#FFFFFF',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                    },
                }}
            >
                {buttonText}
            </Button>
        </Card>
    );
};

export default UpdateCard;
