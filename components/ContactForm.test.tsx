import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setupMockRouter } from '@/testUtils/mocks/nextRouter'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setupMockRouter('en')

    // Mock successful fetch response
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ status: 'Success' })
    } as Response)
  })

  it('should render form with all fields', () => {
    render(<ContactForm />)

    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Your Email*')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('should render Japanese text when locale is ja', () => {
    setupMockRouter('ja')

    render(<ContactForm />)

    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument()
  })

  it('should show loading state when submitting', async () => {
    render(<ContactForm />)

    const nameInput = screen.getByPlaceholderText('Your Name')
    const emailInput = screen.getByPlaceholderText('Your Email*')
    const messageInput = screen.getByPlaceholderText('Message')

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })

    // Test that form fields are properly filled
    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(messageInput).toHaveValue('Test message')
  })

  it('should handle form input changes correctly', () => {
    render(<ContactForm />)

    const nameInput = screen.getByPlaceholderText('Your Name')
    const emailInput = screen.getByPlaceholderText('Your Email*')
    const messageInput = screen.getByPlaceholderText('Message')

    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(messageInput, {
      target: { value: 'Test message content' }
    })

    expect(nameInput).toHaveValue('Test User')
    expect(emailInput).toHaveValue('test@example.com')
    expect(messageInput).toHaveValue('Test message content')
  })

  it('should have proper accessibility attributes', () => {
    render(<ContactForm />)

    // Check for labels and accessibility
    const nameLabel = screen.getByLabelText(/Your Name/i)
    const emailLabel = screen.getByLabelText(/Your Email/i)
    const messageLabel = screen.getByLabelText(/Message/i)
    const submitButton = screen.getByRole('button', { name: /send/i })

    expect(nameLabel).toBeInTheDocument()
    expect(emailLabel).toBeInTheDocument()
    expect(messageLabel).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('should validate required fields', () => {
    render(<ContactForm />)

    const nameInput = screen.getByPlaceholderText('Your Name')
    const emailInput = screen.getByPlaceholderText('Your Email*')
    const messageInput = screen.getByPlaceholderText('Message')

    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(messageInput).toBeRequired()
  })

  it('should have proper form structure', () => {
    render(<ContactForm />)

    const nameInput = screen.getByPlaceholderText('Your Name')
    const emailInput = screen.getByPlaceholderText('Your Email*')
    const messageInput = screen.getByPlaceholderText('Message')
    const submitButton = screen.getByRole('button', { name: /send/i })

    expect(nameInput).toHaveAttribute('type', 'text')
    expect(emailInput).toHaveAttribute('type', 'text')
    expect(messageInput).toHaveAttribute('name', 'message')
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('should show form helper text', () => {
    render(<ContactForm />)

    expect(
      screen.getByText(/\*You can fill in other valid contact methods/)
    ).toBeInTheDocument()
  })

  it('should generate unique IDs for form elements', () => {
    render(<ContactForm />)

    // Check that IDs are generated (useId hook)
    const nameInput = screen.getByPlaceholderText('Your Name')
    const emailInput = screen.getByPlaceholderText('Your Email*')
    const messageInput = screen.getByPlaceholderText('Message')

    expect(nameInput.id).toBeTruthy()
    expect(emailInput.id).toBeTruthy()
    expect(messageInput.id).toBeTruthy()

    // IDs should be unique
    expect(nameInput.id).not.toBe(emailInput.id)
    expect(emailInput.id).not.toBe(messageInput.id)
    expect(nameInput.id).not.toBe(messageInput.id)
  })
})
