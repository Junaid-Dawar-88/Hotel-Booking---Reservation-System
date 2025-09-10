import prisma from "../database/data";

interface roomBody {
  number: string;
  type: string;
}
interface UpdateRoomBody extends roomBody {
  id: number;
}

export const roomRoutes = {
  GET: (async (): Promise<Response> => {
    console.log('hello i am room server ')
    const users = await prisma.room.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  }),
  POST: (async (request: Request): Promise<Response> => {
    const body = await request.json() as roomBody;
    const newUser = await prisma.room.create({
      data: {
        number: body.number,
        type: body.type,
      },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
  }),
  PUT: (async (request: Request): Promise<Response> => {
    const body = await request.json() as UpdateRoomBody;
        const updatedUser = await prisma.room.update({
      where: { id: body.id },
      data: {
         number:  body.number,
         type:  body.type,
      },
    });
  return new Response(JSON.stringify(updatedUser))
}),
DELETE: (async (request: Request): Promise<Response> => {
  const body = await request.json() as UpdateRoomBody;
  const deleteUser = await prisma.user.delete({
    where: { id: body.id }
  })
  return new Response(JSON.stringify(deleteUser))
})
}
