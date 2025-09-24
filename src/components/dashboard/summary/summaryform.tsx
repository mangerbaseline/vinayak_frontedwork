'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Modal,
} from '@mui/material';

// ✅ Add a proper type for items returned by the API
type SummaryItem = string | { summary: string };

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const Summaryform = () => {
  const [summary, setSummary] = useState('');
  const [sentSummaries, setSentSummaries] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const API_URL = 'http://localhost:5000/api/users/summaries';

  useEffect(() => {
    const fetchSummaries = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No auth token found, skipping fetch.');
        setSentSummaries([]);
        return;
      }

      try {
        const res = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();

          
          const summaries = Array.isArray(data)
            ? data.map((item: SummaryItem) =>
                typeof item === 'string' ? item : item.summary
              )
            : [];

          setSentSummaries(summaries);
          setSaved(true);
        } else {
          console.error('Failed to fetch summaries:', res.status);
          setSentSummaries([]);
        }
      } catch (error) {
        console.error('Error fetching summaries:', error);
        setSentSummaries([]);
      }
    };

    fetchSummaries();
  }, []);

  const handleSend = async () => {
    const token = localStorage.getItem('token');
    if (summary.trim() === '' || !token) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ summary }),
      });

      if (res.ok) {
        const newSummary = await res.json();
        const summaryText = newSummary.summary || newSummary;
        setSentSummaries((prev) => [...prev, summaryText]);
        setSummary('');
        setSaved(false);
      } else {
        console.error('Failed to send summary');
      }
    } catch (error) {
      console.error('Error sending summary:', error);
    }
  };

  const handleSave = () => {
    setSaved(true);
    handleSend();
    setModalOpen(false);
  };

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#115293' },
            ml: '-265px',
          }}
        >
          Add Summary
        </Button>
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-summary-title"
        aria-describedby="modal-summary-description"
      >
        <Box sx={style}>
          <Typography id="modal-summary-title" variant="h6" component="h2" mb={2}>
            Add Your Summary
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Type your summary here..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" color="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: saved ? '#4caf50' : '#f44336',
                '&:hover': { backgroundColor: saved ? '#388e3c' : '#d32f2f' },
              }}
              onClick={handleSave}
              disabled={saved}
            >
              {saved ? 'Saved' : 'Save'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {sentSummaries.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Summaries:
          </Typography>

          {sentSummaries.map((item: string, index: number) => (
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

                <Button size="small" variant="text" onClick={() => handleToggle(index)}>
                  {expandedIndex === index ? 'View Less' : 'View More'}
                </Button>
              </Box>

              {expandedIndex === index && (
                <Paper elevation={3} sx={{ mt: 2, p: 2, backgroundColor: '#fff3e0' }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Detailed View:
                  </Typography>
                  <Typography sx={{ whiteSpace: 'pre-wrap' }}>{item}</Typography>
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
