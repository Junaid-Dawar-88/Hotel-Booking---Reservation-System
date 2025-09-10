import prisma from "../database/data";

interface UserBody {
  name: string;
  email: string;
  phone: string;
}
interface UpdateUserBody extends UserBody {
  id: number;
}


// Define all routes in a single object
export const userRoutes = {
  GET: (async (): Promise<Response> => {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  }),
  POST: (async (request: Request): Promise<Response> => {
    console.log('reviced called')
    const body = await request.json() as UserBody;
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
    });
    return new Response(JSON.stringify(newUser), { status: 201 });
  }),
  PUT: (async (request: Request): Promise<Response> => {
    const body = await request.json() as UpdateUserBody;
        const updatedUser = await prisma.user.update({
      where: { id: body.id },
      data: {
         name:  body.name,
      },
    });
  return new Response(JSON.stringify(updatedUser))
}),
DELETE: (async (request: Request): Promise<Response> => {
  const body = await request.json() as UpdateUserBody;
  const deleteUser = await prisma.user.delete({
    where: { id: body.id }
  })
  return new Response(JSON.stringify(deleteUser))
})
}
