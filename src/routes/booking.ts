import prisma from "../database/data";

interface bookingBody {
    bookingDate: string;
    bookingOutDate: string;
    userId: number;
    roomId: number;
}
interface UpdateBookingBody extends bookingBody {
    id: number;
}

export const bookingRoutes = {
    GET: (async (): Promise<Response> => {
        console.log('hello i am booking server ')
        const users = await prisma.booking.findMany();
        return new Response(JSON.stringify(users), { status: 200 });
    }),
    POST: (async (request: Request): Promise<Response> => {
        const body = await request.json() as bookingBody;
        const newUser = await prisma.booking.create({
            data: {
            bookingDate: body.bookingDate,
            bookingOutDate: body.bookingOutDate,
            userId: body.userId,
            roomId: body.roomId,
        },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
}),
    PUT: (async (request: Request): Promise<Response> => {
        const body = await request.json() as UpdateBookingBody;
        const updatedUser = await prisma.booking.update({
            where: { id: body.id },
            data: {
            bookingDate: body.bookingDate,
            bookingOutDate: body.bookingOutDate,
            userId: body.userId,
            roomId: body.roomId,
            },
        });
        return new Response(JSON.stringify(updatedUser))
    }),
DELETE: (async (request: Request): Promise<Response> => {
    const body = await request.json() as UpdateBookingBody;
    const deleteUser = await prisma.booking.delete({
        where: { id: body.id }
    })
    return new Response(JSON.stringify(deleteUser))
})
}
