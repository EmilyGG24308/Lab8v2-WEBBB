import { describe, it, expect } from 'bun:test'
import { getPasswordStrength } from '../utils/passwordStrength'

describe('getPasswordStrength', () => {
  it('retorna vacía para contraseña vacía', () => {
    expect(getPasswordStrength('')).toBe('vacía')
  })
  it('retorna débil para menos de 8 caracteres', () => {
    expect(getPasswordStrength('abc')).toBe('débil')
  })
  it('retorna débil para 7 caracteres con símbolo', () => {
    expect(getPasswordStrength('abc!def')).toBe('débil')
  })
  it('retorna media para exactamente 8 caracteres sin número', () => {
    expect(getPasswordStrength('abcdefgh')).toBe('media')
  })
  it('retorna fuerte para 8+ caracteres con número', () => {
    expect(getPasswordStrength('abcdefg1')).toBe('fuerte')
  })
  it('retorna muy fuerte para 8+ caracteres con número y símbolo', () => {
    expect(getPasswordStrength('abcdefg1!')).toBe('muy fuerte')
  })
})