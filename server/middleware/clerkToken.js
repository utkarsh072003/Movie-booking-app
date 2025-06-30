import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: 'https://prompt-prawn-70.clerk.accounts.dev/.well-known/jwks.json',
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export const verifyClerkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(
    token,
    getKey,
    {
      audience: 'http://localhost:5000',
      issuer: 'https://prompt-prawn-70.clerk.accounts.dev',
      algorithms: ['RS256'],
    },
    (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      // Attach userId from sub
      req.auth = {
        userId: decoded.sub
      };

      next();
    }
  );
};
