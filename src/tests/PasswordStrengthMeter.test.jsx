import { describe, it, expect } from 'bun:test'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {
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

  it('vuelve a vacía al borrar todo', async () => {
    render(<PasswordStrengthMeter />)
    const input = screen.getByLabelText(/contraseña/i)
    await userEvent.type(input, 'abc')
    await userEvent.clear(input)
    expect(screen.getByText('vacía')).toBeDefined()
  })

  it('8 caracteres sin número no es débil', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefgh')
    expect(screen.queryByText('débil')).toBeNull()
  })

  it('7 caracteres no es media', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'abcdefg')
    expect(screen.queryByText('media')).toBeNull()
  })

  it('solo símbolos con menos de 8 caracteres es débil', async () => {
    render(<PasswordStrengthMeter />)
    await userEvent.type(screen.getByLabelText(/contraseña/i), '!!!!')
    expect(screen.getByText('débil')).toBeDefined()
  })
})