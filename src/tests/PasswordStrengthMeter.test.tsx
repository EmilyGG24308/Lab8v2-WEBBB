/** @jsxImportSource react */
import { describe, it, expect, afterEach } from 'bun:test'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {
  afterEach(() => {
    cleanup()
  })

  it('renderiza un input de contraseña', () => {
    render(<PasswordStrengthMeter />)
    expect(screen.getByLabelText(/contraseña/i)).toBeDefined()
  })

  it('muestra vacía al inicio', () => {
    render(<PasswordStrengthMeter />)
    expect(screen.getByText('vacía')).toBeDefined()
  })

  it('muestra débil para contraseña corta', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'abc')
    expect(screen.getByText('débil')).toBeDefined()
  })

  it('muestra media para 8 caracteres sin número', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
    expect(screen.getByText('media')).toBeDefined()
  })

  it('muestra fuerte para 8+ caracteres con número', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefg1')
    expect(screen.getByText('fuerte')).toBeDefined()
  })

  it('muestra muy fuerte con número y símbolo', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefg1!')
    expect(screen.getByText('muy fuerte')).toBeDefined()
  })
})  