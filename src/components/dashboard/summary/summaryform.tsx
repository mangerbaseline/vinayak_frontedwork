'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const Summaryform = () => {
  const [summary, setSummary] = useState('');
  const [sentSummaries, setSentSummaries] = useState([]);
  const [saved, setSaved] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null); 

  useEffect(() => {
    const stored = localStorage.getItem('userSummaries');
    if (stored) {
      setSentSummaries(JSON.parse(stored));
      setSaved(true);
    }
  }, []);

  const handleSend = () => {
    if (summary.trim() === '') return;

    const newSummaries = [...sentSummaries, summary];
    setSentSummaries(newSummaries);
    setSummary('');
    setSaved(false);
  };

  const handleSave = () => {
    if (sentSummaries.length === 0) return;

    localStorage.setItem('userSummaries', JSON.stringify(sentSummaries));
    setSaved(true);
  };

  const handleToggle = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); 
    } else {
      setExpandedIndex(index); 
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <TextField
        fullWidth
        multiline
        minRows={3}
        placeholder="Type your summary here..."
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <Box sx={{ mt: 2, display: 'flex', gap: 2}}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#4caf50',
            '&:hover': { backgroundColor: '#388e3c' },
          }}
          onClick={handleSend}
          disabled={summary.trim() === ''}
        >
          Send
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: saved ? '#f44336' : '#d32f2f',
            '&:hover': { backgroundColor: saved ? '#d32f2f' : '#b71c1c' },
          }}
          onClick={handleSave}
          disabled={sentSummaries.length === 0}
        >
          {saved ? 'Saved' : 'Save'}
        </Button>
      </Box>

      {sentSummaries.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Summaries:
          </Typography>

          {sentSummaries.map((item, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                backgroundColor: '#fafafa',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '75%',
                  }}
                >
                  {index + 1}. {item}
                </Typography>

                <Button
                  size="small"
                  variant="text"
                  onClick={() => handleToggle(index)}
                >
                  {expandedIndex === index ? 'View Less' : 'View More'}
                </Button>
              </Box>

              {expandedIndex === index && (
                <Paper
                  elevation={3}
                  sx={{ mt: 2, p: 2, backgroundColor: '#fff3e0' }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Detailed View:
                  </Typography>
                  <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                    {item}
                  </Typography>
                </Paper>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};


export default Summaryform;
