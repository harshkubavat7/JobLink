import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token; // Get the token from cookies
        if(!token) {
            return res.status(401).json({message: "Unauthorized access", success: false});
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        if(!decode) {
            return res.status(401).json({message: "invalid token", success: false});
        }
        
        // console.log("Decoded token:", decode);

        req.id=decode.id; // Attach the user ID to the request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error", success: false});
    }
}