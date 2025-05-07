import jwt from 'jsonwebtoken';

import { ConfigService } from '../../config/ConfigService';
import { JwtTokenService } from '../../jwtToken/JwtTokenService';
import { TokenPayload } from '../../jwtToken/TokenPayload';
import { getConfig } from '../../nodejs';
import { getTestConfig } from '../getTestConfig';


jest.mock('jsonwebtoken');

describe('JwtTokenService', () => {
  let jwtTokenService: JwtTokenService;
  const mockPayload: TokenPayload = {userId: '123'};
  const mockToken = 'mock.jwt.token';
  const mockSecret = 'mytestjwtsecret';

  beforeEach(() => {
    jest.clearAllMocks();
    jwtTokenService = new JwtTokenService(new ConfigService(getTestConfig()));
  });

  describe('initialization', () => {
    it('should throw error if JWT_SECRET is not defined', () => {
      delete process.env.JWT_SECRET;
      process.env.NODE_ENV = 'production';
      expect(() => new JwtTokenService(new ConfigService(getConfig()))).toThrow('JWT secret is not defined');
    });

    it('should initialize with correct constants', () => {
      expect(jwtTokenService.ACCESS_TOKEN_EXPIRY).toBe('15m');
      expect(jwtTokenService.REFRESH_TOKEN_EXPIRY).toBe('7d');
    });
  });

  describe('generateAccessToken', () => {
    it('should generate token with correct payload and options', () => {
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const result = jwtTokenService.generateAccessToken(mockPayload);

      expect(jwt.sign).toHaveBeenCalledWith(
        mockPayload,
        mockSecret,
        {expiresIn: '15m'},
      );
      expect(result).toBe(mockToken);
    });

    it('should throw error if jwt.sign fails', () => {
      (jwt.sign as jest.Mock).mockImplementation(() => {
        throw new Error('Signing failed');
      });

      expect(() => jwtTokenService.generateAccessToken(mockPayload)).toThrow('Signing failed');
    });
  });

  describe('generateRefreshToken', () => {
    it('should generate refresh token with correct payload and options', () => {
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      const result = jwtTokenService.generateRefreshToken(mockPayload);

      expect(jwt.sign).toHaveBeenCalledWith(
        mockPayload,
        mockSecret,
        {expiresIn: '7d'},
      );
      expect(result).toBe(mockToken);
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token', () => {
      const mockVerifiedPayload = {...mockPayload, iat: 1234567890};
      (jwt.verify as jest.Mock).mockReturnValue(mockVerifiedPayload);

      const result = jwtTokenService.verifyToken(mockToken);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockSecret);
      expect(result).toEqual(mockVerifiedPayload);
    });

    it('should throw error for invalid token', () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => jwtTokenService.verifyToken(mockToken)).toThrow('Invalid token');
    });
  });

  describe('token expiration', () => {
    it('should use different expiration for access and refresh tokens', () => {
      const accessSpy = jest.spyOn(jwtTokenService, 'generateAccessToken');
      const refreshSpy = jest.spyOn(jwtTokenService, 'generateRefreshToken');

      jwtTokenService.generateAccessToken(mockPayload);
      jwtTokenService.generateRefreshToken(mockPayload);

      expect(accessSpy).toHaveBeenCalledWith(mockPayload);
      expect(refreshSpy).toHaveBeenCalledWith(mockPayload);

      const accessCall = (jwt.sign as jest.Mock).mock.calls[0];
      const refreshCall = (jwt.sign as jest.Mock).mock.calls[1];

      expect(accessCall[2]).toEqual({expiresIn: '15m'});
      expect(refreshCall[2]).toEqual({expiresIn: '7d'});
    });
  });
});
