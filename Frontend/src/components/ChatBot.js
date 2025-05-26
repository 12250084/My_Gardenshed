import { useState, useContext } from 'react';
import {
    Box,
    IconButton,
    Paper,
    TextField,
    Avatar,
    Typography,
    Slide,
    CircularProgress,
    Link
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import Context from '../context';
import { FaRobot } from "react-icons/fa";
import SummaryApi from "../common";

const ChatBot = () => {
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm your shopping assistant. I can help you find products or answer questions about our store. How can I help you today?",
            sender: 'bot',
            timestamp: new Date(),
            type: 'text'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(Context);

    // Function to parse message text and identify links
    const parseMessage = (text) => {
        // Regular expression to match markdown-style links [text](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(text)) !== null) {
            // Add text before the link
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }

            // Add the link component
            parts.push(
                <Link
                    href={match[2]}
                    target="_blank"
                    key={match.index}
                    color="primary"
                    underline="hover"
                    sx={{ cursor: 'pointer' }}
                >
                    {match[1]}
                </Link>
            );

            lastIndex = match.index + match[0].length;
        }

        // Add remaining text after last link
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    const getAIResponse = async (userMessage) => {
        try {
            const response = await fetch(SummaryApi.chatWithAI.url, {
                method: SummaryApi.chatWithAI.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    message: userMessage
                })
            });

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error calling AI API:', error);
            return "Sorry, I'm having trouble connecting to the AI service. Please try again later.";
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        // Add user message
        const userMessage = {
            text: inputMessage,
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
        };
        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Show loading message
            setMessages(prev => [...prev, {
                text: "I'm looking through our products to find the best matches for you...",
                sender: 'bot',
                timestamp: new Date(),
                type: 'text'
            }]);

            // Get AI recommendation
            const aiResponse = await getAIResponse(inputMessage);

            // Add AI response with parsed links
            setMessages(prev => [...prev, {
                text: aiResponse,
                sender: 'bot',
                timestamp: new Date(),
                type: 'text',
                parsedText: parseMessage(aiResponse)
            }]);
        } catch (error) {
            console.error('Error processing message:', error);
            setMessages(prev => [...prev, {
                text: "Sorry, I encountered an error. Please try again later.",
                sender: 'bot',
                timestamp: new Date(),
                type: 'text'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 2
            }}
        >
            <Slide direction="up" in={chatOpen} mountOnEnter unmountOnExit>
                <Paper
                    elevation={3}
                    sx={{
                        width: 350,
                        maxWidth: '90vw',
                        maxHeight: '60vh',
                        height: 500,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    {/* Chat Header */}
                    <Box
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            p: 2,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Typography variant="h6">Shopping Assistant</Typography>
                        <IconButton
                            onClick={() => setChatOpen(false)}
                            sx={{ color: 'white' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Chat Messages */}
                    <Box
                        sx={{
                            flex: 1,
                            p: 2,
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            backgroundColor: '#f5f5f5'
                        }}
                    >
                        {messages.map((message, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                                    gap: 1,
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        bgcolor: message.sender === 'user' ? 'primary.main' : 'secondary.main',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    {message.sender === 'user' ? 'You' : 'AI'}
                                </Avatar>
                                <Box
                                    sx={{
                                        maxWidth: '70%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.5
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            p: 1.5,
                                            backgroundColor: message.sender === 'user' ? 'primary.light' : 'background.paper',
                                            color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                                            borderRadius: message.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0'
                                        }}
                                    >
                                        <Typography variant="body2" component="div">
                                            {message.parsedText || message.text}
                                        </Typography>
                                    </Paper>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            textAlign: message.sender === 'user' ? 'right' : 'left',
                                            color: 'text.secondary',
                                            px: 1
                                        }}
                                    >
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        {isLoading && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    gap: 1,
                                    alignItems: 'center',
                                    px: 1,
                                    py: 0.5
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        bgcolor: 'secondary.main',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    AI
                                </Avatar>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Box sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: 'text.secondary',
                                        animation: 'pulse 1.5s infinite ease-in-out',
                                        '@keyframes pulse': {
                                            '0%, 100%': { opacity: 0.5, transform: 'scale(0.75)' },
                                            '50%': { opacity: 1, transform: 'scale(1)' }
                                        }
                                    }} />
                                    <Box sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: 'text.secondary',
                                        animation: 'pulse 1.5s infinite ease-in-out',
                                        animationDelay: '0.2s'
                                    }} />
                                    <Box sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        backgroundColor: 'text.secondary',
                                        animation: 'pulse 1.5s infinite ease-in-out',
                                        animationDelay: '0.4s'
                                    }} />
                                </Box>
                            </Box>
                        )}
                    </Box>

                    {/* Input Area */}
                    <Box
                        sx={{
                            p: 2,
                            display: 'flex',
                            gap: 1,
                            borderTop: '1px solid #e0e0e0',
                            backgroundColor: 'white'
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            multiline
                            maxRows={3}
                            disabled={isLoading}
                        />
                        <IconButton
                            onClick={handleSendMessage}
                            disabled={inputMessage.trim() === '' || isLoading}
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: 'primary.dark'
                                },
                                '&:disabled': {
                                    backgroundColor: '#e0e0e0'
                                }
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            </Slide>

            {/* Chat Toggle Button */}
            <IconButton
                onClick={() => setChatOpen(!chatOpen)}
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    width: 56,
                    height: 56,
                    '&:hover': {
                        backgroundColor: 'primary.dark'
                    },
                    transition: 'transform 0.3s ease',
                    transform: chatOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                }}
            >
                {chatOpen ? <CloseIcon /> : <FaRobot fontSize="large" />}
            </IconButton>
        </Box>
    );
};

export default ChatBot;