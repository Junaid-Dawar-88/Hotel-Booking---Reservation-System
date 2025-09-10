import { serve } from "bun";
import indexFile from './public/hotel.html';
import { userRoutes } from "./routes/user";
import { roomRoutes } from "./routes/room";
import { bookingRoutes } from './routes/booking'

const server =serve({
    port: 3000,
    routes: {
        '/': indexFile,
        '/api/user': userRoutes,
        '/api/room': roomRoutes,
        '/api/booking': bookingRoutes,
    }
})

console.log(`🚀 Hospital Management System running at http://localhost:${server.port}`);
