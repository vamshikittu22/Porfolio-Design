import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChatAssistant from './ChatAssistant';
import { ChatService } from '../../../services/chatService';

// Mock the chat service dependency
vi.mock('../../../services/chatService', () => {
  return {
    ChatService: {
      getInstance: vi.fn(() => ({
        sendMessage: vi.fn().mockResolvedValue('Synthetic AI response received.'),
        getHistory: vi.fn().mockReturnValue([])
      }))
    }
  };
});

describe('ChatAssistant', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the launcher in initial state', () => {
    render(<ChatAssistant />);
    const launcher = screen.getByLabelText(/open portfolio assistant/i);
    expect(launcher).toBeInTheDocument();
  });

  it('opens the interactive panel upon click', async () => {
    render(<ChatAssistant />);
    const launcher = screen.getByLabelText(/open portfolio assistant/i);
    
    fireEvent.click(launcher);
    
    expect(screen.getByText('VK Neural')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type an inquiry/i)).toBeInTheDocument();
  });

  it('handles message submission and displays responses', async () => {
    render(<ChatAssistant />);
    fireEvent.click(screen.getByLabelText(/open portfolio assistant/i));
    
    const input = screen.getByPlaceholderText(/Type an inquiry/i);
    const sendButton = screen.getByLabelText(/send message/i);
    
    fireEvent.change(input, { target: { value: 'Inquire about skills' } });
    fireEvent.click(sendButton);
    
    expect(screen.getByText('Inquire about skills')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Synthetic AI response received.')).toBeInTheDocument();
    });
  });

  it('closes the panel correctly', async () => {
    render(<ChatAssistant />);
    // Open
    fireEvent.click(screen.getByLabelText(/open portfolio assistant/i));
    // Close
    fireEvent.click(screen.getByLabelText(/close assistant/i));
    
    await waitFor(() => {
      expect(screen.queryByText('VK Neural')).not.toBeInTheDocument();
    });
  });
});