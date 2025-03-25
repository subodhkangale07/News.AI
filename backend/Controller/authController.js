const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

exports.googleAuth = async (req, res) => {
    const { token, role } = req.body; 

    try {
        const decodedToken = jwt.decode(token);

        if (!decodedToken) {
            return res.status(400).json({ success: false, message: 'Invalid token' });
        }

        const { email, name, picture: profile_picture, sub: googleId } = decodedToken;

        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user with the provided role
            user = await User.create({ 
                name, 
                email, 
                googleId, 
                profile_picture, 
                role: role || 'general' 
            });
        } else {
            // If user exists, check if the role matches
            if (user.role !== role) {
                return res.status(403).json({ success: false, message: 'You are not a valid user or role mismatch.' });
            }
        }

        const newToken = generateToken(user);

        res.status(200).json({ success: true, user, token: newToken });
    } catch (error) {
        console.error('Error authenticating with Google:', error);
        res.status(500).json({ success: false, message: 'Error authenticating with Google.', error });
    }
};