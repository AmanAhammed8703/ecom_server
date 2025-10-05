import jwt from 'jsonwebtoken'

export const auth =(req,res,next)=>{
    try{
       const token = req.headers.authorization?.split(" ")[1];
       if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const verification = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    }catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}